---
title: Windows에 WSL을 설치하자
pubDatetime: 2023-10-08T14:39:00+09:00
featured: false
draft: false
tags:
  - WSL
  - Windows
description: WSL 설치하는 과정을 담았다.
---

## Table of contents

## 들어가며

최근에 WSL 오류가 많이 나서 WSL를 재설치하려 한다.
일단 먼저 [Windows에서 WSL을 완전히 삭제하자.](uninstall-wsl-completely-on-windows.md)에 나온 대로 WSL을 완전히 삭제한다.
그리고 WSL을 설치한다.

## WSL 설치 명령

Powershell을 관리자 권한으로 실행한 후, 하기 명령어를 입력한다.

```powershell
wsl --install
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-wsl-on-windows-1696743830305.jpeg)
상기 이미지처럼 나온다면 설치가 잘 된 것이다.
이미지에 나온 대로 재부팅을 하자.

## 재부팅 후

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-wsl-on-windows-1696744165825.jpeg)
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-wsl-on-windows-1696744175895.jpeg)
상기 이미지처럼 Ubuntu 설치를 마무리하고, username을 설정하라고 한다.
username과 password를 잘 설정을 하고 나면, 하기 이미지와 같이 설정이 완료된다.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-wsl-on-windows-1696744245267.jpeg)

## Windows 기능 켜기/끄기 확인

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-wsl-on-windows-1696744570177.jpeg)
[Windows에서 WSL을 완전히 삭제하자.](uninstall-wsl-completely-on-windows.md)에서

- Hyper-V
- Linux용 Windows 하위 시스템
- Windows 하이퍼바이저 플랫폼
- 가상 머신 플랫폼

을 모두 체크해제하고, WSL을 삭제했었는데,

```powershell
wsl --install
```

을 하고 나니, 가상 머신 플랫폼만 설치가 돼 있다.
왜 그런지는 나도 모르겠다. (~~근데 잘 돌아가면 그만 아닌가?~~)
그런데 이후에 Docker Desktop을 Hyper-V 대신 WSL2를 backend로 이용해 설치하니, 또 Linux용 Windows 하위 시스템에 체크가 돼있었다.

## 참고 문서

<https://learn.microsoft.com/ko-kr/windows/wsl/install>
