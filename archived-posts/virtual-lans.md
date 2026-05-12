---
title: Virtual LANs
pubDatetime: 2023-10-19T12:02:00+09:00
featured: false
draft: false
tags:
  - Computer-Network
  - Computer-Science
  - VLANs
description: VLANs 공부한 것 정리
---

## Table of contents

## 들어가며

- Ina switched LAN, changes in the work group mean physical changes in the network configuration.
- VLAN can be roughly defined as a local network configured by software, **not by physical wiring**

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/virtual-lans-1697684931390.jpeg)
포트수가 부족해지면 문제가 생긴다.
-> software적으로 reconfiguration을 해주자.
하기 그림과 같이.

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/virtual-lans-1697684816040.jpeg)

backbone switch -> VLAN 기능 제공 필요
이것은 단순한 reconfiguration만으로 불가능하다.
VLAN에서는 protocol이 필요하다.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/virtual-lans-1697685000548.jpeg)

## Membership

- interface number
  - 1번, 2번, ...번 포트는 몇번 VLAN
- MAC Address

  - 훨씬 더 융통성이 있다. 어느 포트에 꽂든 MAC address에 따라 VLAN설정

- Combination
  - 위의 두 방법을 섞은 것

## Configuration

- Manual configuration
- automatic configuration
- semiautomatic configuration

## Communications between switches

- multiswitched backbone
- IEEE 802.1q defines the format for **frame tagging**
- when a frame is traveling between switches, **an extra header is added to the MAC frame to define the destination VLAN**

## Advantages

- Cost and time reduction
  - 부서 이동이 잦은데 회사에서는 그때 비용을 줄일 수 있다.
- Creating virtual workgroups

- Security
  - 꼭 물리적으로 hub가 세 대 있는 것처럼 traffic이 분리된다.
  - 관리자는 그러나 다 볼 수 있다. 미러링 포트라는 게 있는데, 거기에 연결하면 다 볼 수 있다.
