---
title: Ubuntu Linux에서 pacakge 삭제하기
postSlug: delete-package-on-ubuntu-linux
pubDatetime: 2023-09-28T02:07:00+09:00
featured: false
draft: false
tags:
  - Ubuntu
  - Linux
  - package
description: Ubuntu Linux에서 package를 완전 삭제하는 과정을 담았습니다.
---

## Table of contents

## 들어가며

WSL에 설치된 neovim version을 봤는데 너무 outdated됐다.
그래서 구글링을 조금 해 보니, `sudo apt install -y neovim`으로 설치하면 안됐었다.
일단은 지금 설치된 `neovim`을 삭제해야 하니, 이왕 `neovim` package를 삭제하는 김에, Ubuntu Linux에서 package를 완전 삭제하는 방법을 post로 작성하려 한다.

## package 확인

삭제하고자 하는 package의 이름을 정확히 알기 위해 하기와 같은 명령어를 입력한다.

```bash
dpkg --list | grep "검색하려는 package 이름"
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/delete-package-on-ubuntu-linux-1695834986730.jpeg)
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/delete-package-on-ubuntu-linux-1695835050430.jpeg)

## package 삭제

```bash
sudo dpkg --purge "삭제하려는 package 이름"
```

상기 명령어로 검색했던 package를 삭제한다.

```bash
sudo dpkg --purge neovim
sudo dpkg --purge neovim-runtime
sudo dpkg --purge python3-neovim
sudo dpkg --purge python3-pynvim
```

다시 package를 검색해서 제대로 삭제가 됐는지 확인한다.

```bash
dpkg --list | grep neovim
dpkg --list | grep nvim
```
