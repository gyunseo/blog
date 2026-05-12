---
title: WSL에 Google Chrome을 설치하자
postSlug: install-google-chrome-on-WSL
pubDatetime: 2023-09-10T22:50:00+09:00
featured: false
draft: false
tags:
  - WSL
  - Linux
description: WSL에 Google Chrome을 설치하는 과정을 담았습니다.
---

## Table of contents

## 들어가며

WSL에서 md으로 과제 레포트를 쓰고, 이를 pdf로 변환하려고 하는데... Google Chrome을 설치하라는 에러 로그가 나왔다. 그래서 WSL에 Google Chrome을 설치해 보려고 한다.

## Bash Script

```bash
# dependencies를 install합니다.
sudo apt install -y fonts-liberation libu2f-udev libvulkan1
# 디렉터리를 임시 폴더로 변경합니다.
cd /tmp
# wget을 사용하여 다운로드합니다.
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
# 현재 안정적인 버전을 가져옵니다.
sudo dpkg -i google-chrome-stable_current_amd64.deb
# 패키지를 수정합니다.
sudo apt install --fix-broken -y
# 패키지를 구성합니다
sudo dpkg -i google-chrome-stable_current_amd64.deb
# 다음 명령어로 google-chrome을 실행합니다.
google-chrome
```

## google-chrome 실행 화면

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-google-chrome-on-WSL.jpeg)
