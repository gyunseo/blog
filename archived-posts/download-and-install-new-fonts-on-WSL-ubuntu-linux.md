---
title: WSL에 font를 설치하자
postSlug: install-font-on-wsl-ubuntu-linux
pubDatetime: 2023-09-17T02:09:00+09:00
featured: false
draft: false
tags:
  - WSL
  - Linux
  - Ubuntu
description: WSL에 font를 설치하는 과정을 담았습니다.
---

## Table of contents

## 들어가며

WSL에서 주로 작업을 하고 markdown을 작성하는 일이 잦다. (물론 blog post는 Windows + Obsidian으로 작성하지만...) 그래서, pandoc으로 markdown을 pdf로 변환하는 경우가 많은데, 이때 내가 원하는 font로 지정해서 변환을 해준다. 요즘 Monospace에서 CJK를 지원해 주는 `Sarasa Gothic`에 꽂혀서, 해당 font를 WSL Ubuntu Linux에서 설치하는 과정을 보여 주려 한다.

## `root`로 User Switch

```bash
su - root
```

## `Sarasa Gothic` font 다운로드

```zsh
cd /usr/share/fonts/truetype/
mkdir sarasa
cd sarasa
wget https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.10/sarasa-gothic-super-ttc-0.41.10.7z
sudo apt-get install -y p7zip-full
7z e sarasa-gothic-super-ttc-0.41.10.7z
rm -rf sarasa-gothic-super-ttc-0.41.10.7z
ls
# ttc 파일이 잘 있는지 확인하기
```

## `Sarasa Nerd Font` 다운로드

```zsh
cd /usr/share/fonts/truetype/sarasa
wget https://github.com/jonz94/ttc-sarasa-gothic-nerd-fonts/releases/download/v0.42.1-0/sarasa-nerd-font-ttc.zip
sudo apt install -y unzip
unzip sarasa-nerd-font-ttc.zip
rm -rf sarasa-nerd-font-ttc.zip
ls
# ttc 파일이 잘 있는지 확인하기
```

## font 설치하기

```bash
sudo apt install -y fontconfig
# 하기 명령어로 ttc 폰트 설치
sudo fc-cache -f -v
# 하기 명령어로 설치된 폰트 확인
fc-list :lang=ko | grep Sarasa
```
