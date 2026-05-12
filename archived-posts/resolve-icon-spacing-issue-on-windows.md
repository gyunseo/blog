---
title: Windows에서 Icon Spacing Issue를 해결하자
pubDatetime: 2023-10-22T10:10:00+09:00
featured: false
draft: false
tags:
  - Windows
  - Registry
  - Icon
  - UI
description: registry가 문제구나...
---

## Table of contents

## 들어가며

오늘 아침 노트북을 켰더니, 갑자기 아이콘 간격이 이상하게 벌어져 있었다.  
그래서 바로 구글에 windows icon spacing 해결 방법을 검색했다.  
해결 과정을 공유하고자 한다.

## `regedit`

`windows + r`을 눌러, 실행창을 연다.  
`regedit`을 입력하여 레지스트리 편집기를 연다.  
주소창에 `컴퓨터\HKEY_CURRENT_USER\Control Panel\Desktop\WindowMetrics`를 입력한다.  
그러면 하기 이미지와 같이 레지스트리값들이 표시된다.  
여기서 `IconSpacing`과 `IconVerticalSpacing` 값을 `-1125`로 바꾸고 재부팅한다.  
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/resolve-icon-spacing-issue-on-windows-1697952811442.jpeg)

## 참고 문서

- <https://support.microsoft.com/en-us/topic/how-to-change-the-spacing-between-desktop-icons-for-windows-8-made-easy-series-d24ef024-d605-4521-7cf4-79bbd560dbaf>
