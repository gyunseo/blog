---
title: jabba를 이용해 Windows에서 JDK 버전 관리하기
pubDatetime: 2023-10-22T16:53:00+09:00
featured: false
draft: false
tags:
  - Windows
  - jabba
  - JDK
description: IntelliJ + WSL 조합이 잘 안 돼서, Windows에 직접 JDK를 설치하자...
---

~~jabba project 업데이트가 없어서 더 이상 jabba로 jdk version management 안 합니다.
[Powershell Script를 이용해 Windows에서 JDK Version Manage하기](switch-multiple-jdk-versions-on-windows.md) 포스트 참고.~~

## Table of contents

## 들어가며

필자는 Windows Laptop을 사용한다.  
그래서 Windows native IntelliJ + WSL 조합으로 Java 개발을 하려고 했다.  
아뿔싸! 근데 상기 조합은 정말 최악이다.  
그래서 그냥 Windows native JDK + Windows native IntelliJ 조합으로 개발을 진행하려 한다.  
Linux/Mac처럼 `asdf`같은 기똥한 version manager가 없긴하지만, [jabba](https://github.com/shyiko/jabba)를 이용하면, Windows에서도 JDK 버전 관리가 가능하다.  
본격적으로 Windows에서 `jabba`를 설치하기 전에, [IntelliJ가 설치한 JDK 삭제하기](remove-jdks-installed-by-intellij.md) 포스트를 읽고, IntelliJ에 설치된 `JDK`를 삭제해 주자.
(앞으로 모든 명령은 관리자 권한 모드에 실행해 주자.)

## Installation

```powershell
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-Expression (
  Invoke-WebRequest https://github.com/shyiko/jabba/raw/master/install.ps1 -UseBasicParsing
).Content
```

하기 명령어로 설치가 제대로 됐는지 확인할 수 있다.

```powershell
jabba --version
# outputs: 0.11.2
```

## JDK Versions 확인

하기 명령어로 availabe JDK version들을 리스트한다.

```powershell
jabba ls-remote
```

그런데 나오는 JDK들이 조금 오래된 버전들 같다.

## Install from Custom URL

```powershell
jabba install temurin@17.0.8=zip+https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.8.1%2B1/OpenJDK17U-jdk_x64_windows_hotspot_17.0.8.1_1.zip
```

```powershell
jabba install temurin@11.0.21=zip+https://github.com/adoptium/temurin11-binaries/releases/download/jdk-11.0.21%2B9/OpenJDK11U-jdk_x64_windows_hotspot_11.0.21_9.zip
```

```powershell
jabba install azul@11.0.21=zip+file://C:\Users\rbstj\Downloads\zulu11.68.17-ca-jdk11.0.21-win_x64.zip
```

```powershell
jabba install azul@17.0.9=zip+file://C:\Users\rbstj\Downloads\zulu17.46.19-ca-jdk17.0.9-win_x64.zip
```

## Switch to a Different Version of JDK

```powershell
jabba use temurin@17.0.8
java --version
```

```powershell
openjdk 17.0.8.1 2023-08-24
OpenJDK Runtime Environment Temurin-17.0.8.1+1 (build 17.0.8.1+1)
OpenJDK 64-Bit Server VM Temurin-17.0.8.1+1 (build 17.0.8.1+1, mixed mode, sharing)
```

## `.jabbarc` 사용

project 내에서 다른 JDK version을 이용하려면,

```powershell
echo "temurin@11.0.21" > .jabbarc
# jabba use는 .jabbarc를 읽어 옴
jabba use
```

## `default -> C:\Users\rbstj\.jabba\jdk\temurin@17.0.8`

```powershell
# 앞으로 jabba use default를 하면 jabba use temurin@17.0.8과 동일하게 됨
# Administrator에서 실행안 하면 오류남
jabba alias default temurin@17.0.8
```

# `$PROFILE` 수정

```powershell
nvim $PROFILE
```

```powershell
code $PROFILE
```

하기 `ps1` 코드 추가

```powershell
# 이미 default JDK version이 alias가 된 상태에서
jabba use default
```

그러면 새 PowerShell 인스턴스가 매번 `jabba use default`를 실행한다.

## `%JAVA_HOME%` 설정

powershell을 administrator 권한으로 실행 후,

```powershell
# modify global PATH & JAVA_HOME
$envRegKey =[Microsoft.Win32.Registry]::LocalMachine.OpenSubKey('SYSTEM\CurrentControlSet\Control\Session Manager\Environment', $true)
$envPath=$envRegKey.GetValue('Path', $null, "DoNotExpandEnvironmentNames").replace('%JAVA_HOME%\bin;', '')
[Environment]::SetEnvironmentVariable('JAVA_HOME', "$(jabba which $(jabba current))", 'Machine')
[Environment]::SetEnvironmentVariable('PATH', "%JAVA_HOME%\bin;$envPath", 'Machine')
```

powershell 종료 후, 다시 들어 가서

```powershell
echo $ENV:JAVA_HOME
```

```powershell
C:\Users\rbstj\.jabba\jdk\temurin@17.0.8
```

~~그런데 생각해 보니, default alias를 바꿀 때마다, 저 global PATH와 JAVA_HOME을 변경하는 script를 실행하면 되니,~~ (안되네 ㅋㅋ)

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/manage-jdks-on-windows-using-jabba-1697993673393.jpeg)

## Uninstallation

> `%USERPROFILE%\.jabba` (on Windows).  
> If at any point of time you decide to uninstall **jabba** - just remove this directory.

`%USERPROFILE%\.jabba` folder를 지우면 된다.

## 참고 문서

- <https://github.com/shyiko/jabba>
- <https://kwonnam.pe.kr/wiki/java/jabba>
