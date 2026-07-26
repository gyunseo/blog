# Xen + ARM64 `execenv.S`: 언제, 왜 불리고 어떻게 복귀하는가

> 분석 기준: workspace HEAD `f7d12d99e9663fa07152a3477ed0c3d4da5e792e`
>
> 한 문장 결론: `ukarch_execenv_load()`는 메모리에 저장된 **완전한 CPU
> 실행 문맥**을 현재 CPU에 덮어쓰고 `eret`하는 non-returning loader다.
> deferred fault/signal 경로에서는 이 동작으로 중단됐던 application
> 문맥으로 복귀한다.
>
> 근거:
> [arch/arm/arm64/execenv.S:11-20](../arch/arm/arm64/execenv.S#L11-L20),
> [arch/arm/arm64/execenv.S:32-93](../arch/arm/arm64/execenv.S#L32-L93),
> [include/uk/arch/ctx.h:518-527](../include/uk/arch/ctx.h#L518-L527),
> [arch/arm/ctx.c:176-183](../arch/arm/ctx.c#L176-L183)

## 0. 먼저 바로잡을 점

### 맞는 이해

`execenv.S`의 마지막 명령은 `eret`이다. 따라서 저장된 `ELR_EL1`,
`SPSR_EL1`, GPR, SP, TLS, FP/NEON 상태를 복원해 exception-return 형식으로
원래 실행 문맥을 재개한다.

근거:
[arch/arm/arm64/execenv.S:32-93](../arch/arm/arm64/execenv.S#L32-L93),
[native ARM64 regs.h:48-55](../plat/native/arch/arm64/include/uk/plat/native/arch/regs.h#L48-L55),
[native ARM64 sysctx.h:14-41](../plat/native/arch/arm64/include/uk/plat/native/arch/sysctx.h#L14-L41),
[native ARM64 ectx.h:19-51](../plat/native/arch/arm64/include/uk/plat/native/arch/ectx.h#L19-L51)

### 정확히 구분할 점

현재 Xen/ARM64 코드에서 **모든 interrupt/trap 복귀가 `execenv.S`를
통과하지는 않는다.** 일반 synchronous trap과 IRQ는 Xen vector가
`trap_entry`로 register를 저장하고 handler가 반환하면 같은 파일의
`trap_exit -> eret`으로 직접 복귀한다.

근거:
[plat/xen/arm/entry64.S:477-561](../plat/xen/arm/entry64.S#L477-L561),
[plat/xen/arm/entry64.S:602-635](../plat/xen/arm/entry64.S#L602-L635)

```text
일반 IRQ/trap
────────────
vector -> trap_entry -> C handler -> trap_exit -> eret
                                      ^
                                      execenv.S를 호출하지 않음
근거: plat/xen/arm/entry64.S:602-635
```

반대로 exception handler가 원래 vector stack에서 계속 처리하지 않고
별도의 trampoline/auxiliary stack으로 이동했다면 기존 `trap_exit` call
stack으로 돌아갈 수 없다. 이때 미리 보존한 `ukarch_execenv`를
`ukarch_execenv_load()`가 다시 CPU에 적재하고 `eret`한다.

근거:
[lib/posix-process/signal/system_error.c:17-64](../lib/posix-process/signal/system_error.c#L17-L64),
[arch/arm/ctx.c:176-218](../arch/arm/ctx.c#L176-L218)

```text
deferred fault/signal
─────────────────────
vector -> exception event -> ukarch_ctx_init_ehtrampo()
       -> 별도 stack에서 signal 처리
       -> ehtrampo_dispatcher()
       -> ukarch_execenv_load(saved_execenv)
       -> eret -> 중단됐던 application 문맥

근거:
lib/posix-process/signal/system_error.c:17-64, 69-108
arch/arm/ctx.c:176-218
lib/posix-process/signal/deliver.c:372-424
```

## 1. 언제, 왜 호출되는가

### 1.1 주 경로: fault를 signal로 처리한 뒤 원래 코드로 복귀

1. Page fault, invalid opcode, debug, bus error, math fault event에는 POSIX
   system-error handler가 등록돼 있다.
   근거:
   [lib/posix-process/signal/system_error.c:69-108](../lib/posix-process/signal/system_error.c#L69-L108)
2. `sys_error_handler_except()`는 exception register frame을 받은 뒤
   `ukarch_ctx_init_ehtrampo()`로 별도 실행 문맥을 만들고
   `ukarch_ctx_jump()`한다. 원래 exception handler call stack으로는
   돌아오지 않는다.
   근거:
   [lib/posix-process/signal/system_error.c:22-64](../lib/posix-process/signal/system_error.c#L22-L64)
3. `ukarch_ctx_init_ehtrampo()`는 auxiliary stack에
   `struct ukarch_execenv` 공간을 만들고 ECTX, SYSCTX, exception GPR frame을
   저장한다.
   근거:
   [arch/arm/ctx.c:185-218](../arch/arm/ctx.c#L185-L218)
4. `sys_error_handler()`가 signal delivery를 끝내고 반환하면
   `ehtrampo_dispatcher()`가 `ukarch_execenv_load(ee)`를 직접 호출한다.
   근거:
   [lib/posix-process/signal/deliver.c:372-424](../lib/posix-process/signal/deliver.c#L372-L424),
   [arch/arm/ctx.c:176-183](../arch/arm/ctx.c#L176-L183)
5. `execenv.S`가 저장된 application context를 복원하고 `eret`한다.
   근거:
   [arch/arm/arm64/execenv.S:20-93](../arch/arm/arm64/execenv.S#L20-L93)

이 경로에서 `execenv.S`가 필요한 이유는 **exception handler가 사용하던
현재 register와 stack을 버리고, fault 발생 시점의 완전한 문맥으로
돌아가야 하기 때문**이다.

근거:
[include/uk/arch/ctx.h:353-395](../include/uk/arch/ctx.h#L353-L395),
[arch/arm/ctx.c:176-218](../arch/arm/ctx.c#L176-L218)

### 1.2 `clone()` 자식의 첫 실행

`clone_setup_child_ctx()`는 부모 execenv를 자식 auxiliary stack에 복사한
뒤 자식이 보게 될 `x0=0`, 새 SP, TLS를 수정한다. 그리고 자식
`ukarch_ctx`의 첫 entry를 `ukarch_execenv_load`로 설정한다. 자식이 처음
schedule되면 이 loader가 자식의 완전한 CPU 문맥을 적재한다.

근거:
[lib/posix-process/arch/arm64/clone.c:30-63](../lib/posix-process/arch/arm64/clone.c#L30-L63),
[lib/posix-process/clone.c:391-405](../lib/posix-process/clone.c#L391-L405),
[lib/uksched/include/uk/sched_impl.h:100-132](../lib/uksched/include/uk/sched_impl.h#L100-L132)

### 1.3 `execve()`의 새 프로그램 첫 실행

`execve()`는 새 stack에 execenv를 만들고 새 IP/SP를 준비한다. old stack을
정리한 뒤 `execve_ctx_switch()`가 새 execenv를 직접 load하여 기존
프로그램으로 돌아오지 않고 새 프로그램 문맥으로 진입한다.

근거:
[lib/posix-process/execve.c:140-164](../lib/posix-process/execve.c#L140-L164),
[lib/posix-process/execve.c:182-203](../lib/posix-process/execve.c#L182-L203),
[lib/posix-process/execve.c:22-64](../lib/posix-process/execve.c#L22-L64),
[lib/posix-process/arch/arm64/execve.c:11-42](../lib/posix-process/arch/arm64/execve.c#L11-L42)

### 1.4 runtime에서 "처음" 호출되는 시점

고정된 boot-time 최초 호출은 없다. 현재 ARM64 source에서 확인되는
진입은 fault trampoline의 직접 호출, clone 자식 context의 entry
function pointer, execve trampoline의 직접 호출이며, 실제 최초 호출은
workload가 셋 중 어떤 상황을 먼저 만드는지에 따라 달라진다.

근거:
[arch/arm/ctx.c:176-183](../arch/arm/ctx.c#L176-L183),
[lib/posix-process/arch/arm64/clone.c:59-63](../lib/posix-process/arch/arm64/clone.c#L59-L63),
[lib/posix-process/execve.c:62-64](../lib/posix-process/execve.c#L62-L64)

### 1.5 일반 syscall은 어떻게 복귀하는가

일반 ARM64 syscall adapter는 ECTX와 SYSCTX를 저장해 syscall을 실행하고
같은 adapter 안에서 다시 복원한 후 반환한다. Xen vector가 이어서
`trap_exit -> eret`을 수행하므로, `clone` 자식 첫 진입이나 `execve` 같은
완전 문맥 교체가 없다면 `execenv.S`를 호출하지 않는다.

근거:
[lib/syscall_shim/arch/arm64/syscall_handler.c:12-40](../lib/syscall_shim/arch/arm64/syscall_handler.c#L12-L40),
[plat/xen/arm/entry64.S:520-561](../plat/xen/arm/entry64.S#L520-L561),
[plat/xen/arm/entry64.S:620-625](../plat/xen/arm/entry64.S#L620-L625)

## 2. `ukarch_execenv`의 수평 메모리 주소 layout

Xen PAL은 REGS와 ECTX의 layout/operation을 native ARM64 구현에 위임하고
SYSCTX도 native format을 사용한다.

근거:
[plat/xen/pal/include/uk/plat/pal/regs.h:13-21](../plat/xen/pal/include/uk/plat/pal/regs.h#L13-L21),
[plat/xen/pal/include/uk/plat/pal/ectx.h:10-23](../plat/xen/pal/include/uk/plat/pal/ectx.h#L10-L23),
[plat/xen/pal/include/uk/plat/pal/sysctx.h:13-26](../plat/xen/pal/include/uk/plat/pal/sysctx.h#L13-L26)

```text
낮은 주소 -----------------------------------------------------------------> 높은 주소

execenv
  +0                                              +288      +304                 +824  +832
   |<---------------- REGS 288B ------------------>| SYS 16B |<--- ECTX 520B ----->|PAD 8|
   +-----------------------------------------------+---------+---------------------+-----+
   | x0..x29 | LR | ELR | SPSR | ESR | SP | pad   |TPIDR_EL0| q0..q31,FPSR,FPCR  |align|
   +-----------------------------------------------+---------+---------------------+-----+
              240  248   256    264   272   280

근거:
include/uk/arch/ctx.h:63-89, 139-158
plat/native/arch/arm64/include/uk/plat/native/arch/regs.h:18-55, 63-113
plat/native/arch/arm64/include/uk/plat/native/arch/sysctx.h:14-41
plat/native/arch/arm64/include/uk/plat/native/arch/ectx.h:19-51
```

`execenv.S`가 사용하는 핵심 주소는 다음 세 개다.

| 주소 | 의미 | 이 주소를 사용하는 명령 | 근거 |
|---:|---|---|---|
| `base + 304` | ECTX 시작 | `add x0, x0, #(REGS_SIZE + SYSCTX_SIZE)` | [`execenv.S:32-38`](../arch/arm/arm64/execenv.S#L32-L38) |
| `base + 288` | SYSCTX 시작 | `add x0, x0, #REGS_SIZE` | [`execenv.S:46-51`](../arch/arm/arm64/execenv.S#L46-L51) |
| `base + 0` | REGS 시작 | `mov sp, x19` 후 `ldp`/`ldr` | [`execenv.S:53-91`](../arch/arm/arm64/execenv.S#L53-L91) |

## 3. 전체 어셈블리: 실행 명령마다 주석

아래 코드는 원본 instruction을 순서대로 옮기고, **모든 실행 명령과
`ENTRY`에 한국어 주석 및 원본 line 번호**를 붙인 발표용 annotated
version이다. 실제 source file은 변경하지 않았다.

근거:
[arch/arm/arm64/execenv.S:20-93](../arch/arm/arm64/execenv.S#L20-L93)

```asm
ENTRY(ukarch_execenv_load)                  // L20: 함수 엔트리. x0 = execenv base, 이 함수는 돌아오지 않는다.

	msr	daifset, #2                    // L22: 복원이 끝나기 전에 IRQ가 끼어들지 않도록 I mask를 세운다.

	mov	x19, x0                        // L30: helper의 bl 호출을 지나도 base를 잃지 않도록 callee-saved x19에 보관한다.

	add	x0, x0, #(UK_LCPU_REGS_SIZE + UK_LCPU_SYSCTX_SIZE) // L37: x0 = base + 288 + 16 = base + 304, 즉 ectx 시작 주소를 만든다.
	bl	UK_LCPU_ECTX_LOAD_FNSYM        // L38: q0-q31, FPSR, FPCR 등 extended context를 CPU에 복원한다.

	mov	x0, x19                        // L44: helper가 x0를 바꿨을 수 있으므로 execenv base를 x0에 되돌린다.

	add	x0, x0, #(UK_LCPU_REGS_SIZE)  // L50: x0 = base + 288, 즉 sysctx 시작 주소를 만든다.
	bl	UK_LCPU_SYSCTX_LOAD_FNSYM      // L51: 저장된 system context, ARM64에서는 TPIDR_EL0(TLS)를 복원한다.

	mov	sp, x19                        // L57: sp를 execenv base로 바꿔 regs 배열을 stack frame처럼 읽는다. 아직 target SP는 아니다.

	ldp	x22, x23, [sp, #16 * 16]       // L60: offset 256/264에서 저장된 SPSR_EL1과 ESR_EL1을 임시 x22/x23에 읽는다.
	msr	spsr_el1, x22                  // L61: eret 때 복원할 processor state를 SPSR_EL1에 기록한다.
	msr	esr_el1, x23                   // L62: 저장해 둔 exception syndrome을 ESR_EL1에 되돌린다.

	ldp	x30, x21, [sp, #16 * 15]       // L65: offset 240/248에서 LR(x30)과 exception return PC를 읽는다.
	msr	elr_el1, x21                   // L66: eret의 목적지 PC를 ELR_EL1에 기록한다.

	ldp	x28, x29, [sp, #16 * 14]       // L69: 저장된 x28, x29(frame pointer)를 복원한다.
	ldp	x26, x27, [sp, #16 * 13]       // L70: 저장된 x26, x27을 복원한다.
	ldp	x24, x25, [sp, #16 * 12]       // L71: 저장된 x24, x25를 복원한다.
	ldp	x22, x23, [sp, #16 * 11]       // L72: 임시로 사용한 x22/x23을 원래 application 값으로 덮어쓴다.
	ldp	x20, x21, [sp, #16 * 10]       // L73: 임시로 ELR을 담았던 x21까지 원래 값으로 복원한다.

	ldp	x16, x17, [sp, #16 * 8]        // L75: x18/x19 slot은 base/SP 교체에 필요하므로 건너뛰고 x16/x17부터 복원한다.
	ldp	x14, x15, [sp, #16 * 7]        // L76: 저장된 x14, x15를 복원한다.
	ldp	x12, x13, [sp, #16 * 6]        // L77: 저장된 x12, x13을 복원한다.
	ldp	x10, x11, [sp, #16 * 5]        // L78: 저장된 x10, x11을 복원한다.
	ldp	x8,  x9,  [sp, #16 * 4]        // L79: 저장된 x8, x9를 복원한다.
	ldp	x6,  x7,  [sp, #16 * 3]        // L80: 저장된 x6, x7을 복원한다.
	ldp	x4,  x5,  [sp, #16 * 2]        // L81: 저장된 x4, x5를 복원한다.
	ldp	x2,  x3,  [sp, #16 * 1]        // L82: 저장된 x2, x3을 복원한다.
	ldp	x0,  x1,  [sp, #16 * 0]        // L83: 마지막 helper 인자였던 x0와 x1을 원래 문맥 값으로 복원한다.

	ldr	x18, [sp, #UK_LCPU_REGS_OFFSETOF_SP] // L86: offset 272에서 실제 복귀 대상 stack pointer를 x18에 읽는다.
	mov	x19, sp                        // L87: 현재 sp인 execenv base를 마지막 x18/x19 load용 주소로 보존한다.
	mov	sp, x18                        // L88: CPU sp를 저장된 target SP로 최종 교체한다.

	ldp	x18, x19, [x19, #16 * 9]       // L91: 보존한 base+144에서 원래 x18/x19를 최종 복원한다.

	eret                                  // L93: ELR_EL1의 PC와 SPSR_EL1의 상태로 복귀한다. C caller에는 돌아가지 않는다.
```

### instruction 순서의 핵심

1. ECTX와 SYSCTX loader는 `bl`을 사용하는 함수 호출이므로 먼저 실행한다.
   그동안 base는 callee-saved `x19`가 보존한다.
   근거:
   [arch/arm/arm64/execenv.S:24-51](../arch/arm/arm64/execenv.S#L24-L51)
2. helper call이 모두 끝난 후 GPR을 복원해야 복원된 register가 다시
   clobber되지 않는다.
   근거:
   [arch/arm/arm64/execenv.S:53-83](../arch/arm/arm64/execenv.S#L53-L83)
3. `sp`, `x18`, `x19`는 regs blob을 읽기 위한 주소 계산에 사용되므로
   가장 마지막에 복원한다.
   근거:
   [arch/arm/arm64/execenv.S:74-91](../arch/arm/arm64/execenv.S#L74-L91)
4. 마지막이 `ret`가 아니라 `eret`인 이유는 일반 함수 caller가 아니라
   저장된 `ELR_EL1/SPSR_EL1` 문맥을 재개하기 때문이다.
   근거:
   [arch/arm/arm64/execenv.S:59-66](../arch/arm/arm64/execenv.S#L59-L66),
   [arch/arm/arm64/execenv.S:93](../arch/arm/arm64/execenv.S#L93)

## 4. 메모리 관점에서 본 실행 단계

### 단계 A: 진입과 base 보존

```text
x0 ─┐
    └──> execenv +0
x19 ───> execenv +0

[ REGs 0..287 ][ SYS 288..303 ][ ECTX 304..823 ][ PAD 824..831 ]
  ^ x0, x19
```

`x19`는 두 helper call 동안 변하지 않는 execenv base다.

근거:
[arch/arm/arm64/execenv.S:20-30](../arch/arm/arm64/execenv.S#L20-L30)

### 단계 B: ECTX 복원

```text
[ REGs 0..287 ][ SYS 288..303 ][ ECTX 304..823 ][ PAD 824..831 ]
                                  ^ x0 = x19 + 304
                                  └── UK_LCPU_ECTX_LOAD_FNSYM
```

근거:
[arch/arm/arm64/execenv.S:32-38](../arch/arm/arm64/execenv.S#L32-L38),
[plat/xen/pal/include/uk/plat/pal/ectx.h:10-23](../plat/xen/pal/include/uk/plat/pal/ectx.h#L10-L23)

### 단계 C: SYSCTX 복원

```text
[ REGs 0..287 ][ SYS 288..303 ][ ECTX 304..823 ][ PAD 824..831 ]
                  ^ x0 = x19 + 288
                  └── UK_LCPU_SYSCTX_LOAD_FNSYM -> TPIDR_EL0
```

근거:
[arch/arm/arm64/execenv.S:40-51](../arch/arm/arm64/execenv.S#L40-L51),
[plat/xen/arm/sysctx.c:9-18](../plat/xen/arm/sysctx.c#L9-L18),
[plat/native/arch/arm64/sysctx.c:19-24](../plat/native/arch/arm64/sysctx.c#L19-L24)

### 단계 D: REGS blob을 임시 stack처럼 사용

```text
sp = execenv base
|
v
[x0..x17][x18,x19][x20..x29][LR][ELR][SPSR][ESR][SP][pad]
 0..143   144..159 160..239  240  248   256   264  272 280
```

여기서 `mov sp, x19`의 `sp`는 **아직 application SP가 아니다.**
`ldp`/`ldr`의 base로 쓰기 위해 execenv의 REGS 시작을 가리킨다.

근거:
[arch/arm/arm64/execenv.S:53-83](../arch/arm/arm64/execenv.S#L53-L83),
[native ARM64 regs.h:18-55](../plat/native/arch/arm64/include/uk/plat/native/arch/regs.h#L18-L55)

### 단계 E: target SP로 교체하고 `eret`

```text
execenv+272 ──load──> x18 ──mov──> sp = application target SP
execenv+144 ──load──> original x18, x19

ELR_EL1 = return PC
SPSR_EL1 = return processor state
eret
```

근거:
[arch/arm/arm64/execenv.S:59-66](../arch/arm/arm64/execenv.S#L59-L66),
[arch/arm/arm64/execenv.S:85-93](../arch/arm/arm64/execenv.S#L85-L93)

## 5. 10분 발표 순서

| 시간 | 말할 내용 | 근거 |
|---:|---|---|
| 0:00-1:00 | “원래 코드로 복귀”는 맞지만 모든 IRQ/trap 공통 epilogue는 아니다. | [`Xen entry64.S:602-635`](../plat/xen/arm/entry64.S#L602-L635), [`ctx.c:176-183`](../arch/arm/ctx.c#L176-L183) |
| 1:00-3:00 | deferred fault/signal이 별도 stack으로 이동했다가 execenv loader로 돌아오는 흐름 | [`system_error.c:22-64`](../lib/posix-process/signal/system_error.c#L22-L64), [`ctx.c:176-218`](../arch/arm/ctx.c#L176-L218) |
| 3:00-4:00 | clone 첫 실행과 execve 새 문맥 진입에서도 사용 | [`clone.c:30-63`](../lib/posix-process/arch/arm64/clone.c#L30-L63), [`execve.c:22-64`](../lib/posix-process/execve.c#L22-L64) |
| 4:00-5:00 | 수평 memory layout: REGS 288 + SYS 16 + ECTX 520 + PAD 8 | [`ctx.h:63-89`](../include/uk/arch/ctx.h#L63-L89), [`ctx.h:139-158`](../include/uk/arch/ctx.h#L139-L158) |
| 5:00-8:30 | annotated assembly를 `ECTX -> SYSCTX -> REGS -> SP -> eret` 순서로 설명 | [`execenv.S:20-93`](../arch/arm/arm64/execenv.S#L20-L93) |
| 8:30-9:30 | `sp=execenv base`는 임시 주소이고 target SP는 offset 272에서 나중에 읽는다는 점 강조 | [`execenv.S:57-91`](../arch/arm/arm64/execenv.S#L57-L91) |
| 9:30-10:00 | “완전 snapshot을 CPU에 덮고 eret하는 non-returning loader”로 정리 | [`execenv.S:11-20,85-93`](../arch/arm/arm64/execenv.S#L11-L20) |

## 6. 발표 제외 권장: 현재 Xen frame 점검 사항

현재 Xen PAL/native consumer가 기대하는 REGS layout은 288B이며
`LR=240, ELR=248, SPSR=256, ESR=264, SP=272`다. 그러나 Xen
`trap_entry`는 272B만 확보하고 `LR/SP=240/248`,
`ELR/SPSR=256/264`로 저장한다.

근거:
[plat/xen/pal/include/uk/plat/pal/regs.h:13-21](../plat/xen/pal/include/uk/plat/pal/regs.h#L13-L21),
[native ARM64 regs.h:48-55](../plat/native/arch/arm64/include/uk/plat/native/arch/regs.h#L48-L55),
[plat/xen/arm/entry64.S:477-518](../plat/xen/arm/entry64.S#L477-L518)

```text
loader 기대: [240 LR][248 ELR][256 SPSR][264 ESR ][272 SP][280 pad]
Xen 저장:    [240 LR][248 SP ][256 ELR ][264 SPSR]        frame end
```

또한 native error handler는 `(regs, far)` 두 인자를 받지만 Xen vector는
현재 `x0=sp`만 설정한다. KVM 구현은 `x1=far_el1`까지 설정한다.

근거:
[plat/native/arch/arm64/except.c:193-214](../plat/native/arch/arm64/except.c#L193-L214),
[plat/xen/arm/entry64.S:602-625](../plat/xen/arm/entry64.S#L602-L625),
[plat/kvm/arm/exceptions.S:275-280](../plat/kvm/arm/exceptions.S#L275-L280)

따라서 `execenv.S`의 동작 설명과 별개로, 현재 checkout에서 Xen
exception producer가 loader와 동일한 layout을 생성하도록 정합성
검토가 필요하다.

근거:
[arch/arm/arm64/execenv.S:59-91](../arch/arm/arm64/execenv.S#L59-L91),
[plat/xen/arm/entry64.S:477-518](../plat/xen/arm/entry64.S#L477-L518)
