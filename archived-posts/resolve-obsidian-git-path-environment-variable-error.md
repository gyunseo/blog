---
title: Obsidian Git Plugin의 PATH 환경 변수 오류 해결하기
pubDatetime: 2023-10-17T01:32:00+09:00
featured: false
draft: false
tags:
  - git
  - Obsidian
  - asdf
description: asdf가 문제였다...
---

## Table of contents

## 들어가며

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1705849055/image_wwem3b.png)

위에 같은 오류가 나면, `npx`를 못 찾는 거니, `npx` binary가 있는 directory를 PATH에 추가하면 된다.  
![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1705849163/image_qsbino.png)
obsidian git 설정에 들어가서 상기와 같이 설정하면 됩니다.  
제 `npx` binary의 PATH는 `/Users/gyunseo/.asdf/shims/` 였습니다.

## 참고 문서
