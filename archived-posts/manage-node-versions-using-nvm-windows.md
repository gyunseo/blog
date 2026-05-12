---
title: Windows에서 NVM으로 Node 버전 관리하기
postSlug: nvm-for-windows
pubDatetime: 2023-09-12T02:52:00+09:00
featured: false
draft: false
tags:
  - NVM
  - Windows
  - Node
description: registry가 문제구나...
---

## Table of contents

## 들어가며

최근에 Astro + Github Pages를 이용해서, 지금 이 블로그를 빌드 및 배포했다. 로컬에서는 WSL 환경에서 작업을 했고, vscode를 이용해서 글을 몇 개 써 봤다. 그런데 다음과 같은 문제에 봉착했다.

1. Obsidian을 사용해 md 작성이 불가. (WSLg를 사용해 Obsidian을 설치해서 쓰면 되지만, 아직은 시기 상조)
2. 윈도우 캡처를 이용해, WSL에 remote로 접속 중인 vscode에 paste할 시 여러가지 문제가 발생. (clipboard 공유가 안됨, png to jpg compression extension이 따로 없어서 용량 문제도 존재함. 물론 TinyPNG와 같은 api를 쓰면 해결이 될 거 같기도 한데... 좀 더 연구를 해 봐야 겠다.)

그래서 그냥 Local Windows에서 내 블로그를 Git Clone을 하여, 빌드하고 배포하기로 했다. (며칠 전에 Bun 1.0.0이 release돼서, 이걸로 runtime을 바꿔서 빌드하고 배포해 보려 했건만, Bun은 아직 Windows 지원이 미비해서, 포기해야 겠다.)

## 기존의 NVM

기존의 NVM의 경우 Ubuntu, MacOS, WSL 같은 OS에서만 작동한다. 그래서 원래는 Windows에서는 사용이 안됐다. 그런데 nvm-windows라는 게 나오면서, Windows OS에서도 사용이 가능해 졌다.

## nvm-windows

GitHub에서 [nvm-windows release note](https://github.com/coreybutler/nvm-windows/releases)를 보면, nvm-windows를 install할 수 있다.
설치 이후 Powershell(admin shell)에서 하기의 명령어를 통해 제대로 설치됐는지 확인하자. (필자의 경우 재부팅을 하니 제대로 명령어가 먹혔다.)

```powershell
nvm -v
```

```powershell
1.1.11
```

## Node.js 설치

하기의 명령어로 가장 최신의 LTS Node.js runtime을 설치하자.

```powershell
nvm install lts
```

하기 명령어로 설치된 Node.js 버전들을 확인할 수 있다.

```powershell
nvm ls
```

```powershell

    18.17.1
```

## Node.js 버전 선택

하기 명령어로 로컬 머신에서 사용할 Node.js runtime version을 선택하자.

```powershell
nvm use 18.17.1
```

```powershell
Now using node v18.17.1 (64-bit)
```

하기 명령어로 현재 사용 중인 Node.js 버전을 확인해 보자.

```powershell
nvm ls
```

```powershell

  * 18.17.1 (Currently using 64-bit executable)
```
