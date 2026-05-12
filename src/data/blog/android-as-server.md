---
title: Termux를 이용해 Android를 서버로 사용하기
pubDatetime: 2025-05-11T22:17:00+09:00
featured: true
draft: false
tags:
  - Android
  - Termux
  - Server
description: Termux를 이용해 Android를 서버로 사용해보자. 간단하다.
---

## Table of contents

## Termux 설치하기

`FDroid`에서 Termux 앱을 설치합니다.

## Termux에게 저장공간 접근 권한 주기

에뮬레이터가 성공적으로 돌아간다면,

```bash
# 저장공간 접근 권한 허용. 현재 홈 경로에 storage 폴더 생성됨
termux-setup-storage
```

위 명령어로 Termux 앱에게 Android의 저장공간에 대한 접근 권한을 줍니다.

## SSH 서버 설정하기

```bash
pkg update && pkg upgrade
```

```bash
pkg install net-tools termux-services
```

```bash
pkg install openssh
```

한번 session을 log out한 뒤에, 다시 terminal 접속합니다.

```bash
# ssh daemon을 서비스로 등록
sv-enable sshd
```

이렇게 SSH 데몬을 서비스로 등록하면, 이제 직접 `sshd`라고 커맨드를 입력하지 않아도, Termux 앱이 실행되면 자동으로 SSH가 실행됩니다.

그럼 이제 SSH로 접속을 해야 하는데, 지금 username과 passwd를 알 수 없죠?

```bash
whoami
# ux_xxxx 형태로 나옵니다.
```

```bash
passwd
# 해당 유저에 대한 passwd를 설정합니다.
```

그러고 다른 기기의 SSH Client에서 해당 Android 기기로 접속하시면 됩니다.  
참고로 SSH Daemon Config 파일은 `$PREFIX/etc/ssh/sshd_config`에 위치한다고 합니다.  
패스워드 기반으로 접속하면 보안상 문제가 있을 수 있으니, 공개키 인증 방식으로 SSH 접속을 하고 싶다면, 해당 sshd config 파일을 수정하시면 되겠습니다.
