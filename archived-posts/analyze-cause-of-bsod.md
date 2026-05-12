---
title: 노트북 BSOD 원인을 분석하자.
pubDatetime: 2023-10-01T20:07:00+09:00
featured: false
draft: false
tags:
  - BSOD
  - Windows
  - Laptop
ogImage: ""
description: 대체 내 노트북은 왜 이러는 걸까..?
---

## Table of contents

## 들어가며

오늘 저녁에 갑자기 내 노트북 (Yoga Slim 7 ProX 14ARH7) 에서 하기 그림과 같은 폰트 렌더링 오류가 발생하고, 갑자기 팬이 엄청 돌면서 무한 BSOD (블루스크린) 오류가 발생했다.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/analyze-cause-of-bsod-1696158899126.jpeg)

> 하... 그냥 밀고 Ubuntu를 설치할까?

라는 생각이 많이 들었지만, 노트북 + Linux 조합은 절대 하지 말라는 인터넷 고수 형님들의 고견에 따라 그 생각은 꾸욱 참고 어떻게 하면 이 고질병을 고칠 수 있을까를 많이 고민했다.
폰트 렌더링 이슈는 `MacType` issue일 것이라는 의심이 강하게 들었고, BSOD 문제는 매번 `PowerToys`가 업데이트 될 때마다 발생하는 문제여서 해당 프로그램의 issue일 것이라는 의심이 강하게 들었다.

## 해결 방법

그래서 `PowerToys`를 삭제했다.
BSOD 문제는 해결이 되는지는 지켜봐야 할 것 같다.
<https://github.com/microsoft/WSL/issues/6982#issuecomment-901255679> 같은 사람이 있는 걸 보면, `PowerToys`는 분명 문제가 있는 게 분명하다. (`PowerToys`가 Windows Vmmem Memory Leak을 일으킨다는 Issue이다.)
폰트 렌더링 이슈는 그냥 [Windows에서 Font Rendering Issue를 해결하자](resolve-font-rendering-issue-on-windows.md) post를 보고 해결하면 된다.

## 참고 문서

<https://github.com/microsoft/WSL/issues/6982#issuecomment-901255679>
