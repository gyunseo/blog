---
title: Ubuntu Linux에서 System Locale 변경하기
pubDatetime: 2023-10-08T15:25:00+09:00
featured: false
draft: false
tags:
  - Locale
  - Ubuntu
  - Linux
description: Error Message는 영어로만 나오게 할 수 없을까?
---

## Table of contents

## 들어가며

Ubuntu Linux의 System Locale을 en_US.UTF-8에서 ko_KR.UTF-8로 변경하려고 한다. (단, LC_MESSAGES만 en_US.UTF-8로 유지할 것이다.)

### Bash Commands

```bash
# 한국어 언어 팩 설치 (ko_KR.UTF-8 설치)
sudo apt install -y language-pack-ko
```

```bash
# 영어 언어 팩 설치 (en_US.UTF-8 설치) (bash shell에서 에러 메시지는 영어로 볼 거임)
sudo apt-get install -y language-pack-en
```

```bash
# locale 확인
locale

# LANG=C.UTF-8
# LANGUAGE=
# LC_CTYPE="C.UTF-8"
# LC_NUMERIC="C.UTF-8"
# LC_TIME="C.UTF-8"
# LC_COLLATE="C.UTF-8"
# LC_MONETARY="C.UTF-8"
# LC_MESSAGES="C.UTF-8"
# LC_PAPER="C.UTF-8"
# LC_NAME="C.UTF-8"
# LC_ADDRESS="C.UTF-8"
# LC_TELEPHONE="C.UTF-8"
# LC_MEASUREMENT="C.UTF-8"
# LC_IDENTIFICATION="C.UTF-8"
# LC_ALL=
```

```bash
# locale 변경
# ko_KR.UTF-8 선택
sudo dpkg-reconfigure locales
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/change-system-locales-in-ubuntu-linux-1696746663971.jpeg)
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/change-system-locales-in-ubuntu-linux-1696746702104.jpeg)
상기 이미지처럼 선택

```bash
# powershell 가서 wsl --shutdown으로 WSL 종료하기
# 그러고 다시 WSL 키고, locale 명령어로 locale 확인
locale
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/change-system-locales-in-ubuntu-linux-1696746775436.jpeg)
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/change-system-locales-in-ubuntu-linux-1696746790937.jpeg)
`locale` 명령어로 system locale이 모두 `ko_KR.UTF-8`로 변한 것을 알 수 있고, `ddd`와 같이 잘못된 명령어를 입력해도, `LC_MESSAGES`가 한글로 나오는 것을 알 수 있다.  
그런데 필자는 알파벳으로 `LC_MESSAGES`를 확인하고 싶다.  
그래서 `LC_MESSAGES`는 `en_US.UTF-8`로 변경할 것이다.

```bash
# LC_MESSAGES만 en_US.UTF-8로 변경하기
# 마지막 줄에 export LC_MESSAGES=en_US.UTF-8 추가
vim ~/.bashrc
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/change-system-locales-in-ubuntu-linux-1696747076958.jpeg)

```bash
source ~/.bashrc
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/change-system-locales-in-ubuntu-linux-1696747096422.jpeg)
이제 `LC_MESSAGES`도 알파벳으로 잘 나오는 걸 확인할 수 있다.

## 참고 문서

<https://docs.oracle.com/cd/E26925_01/html/E27145/glmha.html>
