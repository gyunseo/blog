---
title: IntelliJ와 WSL를 사용할 때 "Preparing WSL build environment..."에서 멈춤 현상 해결하기
pubDatetime: 2023-10-21T23:41:00+09:00
featured: false
draft: false
tags:
  - IntelliJ
  - JetBrains
  - Java
  - WSL
  - JDK
description: Windows Defender가 문제였다...
---

## Table of contents

## 들어가며

<https://www.jetbrains.com/help/idea/how-to-use-wsl-development-environment-in-product.html>에 나온대로, Windows Intellij IDEA Ultimate와 함께 WSL Ubuntu를 사용하고 있다. (Remote Development - WSL이 아니다.)  
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/how-to-fix-intellij-idea-stuck-on-preparing-wsl-build-environment-1697899532148.jpeg)
여기서 초록색 Run 버튼을 눌러, `Main.main()`을 실행하려 하면, `Preparing WSL build environment...`가 나오며 IntelliJ가 멈춰 버린다.  
이를 해결해 보고자 한다.

## Windows 보안 - 바이러스 및 위협 방지 - 바이러스 위협 방지 설정 - 설정 관리

하기 이미지와 같이 `Windows 보안 - 바이러스 및 위협 방지 - 바이러스 위협 방지 설정 - 설정 관리`를 눌러서 메뉴에 진입한다.

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/how-to-fix-intellij-idea-stuck-on-preparing-wsl-build-environment-1697899742499.jpeg)
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/how-to-fix-intellij-idea-stuck-on-preparing-wsl-build-environment-1697899819740.jpeg)

## 제외 - 제외 추가 또는 제거

`Windows 보안 - 바이러스 및 위협 방지 - 바이러스 위협 방지 설정 - 설정 관리`에 진입했다면, 하기 이미지와 같이 `제외 추가 또는 제거` 메뉴에 진입한다.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/how-to-fix-intellij-idea-stuck-on-preparing-wsl-build-environment-1697899819740.jpeg)
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/how-to-fix-intellij-idea-stuck-on-preparing-wsl-build-environment-1697899855742.jpeg)

## 제외 사항 추가

폴더: `\\wsl.localhost\Ubuntu`, `C:\Users\[사용자명]\AppData\Local\JetBrains`
프로세스: `fsnotifier.exe`, `idea64.exe`

상기와 같이 제외 사항을 추가하면, 더 이상 Intellij에서 멈춤 현상이 일어나지 않는다.  
이 방법이 잘 안되면, 그냥 Windows Defender를 끄면 된다.

## 참고 문서

- <https://stackoverflow.com/questions/74450189/how-to-fix-intellij-idea-stuck-on-preparing-wsl-build-environment>
- <https://github.com/microsoft/WSL/issues/8995#issuecomment-1380187901>
- <https://youtrack.jetbrains.com/issue/IDEA-293604/IntelliJ-is-slow-hanging-when-working-with-WSL-filesystem#focus=Comments-27-6180537.0-0>
- <https://www.jetbrains.com/help/idea/how-to-use-wsl-development-environment-in-product.html>
