---
title: Ubuntu Power Off Freezing 현상 해결하기
pubDatetime: 2023-10-16T21:34:00+09:00
featured: false
draft: false
tags:
  - Linux
  - Ubuntu
  - Nvidia
description: Yoga Slim 7 ProX 14ARH7에 Ubuntu를 처음 설치하면, power off를 했을 때 벽돌이 된다...
---

이 글은 Ubuntu-22.04 기준으로 작성됐습니다.

## Table of contents

## 들어가며

Yoga Slim 7 ProX 14ARH7 (내 노트북) 에 Ubuntu를 Native로 설치했다.  
그런데, 웬걸 잘 설치되고 작동이 되더니, 갑자기 노트북을 끄려고 하니깐 문제가 생겨 버렸다.  
노트북이 power off 되지를 않는다.  
그래서 이 문제를 해결 하려고 엄청 찾아 봤다.  
그 과정을 공유하려 한다.

## dddd

```zsh
apt search nvidia-driver
```

```
apt-cache search 'nvidia-driver-' | grep '^nvidia-driver-[[:digit:]]*'
apt-cache search 'nvidia-driver-' | grep '^nvidia-driver-[[:digit:]]*' | sort -k 3 -t '-'
## search for DKMS package too ##
apt-cache search 'nvidia-dkms-' | grep '^nvidia-dkms-[[:digit:]]*'

```

## aaaa

- <https://askubuntu.com/questions/1482328/ubuntu-shutdown-prevent-kvm-exiting-hardware-virtualization>
- <https://www.cyberciti.biz/faq/ubuntu-linux-install-nvidia-driver-latest-proprietary-driver/>
-
