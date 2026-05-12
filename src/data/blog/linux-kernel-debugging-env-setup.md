---
author: Gyunseo Lee
title: 리눅스 커널 디버깅 환경 셋업
pubDatetime: 2025-07-12T16:44:00+09:00
modDatetime: 2026-05-06T23:20:00+09:00
featured: true
draft: false
tags:
  - Linux
  - Kernel
  - QEMU
  - WSL
  - WSL2
  - x86_64
  - x86
  - AMD64
  - GDB
  - Docker
  - Container
description: 리눅스 커널 디버깅 환경 셋업
ogImage: ""
---

## Table of contents

## TL;DR

```bash
# current working directory는 linux project root directory
docker run -it --rm -v "$PWD:/src" -w /src debian:jessie bash

# 컨테이너 내부
cat > /etc/apt/sources.list <<'EOF'
deb [trusted=yes check-valid-until=no] http://archive.debian.org/debian jessie main
deb [trusted=yes check-valid-until=no] http://archive.debian.org/debian-security jessie/updates main
EOF
echo 'Acquire::Check-Valid-Until "false";' > /etc/apt/apt.conf.d/99no-check-valid-until
apt-get -y update
apt-get install -y build-essential libncurses5-dev bc kmod cpio bison flex

# 깨끗하게 만들기
make mrproper

# 빌드 전 설정
sed -i 's/-m elf_x86_64/-Wl,-m,elf_x86_64/g' arch/x86/vdso/Makefile
sed -i 's/-m elf_i386/-Wl,-m,elf_i386/g' arch/x86/vdso/Makefile
make ARCH=x86_64 defconfig

# 디버그 필수
scripts/config --enable CONFIG_DEBUG_INFO
scripts/config --enable CONFIG_DEBUG_KERNEL
scripts/config --enable CONFIG_FRAME_POINTER
scripts/config --disable CONFIG_OPTIMIZE_INLINING

# 락/스케줄러 분석용
scripts/config --enable CONFIG_LOCKDEP
scripts/config --enable CONFIG_PROVE_LOCKING
scripts/config --enable CONFIG_DEBUG_SPINLOCK
scripts/config --enable CONFIG_DEBUG_MUTEXES
scripts/config --enable CONFIG_DEBUG_ATOMIC_SLEEP
scripts/config --enable CONFIG_SCHED_DEBUG
scripts/config --enable CONFIG_SCHEDSTATS

# 진단 정보
scripts/config --enable CONFIG_PRINTK_TIME
scripts/config --enable CONFIG_DEBUG_BUGVERBOSE
scripts/config --enable CONFIG_KALLSYMS_ALL
scripts/config --enable CONFIG_STACKTRACE

# 디버깅 방해 요소
scripts/config --disable CONFIG_DEBUG_RODATA
scripts/config --disable CONFIG_RELOCATABLE

# 마지막에 이거로 정합성 맞추기
yes "" | make ARCH=x86_64 oldconfig
# 리눅스 이미지 빌드!
make ARCH=x86_64 -j$(nproc) -k 2>&1 | tee build.log

# 컨테이너에서 빠져나오기 (ctrl + d)

# 터미널 A
# linux project root에서
qemu-system-x86_64 -kernel arch/x86/boot/bzImage \
  -append "console=ttyS0 nokaslr" -nographic -s -S

# 터미널 B
# linux project root에서
gdb vmlinux
# gdb 내부
(gdb) set architecture i386:x86-64:intel
(gdb) target remote :1234
(gdb) hbreak start_kernel
(gdb) c
```

## 들어가며

아이엠루트(Iamroot) Linux Kernel Debugging 책을 기반으로 커널 스터디를 진행하며 필요한 커널 환경 셋업을 위해 기록해 둡니다.

## 전제조건

- Host Machine: WSL2 Ubuntu 24.04.4 x86_64(amd64)
- Linux Kernel Version: v2.6.36
- gdb, qemu-system, docker가 설치 완료돼 있어야 함.

## 도커 컨테이너 실행

linux 프로젝트 루트 디렉터리에서 하기 커맨드를 실행합니다.

```bash
# current working directory는 linux project root directory
docker run -it --rm -v "$PWD:/src" -w /src debian:jessie bash
```

도커 컨테이너 내부에서 빌드를 하는 이유는 다음과 같습니다.

- 리눅스 커널 2.6.36 버전은 너무 오래전(10년도 더 된 버전)의 버전이기 때문에, 현대 리눅스 배포판에 설치되는 tool들을 이용하여 빌드하면 많은 에러가 나옵니다.
- 그래서 오래전 데비안(Debian) 리눅스 배포판 컨테이너 내부에서 빌드 환경을 셋업하고, 빌드를 진행합니다.
- 이와 같이 진행하는 것이 훨씬 품이 적게 듭니다.

## 옛 데비안 컨테이너의 APT 되살리기

```bash
cat > /etc/apt/sources.list <<'EOF'
deb [trusted=yes check-valid-until=no] http://archive.debian.org/debian jessie main
deb [trusted=yes check-valid-until=no] http://archive.debian.org/debian-security jessie/updates main
EOF
echo 'Acquire::Check-Valid-Until "false";' > /etc/apt/apt.conf.d/99no-check-valid-until
apt-get -y update
apt-get install -y build-essential libncurses5-dev bc kmod cpio bison flex
```

| 동작                           | 해결하는 문제                                       |
| ------------------------------ | --------------------------------------------------- |
| sources.list을 archive로 변경  | EOL(End of Life)된 미러의 404 Not Found Error       |
| `[trusted=yes]`                | 만료된 GPG 키                                       |
| `check-valid-until=no` (두 곳) | 만료된 Release 파일                                 |
| `apt-get -y update`            | 새 인덱스 가져오기                                  |
| 패키지 설치                    | gcc + ncurses + bc + cpio + flex/bison 등 빌드 도구 |

위 동작들은 전부 **동결된 옛 데비안에서 그래도 apt를 이용해서 패키지 다운로드를 하고 싶다**라는 한 가지 목표를 위한 것들입니다.

## 레포지터리를 Clean 상태로 되돌리기

```bash
make mrproper
```

본격적으로 빌드 설정과 빌드를 하기 전에 레포지터리를 초기상태로 되돌립니다.  
오브젝트(\*.o) 파일들과 설정 파일들까지 모두 지웁니다.

## vDSO Makefile 패치

옛 리눅스 커널(v2.6.36)에서의 vDSO Makefile이 modern GCC 옵션 정책에 맞도록 호환성 패치를 합니다.

```bash
sed -i 's/-m elf_x86_64/-Wl,-m,elf_x86_64/g' arch/x86/vdso/Makefile
sed -i 's/-m elf_i386/-Wl,-m,elf_i386/g' arch/x86/vdso/Makefile
```

2.6.36 시절엔 GCC 입장에서 미지의 옵션은 ld에 패스해주는 게 표준 동작이었습니다.  
그땐 그게 잘 동작했고, 굳이 -Wl,로 명시적으로 감쌀 필요가 없었습니다.  
그게 코드도 더 깔끔해 보였고요.  
GCC가 헤딩 정책을 바꾼 건 사용자 실수(오타)를 빨리 잡아주려는 의도였는데, 옛 리눅스 빌드 시스템 입장에선 호환성 깨지는 변경이었습니다.  
modern 커널(3.x 이상)은 이미 이 부분이 다 -Wl, 형태로 고쳐져 있습니다.

## .config 파일 설정 및 빌드

```bash
make ARCH=x86_64 defconfig

# 디버그 필수
scripts/config --enable CONFIG_DEBUG_INFO
scripts/config --enable CONFIG_DEBUG_KERNEL
scripts/config --enable CONFIG_FRAME_POINTER
scripts/config --disable CONFIG_OPTIMIZE_INLINING

# 락/스케줄러 분석용
scripts/config --enable CONFIG_LOCKDEP
scripts/config --enable CONFIG_PROVE_LOCKING
scripts/config --enable CONFIG_DEBUG_SPINLOCK
scripts/config --enable CONFIG_DEBUG_MUTEXES
scripts/config --enable CONFIG_DEBUG_ATOMIC_SLEEP
scripts/config --enable CONFIG_SCHED_DEBUG
scripts/config --enable CONFIG_SCHEDSTATS

# 진단 정보 켜기
scripts/config --enable CONFIG_PRINTK_TIME
scripts/config --enable CONFIG_DEBUG_BUGVERBOSE
scripts/config --enable CONFIG_KALLSYMS_ALL
scripts/config --enable CONFIG_STACKTRACE

# 디버깅 방해 요소 끄기
scripts/config --disable CONFIG_DEBUG_RODATA
scripts/config --disable CONFIG_RELOCATABLE

# 마지막에 이거로 정합성 맞추기
yes "" | make ARCH=x86_64 oldconfig
# 리눅스 이미지 빌드!
make ARCH=x86_64 -j$(nproc) -k 2>&1 | tee build.log
```

1. `.config` 만들기 => 리눅스 커널 빌드 시 보게 되는 설정 파일입니다. 해당 파일만 보관해두면 같은 커널을 언제든 다시 빌드할 수 있습니다. 2번 전까지 모든 과정이 `.config`를 만들고 다듬는 과정입니다.
2. `make ARCH=x86_64 -j$(nproc) -k 2>&1 | tee build.log` => `.config`를 보고 실제 빌드하기. 빌드 할 때는 호스트 머신의 코어 개수만큼 병렬로 컴파일.

## `bzImage`와 `vmlinux` 확인하기

```bash
ls -lh vmlinux arch/x86/boot/bzImage
echo $?
```

`0`이 출력되면 성공입니다.

- `vmlinux`: 모든 커널 오브젝트 파일을 링크해서 만든 statically linked ELF executable. 디버그 심볼 포함, stripped 안 됨.
- `bzImage`: vmlinux를 raw binary로 변환 → strip → 압축(gzip/bzip2/xz) → 압축 해제 코드 + Linux x86 boot protocol 헤더로 감싼 부팅 가능한 이미지

## 컨테이너에서 나와 `QEMU`와 `GDB`로 디버깅하기

빌드를 다 마쳤으면 ctrl + d로 컨테이너를 나옵시다.

```bash
# 터미널 A
# linux project root에서
qemu-system-x86_64 -kernel arch/x86/boot/bzImage \
  -append "console=ttyS0 nokaslr" -nographic -s -S

# 터미널 B
# linux project root에서
gdb vmlinux
# gdb 내부
(gdb) set architecture i386:x86-64:intel
(gdb) target remote :1234
(gdb) hbreak start_kernel
(gdb) c
```

하기 스크린샷과 같이 나오면 성공입니다 :)  
![QEMU와 GDB 조합으로 Linux Kernel 디버깅 스크린샷](https://img.gyunseo.com/linux-kernel-debugging-env-setup/linux_kernel_qemu_gdb_screenshot.png)
