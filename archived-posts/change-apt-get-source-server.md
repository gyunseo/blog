---
title: Ubuntu Linux의 apt-get source server를 변경하자.
pubDatetime: 2023-10-09T16:09:00+09:00
featured: false
draft: false
tags:
  - Ubuntu
  - Linux
  - apt
description: mirror.kakao.com이 빠르구나...
---

## Table of contents

## 들어가며

최근에 dockerfile을 build하면서, apt-get source server에서 package를 가져올 때 엄청 느렸었던 경험이 있었다.  
그래서 apt-get source server를 `mirror.kakao.com`으로 바꾸고, build 시간을 거의 $1/4$배 단축시켰었는데, 그래서 내 WSL Ubuntu와 Ubuntu Desktop도 apt-get source server를 바꾸려고 한다.

## `zsh` 명령어

```zsh
sudo sed -i 's/archive.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list
sudo sed -i 's/security.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list
```

참고로 이렇게 하고 나서 오류가 날 수 있는데, 이에 대해서 책임은 지지 않습니다 ㅎㅎ

```zsh
sudo sed -i 's/archive.ubuntu.com/ftp.kaist.ac.kr/g' /etc/apt/sources.list
sudo sed -i 's/security.ubuntu.com/ftp.kaist.ac.kr/g' /etc/apt/sources.list
```

## 참고 문서
