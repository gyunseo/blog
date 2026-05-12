---
title: Ubuntu Linux에 zsh을 설치하고, default shell을 zsh로 바꾸자.
pubDatetime: 2023-10-08T16:39:00+09:00
featured: false
draft: false
tags:
  - Ubuntu
  - Linux
  - zsh
  - terminal-customization
description: bash은 못 생겼다.
---

## Table of contents

## 들어가며

최근에 WSL을 재설치 하고 나서, WSL Ubuntu Linux의 기본 shell인 bash가 조금 못 생겼음을 인지했다.  
그래서 plugin도 많고, theme도 많은 zsh을 기본 shell로 바꾸려고 한다.

## Install zsh

```bash
sudo apt install -y zsh
```

설치 이후, `zsh --version` 명령어로 제대로 설치됐는지 확인하자.

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-zsh-on-ubuntu-linux-1696753635034.jpeg)

## Set up zsh as default

```bash
chsh -s $(which zsh)
```

상기 명령어로 default shell을 `zsh`로 변경하자.

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-zsh-on-ubuntu-linux-1696753757536.jpeg)
`ctrl + d`로 logout 한 이후, 다시 shell에 접속하자.

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-zsh-on-ubuntu-linux-1696754262377.jpeg)
그러면 상기 이미지와 같이 zsh 설정 function이 나온다.

- `q`
- `0`
- `1`
- `2`

중에 하나 입력하면 되는데, `2`가 `~/.zshrc`를 알아서 추천 설정에 따라 설정해주는 것 같아서, `2`를 누르고 들어갔다.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-zsh-on-ubuntu-linux-1696754339498.jpeg)

그러면 상기 이미지처럼 shell이 바뀌었을 것이다.  
`echo $SHELL` 명령어를 통해 `zsh`로 바뀌었음을 확인도 가능하다.

## locale 설정

```zsh
vim ~/.zshrc
```

로 `.zshrc` 파일을 편집한다.
`export LC_MESSAGES=en_US.UTF-8`을 `.zshrc` 마지막 line에 추가한다.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-zsh-on-ubuntu-linux-1696754497696.jpeg)

```zsh
source ~/.zshrc
```

로 logout하지 않고, 현재 shell session에 설정을 바로 반영하자.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-zsh-on-ubuntu-linux-1696754696387.jpeg)
`LC_MESSAGES`가 `en_US.UTF-8`로 설정된 것을 볼 수 있고, `LC_MESSAGES`도 알파벳으로 잘 나온다.

## 참고 문서

<https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH>
