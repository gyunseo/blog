---
title: Windows에서 WSL을 완전히 삭제하자.
pubDatetime: 2023-10-08T13:07:00+09:00
featured: false
draft: false
tags:
  - Linux
  - WSL
  - WSLg
description: WSL에서 오류가 많이 난다...
---

## Table of contents

## 들어가며

WSL에서 메모리 누수 문제도 있고, 가끔 가다 자기 혼자 죽기도 해서, 이번 기회에 완전히 삭제를 하고 깔끔하게 재설치를 하려고 한다.

## 설정-앱-설치된 앱

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/uninstall-wsl-completely-on-windows-1696738168183.jpeg)

상기 이미지처럼 Windows 설정-앱-설치된 앱에 들어와서 WSL 관련된 program을 모두 삭제한다.
필자는 Ubuntu->Windows Subsystem for Linux WSLg Preview->Windows Subsystem for Linux Update->Linux용 Windows 하위 시스템 순으로 삭제했다.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/uninstall-wsl-completely-on-windows-1696738223576.jpeg)
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/uninstall-wsl-completely-on-windows-1696738269567.jpeg)

## 설정-앱-선택적 기능-기타 Windows 기능

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/uninstall-wsl-completely-on-windows-1696738604428.jpeg)
상기 이미지에서 기타 Windows 기능을 선택한다.

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/uninstall-wsl-completely-on-windows-1696741218580.jpeg)
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/uninstall-wsl-completely-on-windows-1696741270383.jpeg)
그러면 상기 이미지와 같이 Windows 기능 켜기/끄기가 나온다.
여기서

- Hyper-V
- Linux용 Windows 하위 시스템
- Windows 하이퍼바이저 플랫폼
- 가상 머신 플랫폼

체크를 해제한다.  
그리고 PC를 재부팅한다.

## 참고 문서

- <https://pureinfotech.com/uninstall-wsl-windows-11/>
- <https://www.makeuseof.com/uninstall-wsl-windows/>
- <https://superuser.com/questions/1510172/hyper-v-vs-virtual-machine-platform-vs-windows-hypervisor-platform-settings-in-p>
- <https://learn.microsoft.com/ko-kr/windows/wsl/faq#wsl-2-------------------vmware----virtualbox------------->
- <https://superuser.com/questions/1556521/virtual-machine-platform-in-win-10-2004-is-hyper-v/1619173#1619173>
