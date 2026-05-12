---
title: Ubuntu Linux에 neovim appimage 설치하기
postSlug: install-neovim-appimage-on-ubuntu-linux
pubDatetime: 2023-09-28T03:44:00+09:00
featured: false
draft: false
tags:
  - Ubuntu
  - Linux
  - neovim
  - appimage
description: Ubuntu에 neovim appimage를 설치하고, 작동하는 과정을 담았습니다.
---

## Table of contents

## 들어가며

`neovim` 최신 버전을 설치하려면, GitHub stable release에서 appimage를 다운받아, 해당 appimage를 실행해야 한다.
그래서 `neovim`을 [stable release](https://github.com/neovim/neovim/releases/tag/stable)에 나온 대로 설치하려 한다.

## `FUSE 2.x` 설치

[Ubuntu Linux에 FUSE 설치하기](install-fuse-on-ubuntu-linux.md)문서를 참고.

## AppImage 다운로드 후, 실행하기

```bash
curl -LO https://github.com/neovim/neovim/releases/latest/download/nvim.appimage
chmod u+x nvim.appimage
./nvim.appimage
```

## AppImage directory 생성 및 symbolic link 생성

```zsh
mkdir .appimage
mv nvim.appimage .appimage
sudo ln -s ~/.appimage/nvim.appimage /usr/local/bin/nvim
nvim
# nvim 명령어로 잘 실행되는지 확인
```

## 참고 문서

- <https://github.com/neovim/neovim/releases/tag/stable>
- <https://github.com/neovim/neovim/wiki/Installing-Neovim#linux>
- <https://askubuntu.com/questions/1467544/any-reason-not-to-store-appimage-files-in-usr-local-bin>
