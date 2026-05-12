---
title: WSLg에 한글 입력 설정하기.
pubDatetime: 2023-10-01T21:53:00+09:00
featured: false
draft: false
tags:
  - WSL
  - WSLg
  - Hangul
  - kime
description: WSLg에서 한글 폰트 렌더링이 잘 안되고, 입력이 안된다... 해결하자.
---

## Table of contents

## 들어가며

최근에 WSL에서 GitKraken으로 WSL에 있는 repo들을 열어 보려고 했다.
그런데 한글 폰트 렌더링이 제대로 되지 않고, 한글 입력도 안됐다.
그래서 이를 WSL Zsh Shell에서 설정을 하고자 한다.

## locale 설정

```zsh
# 한국어 언어 팩 설치 (ko_KR.UTF-8 설치)
sudo apt install -y language-pack-ko

# 영어 언어 팩 설치 (en_US.UTF-8 설치) (bash shell에서 에러 메시지는 영어로 볼 거임)
sudo apt-get install -y language-pack-en
# 한글 폰트 설치
sudo apt install -y fonts-nanum* fonts-noto-cjk

# locale 확인
locale

# locale 변경
# ko_KR.UTF-8 선택
sudo dpkg-reconfigure locales

# powershell 가서 wsl --shutdown으로 WSL 종료하기
# 그러고 다시 WSL 키고, locale 명령어로 locale 확인
locale

# LC_MESSAGES만 en_US.UTF-8로 변경하기
# 마지막 줄에 export LC_MESSAGES=en_US.UTF-8 추가
nvim ~/.bashrc
source ~/.zshrc
```

## `fcitx` 설치

```
# fcitx 설치
sudo apt install -y fcitx fcitx-hangul dbus-x11
```

## `/etc/profile.d/fcitx.sh` 설정

`sudo nvim /etc/profile.d/fcitx.sh`로 `/etc/profile.d/fcitx.sh` file을 수정하자.

```zsh
#!/usr/bin/zsh
export QT_IM_MODULE=fcitx
export GTK_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx
export DefaultIMModule=fcitx

#optional
fcitx-autostart &>/dev/null
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-hangul-input-method-on-wslg-1698338240755.jpeg)

## `gnome-language-selector` 설치

```zsh

# gnome-language-selector 설치후, gnome language 선택, 한국어 추가하기 (있으면 냅두기)
sudo apt install -y language-selector-gnome
sudo gnome-language-selector
```

한국어가 없으면 Install / Remove Languages...에 들어가 설치하자.
keyboard input method system: `Fcitx 4`로 설정

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-hangul-input-method-on-wslg-1698337781758.jpeg)

## `fcitx` 설정

windows powershell에서 `wsl --shutdown`을 하자.  
그 이후, 다시 wsl shell에 접속하여 하기 작업을 수행하자.

```zsh
# fcitx에 Hangul이 있는지 확인 (없으면 추가)
# Appearance에 들어가, Font size와 Font 알맞게 설정 (11, Noto Sans CJK KR Regular로 함)
fcitx-config-gtk3
```

## 테스트

```zsh

# gedit으로 테스트, ctrl + space가 한/영 토글
sudo apt install -y gedit
gedit

# wsl --shutdown하고, 다시 접속해서 잘 되는지 확인하자
# gitkraken이 잘 되는지 확인하자
wget https://release.gitkraken.com/linux/gitkraken-amd64.deb
sudo apt install ./gitkraken-amd64.deb
gitkraken
# 잘 되네

## bruno 설치 및 테스트
sudo mkdir -p /etc/apt/keyrings
sudo gpg --no-default-keyring --keyring /etc/apt/keyrings/bruno.gpg --keyserver keyserver.ubuntu.com --recv-keys 9FA6017ECABE0266

echo "deb [signed-by=/etc/apt/keyrings/bruno.gpg] http://debian.usebruno.com/ bruno stable" | sudo tee /etc/apt/sources.list.d/bruno.list

sudo apt update
sudo apt install bruno
bruno
# 잘 안 되네
```

## 참고 문서

- <https://julialang.kr/?p=3174>
- <https://freetome.tistory.com/493>
- [WSL2에서 한글 입력 (velog.io)](https://velog.io/@alyac/wsl2-Korean-input)
