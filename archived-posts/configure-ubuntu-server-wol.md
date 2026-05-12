---
title: Ubuntu Server Wake on LAN 설정하기
pubDatetime: 2023-10-09T17:12:00+09:00
featured: false
draft: false
tags:
  - Ubuntu
  - WOL
  - Linux
description: 따로 패키지들을 설치해줘야 한다...
---

## Table of contents

## 들어가며

일단 기본적으로 메인보드가 WOL을 지원해야 하낟.  
이는 서버의 전원이 꺼져있을 때에도 메인보드에서 LAN에 대기 전원을 공급하여, 서버를 키라는 패킷 신호가 오는지 확인하라고 시켜야 하기 때문이다.  
최근 메인보드들은 대부분 WOL을 지원한다.
BIOS에서 Wake on LAN, Wake on Magic Packet 등의 항목이 있는지 확인하고 Enable한다.

## 관련 패키지 설치

```zsh
sudo apt install -y net-tools ethtool wakeonlan
```

상기 명령어로 관련 package를 설치한다.

## `NIC` 이름 확인

`ifconfig`로 NIC 이름을 확인한다.

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/configure-ubuntu-server-wol-1696839462822.jpeg)
`enp3s0`가 NIC 이름이다.

## WOL enable

```zsh
# WOL을 수동으로 enable
sudo ethtool -s enp3s0 wol g
# WOL 작동하는지 확인
sudo ethtool enp3s0
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/configure-ubuntu-server-wol-1696839605440.jpeg)

`Wake-on` 항목이 `g`로 set돼 있으면 정상적으로 작동한 것이다.  
방금 `ethtool`로 설정했던 건 재부팅하면 초기화된다.  
부팅할 때마다 해당 설정을 켜주도록 하려면, 네트워크 인터페이스 설정 파일을 수정해야 한다.

## `/etc/netplan/01-network-manager-all.yaml` file 수정

`etc/netplan/01-network-manager-all.yaml` file을 하기와 같이 수정한다.

```
network:
  ethernets:
    enp3s0:
      dhcp4: true
      wakeonlan: true
  version: 2
  renderer: NetworkManager
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/configure-ubuntu-server-wol-1696839991455.jpeg)
하기 명령어를 입력하여, 위 변경사항을 적용한다.

```zsh
sudo netplan apply
# outputs:
WARNING: systemd-networkd is not running, output will be incomplete.

Failed to reload network settings: No such file or directory
Falling back to a hard restart of systemd-networkd.service
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/configure-ubuntu-server-wol-1696840435975.jpeg)
이런 오류가 날 것인데, 명령어를 똑같이 한번 더 실행시켜 주면 된다.

## 테스트

```zsh
# server 종료시키기
sudo shutdown -h now
```

iptime wol로 하니깐 잘 된다 ㅎㅎ

## 참고 문서

<https://ca.ramel.be/117>
