---
title: Unikraft tls.c 분석
pubDatetime: 2026-07-26T21:30:00+09:00
featured: false
draft: true
tags:
  - Kernel
  - Unikernel
  - Unikraft
description: TBD
---

## Table of contents

## `tls.c`란?

Thread Local Storage마다 갖는 메모리 블럭의 크기를 계산/초기화/포인턴 변환하는 코드 뭉치들의 모음.  

## 함수들의 역할 표

| 함수                         | 위치            | 역할                                                                                                                          |
| ---------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `ukarch_tls_area_size()`     | `tls.c:181-188` | 패딩1 + TCB + 패딩2 + .tdata + .tbss 총합                                                                                     |
| `ukarch_tls_area_align()`    | `tls.c:176-179` | 항상 16                                                                                                                       |
| `ukarch_tls_tlsp(area)`      | `tls.c:191-201` | TLS area 시작주소 -> `tpidr_el0`에 넣을 값으로 변환                                                                           |
| `ukarch_tls_area_get(tlsp)`  | `tls.c:204-211` | 위 함수의 역변환                                                                                                              |
| `ukarch_tls_tcb_get(tlsp)`   | `tls.c:214-219` | tlsp -> TCB 시작주소 (uksched의 `uk_thread_uktcb()`가 사용, `lib/uksched/include/uk/tcb_impl.h:91`)                           |
| `ukarch_tls_area_init(area)` | `tls.c:226-281` | 레이아웃대로 채우기: 패딩 zero -> TCB init -> `.tdata`를 `_tls_start`에서 `memcpy` (`tls.c:267`) → `.tbss` zero (`tls.c:274`) |

## `ukarch_tls_area_init`

## 함수가 불리는 지점들

- (a) 부팅 시 1회: 부트 컨텍스트용 (아래 참고)
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
- (b) 스레드 생성 시마다: 스레드별 TLS 할당
`lib/uksched/thread.c`: `_uk_thread_struct_init_alloc()` (정의 `thread.c:383`):
  - 할당: `uk_memalign(a_uktls, ukarch_tls_area_align(), ukarch_tls_area_size() + ...)` `thread.c:421-425` (ectx와 함께 할당) 또는 `thread.c:438-439`
  - 포인터 계산: `tlsp = ukarch_tls_tlsp(tls);` (`thread.c:446`)
  - 초기화: `ukarch_tls_area_init(tls);` (`thread.c:467`)
  - 결과: `struct uk_thread`에 저장: `t->tlsp` / `t->uktlsp` 필드: `lib/uksched/include/uk/thread.h:59-60`
- (c) 컨텍스트 스위치 시마다: tlsp 저장/복원
`lib/uksched/include/uk/sched_impl.h`: `uk_sched_thread_switch()` (정의 `:100-133`):

```c
prev->tlsp = uk_lcpu_tlsp_get();     /* sched_impl.h:111  이전 스레드 tlsp 저장 */
uk_lcpu_tlsp_set(next->tlsp);        /* sched_impl.h:117  다음 스레드 tlsp 복원 */
...
ukarch_ctx_switch(&prev->ctx, &next->ctx);   /* sched_impl.h:132 */
```


