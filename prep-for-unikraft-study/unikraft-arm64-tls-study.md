# Unikraft ARM64 TLS 전파 교육 (10분)

> 대상 파일: `arch/arm/arm64/tls.c`
> 한 줄 요약: **이 파일은 "스레드마다 하나씩 갖는 TLS 메모리 블록(variant 2 레이아웃)"의 크기 계산·초기화·포인터 변환을 담당하고, 실제 활성화는 `tpidr_el0` 레지스터에 포인터를 써 넣는 것으로 끝난다.**

---

## 1. 핵심 자료구조: "TLS area" (variant 2 static TLS 레이아웃)

이 파일에 구조체 정의는 없습니다. 핵심 자료구조는 **메모리 레이아웃 그 자체**이며, 파일 상단 주석에 그림으로 정의되어 있습니다 (`arch/arm/arm64/tls.c:87-120`).

```
            +-------------------------+ \
            | / PADDING 1 / / / / / / | |
   tcbp --> +-------------------------+ |  \
            | Custom TCB format       | |   > Thread Control Block (TCB)
            | (libC가 사용 가능)       | |  |  (길이: TCB_SIZE)
      tlsp -+-> AARCH64_TCB_OVERLAP   | |  |   <-- tpidr_el0가 가리키는 곳!
         |  +-------------------------+ |  /
data_off<   | / PADDING 2 / / / / / / |  > ukarch_tls_area_size()
         \->+-------------------------+ |  \
            | .tdata (초기값 복사)     | |  |
            + - - - - - - - - - - - - + |   > Static TLS block
            | .tbss  (0으로 클리어)    | |  |
            +-------------------------+ /  /
```

### 레이아웃을 결정하는 상수 3개

| 상수                  | 값        | 근거                         | 의미                                                                                                                                                                                                                                                                            |
| --------------------- | --------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AARCH64_RESERVED`    | 16        | `arch/arm/arm64/tls.c:69`    | AArch64 ABI가 tlsp 뒤에 요구하는 16바이트 (DTV 포인터 + 구현용 포인터 자리, `tls.c:111-114` 주석)                                                                                                                                                                               |
| `AARCH64_TCB_OVERLAP` | 16 또는 0 | `arch/arm/arm64/tls.c:71-75` | 구 musl은 이 16바이트를 TCB 일부로 씀, 신 musl은 무시 → `CONFIG_AARCH64_NO_TCB_OVERLAP`으로 전환 (`tls.c:53-68` 주석). **arm64+lib-musl 빌드는 항상 0** — lib-musl `Makefile.uk:48-51`이 arm64에서 `aarch64_no_reserved_tcb_overlap`(`arch/Makefile.rules:19-21`)을 무조건 호출 |
| `TLS_AREA_ALIGN`      | 16        | `arch/arm/arm64/tls.c:128`   | ELF TLS 세그먼트의 p_align과 **반드시 일치**해야 함 — aarch64는 링크 타임에 이 정렬값으로 tlsp 오프셋을 계산 (`tls.c:122-127` 주석)                                                                                                                                             |

핵심 불변식: **tlsp에서 .tdata 시작까지 거리 = max(16, p_align) = 16** (`tls_data_offset()`, `arch/arm/arm64/tls.c:130-141`). 컴파일러가 만든 코드는 `tpidr_el0 + 링크타임 오프셋`으로 변수에 접근하므로, 이 거리가 어긋나면 즉시 메모리 오염입니다.

### 데이터의 원본: 링커 심볼 3개

`.tdata` 초기값의 "마스터 템플릿"은 커널 이미지 안에 있고, 링커 심볼로 참조합니다.

- 선언: `extern char _tls_start[], _etdata[], _tls_end[];` — `arch/arm/arm64/tls.c:85`
- 정의: `TLS_SECTIONS` 매크로 — `plat/common/include/uk/plat/common/common.lds.h:139-163`
  (`_tls_start` → `.tdata` → `_etdata` → `.tbss` → `_tls_end`)
- 우리 환경(Xen/arm64)에서는 `plat/xen/arm/link64.lds.S:41-42`에서 `tls PT_TLS` 세그먼트 선언, `:101`에서 `TLS_SECTIONS` 사용

`.tdata` 크기 = `_etdata - _tls_start` (`tls.c:153-156`), `.tbss` 크기 = `_tls_end - _etdata` (`tls.c:157-160`).

### 이 파일이 제공하는 API (좌표 변환 함수들)

| 함수                         | 위치            | 역할                                                                                                                        |
| ---------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `ukarch_tls_area_size()`     | `tls.c:181-188` | 패딩1 + TCB + 패딩2 + .tdata + .tbss 총합                                                                                   |
| `ukarch_tls_area_align()`    | `tls.c:176-179` | 항상 16                                                                                                                     |
| `ukarch_tls_tlsp(area)`      | `tls.c:191-201` | area 시작주소 → `tpidr_el0`에 넣을 값                                                                                       |
| `ukarch_tls_area_get(tlsp)`  | `tls.c:204-211` | 위 함수의 역변환                                                                                                            |
| `ukarch_tls_tcb_get(tlsp)`   | `tls.c:214-219` | tlsp → TCB 시작주소 (uksched의 `uk_thread_uktcb()`가 사용, `lib/uksched/include/uk/tcb_impl.h:91`)                          |
| `ukarch_tls_area_init(area)` | `tls.c:226-281` | 레이아웃대로 채우기: 패딩 zero → TCB init → `.tdata`를 `_tls_start`에서 `memcpy` (`tls.c:267`) → `.tbss` zero (`tls.c:274`) |

---

## 2. 엔트리 포인트: 최초 호출은 부팅 중 `uk_boot_entry()`

부팅 초기, 스케줄러도 생기기 전에 **부트 컨텍스트 자신의 TLS**를 만들면서 처음 호출됩니다.

`lib/ukboot/boot.c`: `uk_boot_entry()` (함수 정의 `boot.c:240`):

```c
/* Allocate a TLS for this execution context */
tls = uk_memalign(a, ukarch_tls_area_align(),
                     ukarch_tls_area_size());       /* boot.c:319-321 */
/* Copy from TLS master template */
ukarch_tls_area_init(tls);                          /* boot.c:326 */
/* Activate TLS */
uktlsp = ukarch_tls_tlsp(tls);                      /* boot.c:328 */
uk_lcpu_tlsp_set(uktlsp);                           /* boot.c:329 */
```

패턴은 항상 3단계입니다: **① align/size로 할당 → ② `area_init()`으로 채움 → ③ `tlsp` 계산해서 레지스터에 활성화.**

### 활성화의 끝: Xen/arm64에서 `tpidr_el0`까지 내려가는 경로

`uk_lcpu_tlsp_set()`은 얇은 위임 체인이고, 종착지는 시스템 레지스터 쓰기 한 줄입니다.

1. `uk_lcpu_tlsp_set()` → `uk_pal_tlsp_set()` — `lib/uklcpu/include/uk/lcpu/sysctx.h:47-50`
2. Xen PAL: `uk_pal_tlsp_set()` → `uk_plat_xen_tlsp_set()` — `plat/xen/pal/include/uk/plat/pal/sysctx.h:65-68`
3. ARM64는 native로 위임: `uk_plat_xen_tlsp_set()` → `uk_plat_native_tlsp_set()` — `plat/xen/arch/arm64/include/uk/plat/xen/arch/sysctx.h:25-29`
4. 최종: `UK_ARCH_ARM64_SYSREG_WRITE(tpidr_el0, tlsp);` — `plat/native/arch/arm64/include/uk/plat/native/arch/sysctx.h:59-62`

x86과 달리 arm64의 `tpidr_el0`는 EL0/EL1 어디서든 쓸 수 있어 하이퍼콜 없이 순수 레지스터 쓰기로 끝납니다 (Xen 경로가 native로 그대로 위임되는 이유, 3번 파일의 `:17` 주석 "On ARM64 all sysctx ops are delegated to native").

---

## 3. 호출되는 상황: 총 4가지

### (a) 부팅 시 1회 — 부트 컨텍스트용 (위 §2)

### (b) 스레드 생성 시마다 — 스레드별 TLS 할당

`lib/uksched/thread.c` — `_uk_thread_struct_init_alloc()` (정의 `thread.c:383`):

- 할당: `uk_memalign(a_uktls, ukarch_tls_area_align(), ukarch_tls_area_size() + ...)` — `thread.c:421-425` (ectx와 함께 할당) 또는 `thread.c:438-439`
- 포인터 계산: `tlsp = ukarch_tls_tlsp(tls);` — `thread.c:446`
- 초기화: `ukarch_tls_area_init(tls);` — `thread.c:467`
- 결과는 `struct uk_thread`에 저장: `t->tlsp` / `t->uktlsp` 필드 — `lib/uksched/include/uk/thread.h:59-60`

여기서는 **활성화하지 않고 저장만** 합니다. 활성화는 (c)에서.

### (c) 컨텍스트 스위치 시마다 — tlsp 저장/복원

`lib/uksched/include/uk/sched_impl.h` — `uk_sched_thread_switch()` (정의 `:100-133`):

```c
prev->tlsp = uk_lcpu_tlsp_get();     /* sched_impl.h:111  이전 스레드 tlsp 저장 */
uk_lcpu_tlsp_set(next->tlsp);        /* sched_impl.h:117  다음 스레드 tlsp 복원 */
...
ukarch_ctx_switch(&prev->ctx, &next->ctx);   /* sched_impl.h:132 */
```

즉 스위치마다 `tpidr_el0`가 다음 스레드의 TLS를 가리키도록 갈아끼웁니다. `tls.c`의 함수가 직접 불리는 건 아니고, 그 결과물(tlsp)이 소비되는 지점입니다.

### (d) TLS 변수 접근 시마다 — 컴파일러 생성 코드 (런타임 호출 없음)

`__thread int x;` 같은 변수 접근은 컴파일러가 `mrs xN, tpidr_el0; add xN, xN, #오프셋` 형태로 인라인 생성합니다. 이때 오프셋이 링크 타임에 `p_align` 기준으로 굳기 때문에, §1의 `TLS_AREA_ALIGN` 일치 경고(`tls.c:125-127`)가 존재하는 것입니다.

---

## 발표용 정리 (10분 배분 제안)

1. **(3분)** §1 레이아웃 그림 하나로 설명 — "우리 빌드(arm64+lib-musl)는 tlsp가 TCB 끝(+208)을 가리키고, 거기서 +16이 .tdata" (구 musl 모드면 tlsp가 TCB 안쪽 16바이트로 들어감 — 호환 얘기는 `tls.c:53-68` 주석 한 줄로만)
2. **(3분)** §2 부팅 시 3단계 패턴 (할당→init→활성화) + `tpidr_el0`까지의 위임 체인
3. **(3분)** §3 (b)(c) — 스레드 생성 때 만들고, 스위치 때 레지스터만 갈아끼운다
4. **(1분)** (d) 컴파일러 관점 — 왜 정렬이 "NEEDS to match"인지로 마무리

**보너스 트리비아** (질문 유도용): `.tbss` 초기화 시 디버그 출력이 `tls_tbss_size()`가 아니라 `tls_tdata_size()`를 찍는 오타가 있습니다 — `arch/arm/arm64/tls.c:271-272` (실제 `memset`은 `tls_tbss_size()`로 정상, `tls.c:274`).

---

## 부록: ukarch_tls_area_init() 한국어 주석 해설 (tls.c:226-281)

이 함수가 이 파일의 심장입니다. **쓰기 커서(`writepos`)가 area 맨 앞에서 출발해 끝까지 한 번만 전진**하면서, 레이아웃 규칙(각 `*_size()` 함수)이 말하는 그대로 5개 구간을 채웁니다. 수치는 **arm64 + lib-musl 실제 빌드 기준**입니다: TCB_SIZE=200 (lib-musl `Makefile.uk:41`), overlap=0 (`Makefile.uk:48-51`이 arm64에서 `aarch64_no_reserved_tcb_overlap` 호출 → `CONFIG_AARCH64_NO_TCB_OVERLAP` 활성).

```c
void ukarch_tls_area_init(void *tls_area)
{
	/* [사전 검사] 할당된 area가 16B 정렬인지 확인 (tls.c:228)
	 * 이게 깨지면 tlsp 정렬도 깨져서 컴파일러 가정(ABI) 위반 → 즉사 */
	UK_ASSERT(IS_ALIGNED((__uptr) tls_area, ukarch_tls_area_align()));

	__u8 *writepos = tls_area;  /* 쓰기 커서: 여기서 출발해 오른쪽으로만 전진 */

	/* ── ① 패딩 1 (8B) ── tlsp 정렬 맞춤용 빈 공간 (tls.c:238-240)
	 * 아무도 안 읽지만 CLEAR_TBSS 옵션이 켜져 있으면 0으로 밀어 둠 */
	memset(writepos, 0x0, tls_padding_1_size());
	writepos += tls_padding_1_size();

	/* ── ② TCB (200B) ── libC 소유 공간 (tls.c:242-253)
	 * 진입 전 assert: "커서 위치 == ukarch_tls_tcb_get()이 계산한 tcbp" 교차 검증 (tls.c:245)
	 * - libC가 TCB를 등록했으면(CONFIG_UKARCH_TLS_HAVE_TCB):
	 *     libC가 제공한 ukarch_tls_tcb_init() 호출 → lib-musl이라면
	 *     __uk_init_tls.c가 struct pthread를 자기 포맷대로 초기화 (tls.c:247)
	 * - 없으면: 그냥 0으로 클리어 (tls.c:249) */
	UK_ASSERT(ukarch_tls_tcb_get(ukarch_tls_tlsp(tls_area)) == writepos);
	ukarch_tls_tcb_init(writepos);      /* 또는 memset(writepos, 0, TCB_SIZE) */
	writepos += ukarch_tls_tcb_size();
	/* 통과 후 assert: "TCB 끝 - overlap == tlsp" 재검증 (tls.c:252-253)
	 * 이 빌드는 overlap=0 → tlsp가 정확히 TCB 끝(+208) */
	UK_ASSERT(ukarch_tls_tlsp(tls_area) ==
		  ((__uptr) writepos) - AARCH64_TCB_OVERLAP);

	/* ── ③ 패딩 2 (16B — 이 빌드 실제값; 구 musl 모드면 0B) ── (tls.c:255-261)
	 * ABI가 고정한 거리 "tlsp + 16 = .tdata"를 채우는 스페이서 */
	memset(writepos, 0x0, tls_padding_2_size());
	writepos += tls_padding_2_size();

	/* ── ④ .tdata ── 이 함수에서 유일한 '복사' 단계 (tls.c:263-268)
	 * 커널 이미지 안의 마스터 템플릿(_tls_start~_etdata)을 통째로 memcpy
	 * → __thread int x = 42; 의 42가 스레드마다 생기는 순간
	 * 직전 assert: .tdata 시작은 반드시 16B 정렬 (tls.c:266) */
	UK_ASSERT(IS_ALIGNED((__uptr) writepos, ukarch_tls_area_align()));
	memcpy(writepos, _tls_start, tls_tdata_size());
	writepos += tls_tdata_size();

	/* ── ⑤ .tbss ── 초기값 없는 __thread 변수 영역 → 0 클리어 (tls.c:270-276)
	 * (직전 디버그 출력이 tdata_size를 찍는 오타 있음, 동작은 정상) */
	memset(writepos, 0x0, tls_tbss_size());
	writepos += tls_tbss_size();

	/* [사후 검사] 커서가 정확히 area 끝에 도달했는가 (tls.c:278-279)
	 * = ukarch_tls_area_size()의 크기 계산과 실제 쓰기가 1바이트도
	 *   어긋나지 않았음을 보증. 크기 함수들과 이 함수는 한 몸이다 */
	UK_ASSERT(ukarch_tls_area_size() ==
		  (__sz) (writepos - (__u8 *) tls_area));
}
```

### 수평선으로 본 실행 과정

```
주소 →   +0        +8                          +208         +224             +224+D          끝
         ├─ ①패딩1 ─┼──────── ②TCB 200B ────────┼── ③패딩2 ───┼─── ④.tdata ────┼─── ⑤.tbss ────┤
         │  8B     │   (musl struct pthread)   │    16B     │     D 바이트    │    B 바이트    │
writepos ●─────────●──────────────────────────●────────────●────────────────●───────────────●
         │memset 0 │ ukarch_tls_tcb_init()     │  memset 0  │memcpy(_tls_start)│  memset 0    │
         │         │ (lib-musl 콜백)            │            │  ← 유일한 복사    │              │
         ▲         ▲                          ▲            ▲                                 ▲
      assert     assert                  tlsp = +208     assert                            assert
      정렬(228)  tcbp(245)              = TCB 끝!        정렬(266)                        총크기(278)
                                        assert tlsp(252)
```

읽는 법: `●`가 `writepos` 커서가 멈췄다 가는 지점이고, 구간마다 딱 한 가지 연산(memset / tcb_init / memcpy)만 합니다. `assert`들은 "커서의 실제 위치"와 "좌표 변환 함수들(`ukarch_tls_tlsp`, `ukarch_tls_tcb_get`)의 계산 결과"가 일치하는지 다섯 번 교차 검증합니다 — 레이아웃 규칙과 실행 코드가 어긋나는 버그를 컴파일 옵션만 켜면 즉시 잡아낼 수 있는 구조입니다.

이 빌드(arm64+lib-musl)는 overlap=0이라 **tlsp가 TCB 끝과 정확히 일치**하고, ABI 거리 16바이트는 전부 패딩 2가 채웁니다. 참고로 구 musl 모드(overlap=16)라면 tlsp가 TCB 안쪽 16바이트 지점(+192)으로 들어가고 패딩 2가 0이 됩니다 — 총 크기는 어느 모드든 동일합니다(패딩1 8 + TCB 200 + 패딩2 + .tdata + .tbss, `ukarch_tls_area_size()`, tls.c:181-188).

### 핵심 관찰 3가지 (발표 멘트용)

1. **복사는 딱 한 곳** — `.tdata`의 `memcpy`(`tls.c:267`)뿐이고, 나머지는 전부 0 클리어 아니면 libC 위임입니다.
2. **TCB 내용은 Unikraft가 모른다** — `CONFIG_UKARCH_TLS_HAVE_TCB`면 콜백(`ukarch_tls_tcb_init`)으로 libC에 넘기고, 아니면 그냥 0으로 밉니다(`tls.c:246-250`). 소유권 분리가 코드에 그대로 드러나는 지점.
3. **크기 함수와 쓰기 함수는 한 몸** — 마지막 assert(`tls.c:278-279`)가 `ukarch_tls_area_size()`와 실제 쓴 바이트 수의 일치를 보증합니다. 레이아웃을 바꾸려면 두 쪽을 같이 바꿔야 한다는 신호입니다.
