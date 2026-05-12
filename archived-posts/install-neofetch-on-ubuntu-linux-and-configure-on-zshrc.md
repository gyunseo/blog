---
title: Ubuntu Linux에 neofetch 설치하고, zshrc에서 설정하기
pubDatetime: 2023-10-08T23:02:00+09:00
featured: false
draft: false
tags:
  - "#neofetch"
  - Ubuntu
  - Linux
  - zsh
  - powerlevel10k
  - terminal-customization
description: terminal을 킬 때 마다 멋있게 보이면 좋을 것 가탇.
---

## Table of contents

## 들어가며

나도 terminal을 킬 때마다 멋진 Ubuntu Ascii Banner가 나왔으면 한다.

## `neofetch` 설치

```zsh
sudo apt install -y neofetch
neofetch
# 제대로 실행되는지 확인
```

## `~/.zshrc`에 `neofetch` 명령어 추가

```zsh
nvim ~/.zshrc
```

상기 명령어로 `~/.zshrc`를 수정하여, 매번 terminal shell session이 시작될 때마다 `neofetch`가 실행되도록한다.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-neofetch-on-ubuntu-linux-and-configure-on-zshrc-1696773882315.jpeg)

## `powerlevel10k` warning

하지만 그렇게 한다면 하기 이미지와 같은 warning을 마주하게 된다.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-neofetch-on-ubuntu-linux-and-configure-on-zshrc-1696773948814.jpeg)
나는 굳이 `powerlevel10k` theme 일찍 안 봐도 상관 없으니깐,  
` typeset -g POWERLEVEL9K_INSTANT_PROMPT=off`를 해줄 것이다.

## `~/.p10k.zsh` 수정

```zsh
nvim ~/.p10k.zsh
```

`neovim`으로 하기 이미지와 같이 `~/.p10k.zsh` 파일을 수정한다.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-neofetch-on-ubuntu-linux-and-configure-on-zshrc-1696774087393.jpeg)

```zsh
source ~/.p10k.zsh
```

를 하고, shell session을 logout하고 다시 login하면,  
neofetch가 먼저 보이고, 그 다음에 `powerlevel10k` theme prompt가 나타난다.

## Shell Sessiong Login 화면

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-neofetch-on-ubuntu-linux-and-configure-on-zshrc-1696774546411.jpeg)
