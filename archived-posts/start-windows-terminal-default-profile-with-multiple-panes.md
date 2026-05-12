---
title: Multiple Panes로 Windows Terminal Default Profile 시작하기
pubDatetime: 2023-10-22T15:25:00+09:00
featured: false
draft: false
tags:
  - Windows
  - terminal-customization
  - WSL
description: windows terminal을 눌렀을 때 위에는 Powershell, 아래에는 WSL이 나오게 하고 싶었다...
---

## Table of contents

## 들어가며

Windows Terminal은 정말 좋은 Terminal Application이다.  
그런데 매번 Windows Terminal을 눌러서 시작했을 때, 여러개의 panes로 시작하지 못하는 게 조금 아쉬웠다.  
 그래서 그 방법을 공유하고자 한다.

## `settings.json` 수정

Windows Terminal `settings.json`에 하기 값을 추가한다.

```json
"startupActions": "split-pane -p \"WSL2 Ubuntu\" -H ; move-focus down",
```

참고로, `WSL2 Ubuntu`는 필자가 Windows Terminal에서 설정한 Profile 이름이다.  
각자 본인의 Profile 이름에 맞게 적으면 된다.  
그러면 Windows Terminal 실행했을 때, 하기 이미지와 같이 나온다.

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/start-windows-terminal-default-profile-with-multiple-panes-1697956503446.jpeg)

## 참고 문서

- <https://stackoverflow.com/questions/60400642/how-to-start-the-new-windows-terminal-with-multiple-panes-by-default>
- <https://learn.microsoft.com/en-us/windows/terminal/command-line-arguments?tabs=windows>
