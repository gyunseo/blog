---
title: Data Communications and Networking Chapter 4 LANs Gigabit Ethernet
pubDatetime: 2023-10-03T02:00:00+09:00
featured: false
draft: false
tags:
  - Computer-Science
  - Computer-Network
  - Ethernet
  - Gigabit-Ethernet
  - LAN
description: Gigabit Ethernet 공부한 거 정리
---

## Table of contents

## Gigabit Ethernet (IEEE 802.3z Working Group, Gigabit Ethernet)

- 802.3z standard
- standard, fast ethernet과 compatible
- 48-bit address
- same frame format
- frame length의 min/max 그대로
- 1Gbps data rate를 유지하고, MAC sublayer를 그대로 유지하면 도저히 cable 길이를 맞출 수가 없어서 (그대로 유지한다고 가정하면 25m가 최대임), MAC sublayer를 바꾼다.

## Full-Duplex Mode

- CSMA/CD 필요 없다.

## Traditional

아무 조치도 안 한다.
25m 안에서 연결한다.

## Carrier Extension

최소 frame size를 64B에서 512B로 늘린다.
그러면 cable 길이를 200m까지 늘릴 수 있다.
어떻게 늘릴까?
가짜 데이터를 집어 넣는다. (padding)

## Frame Bursting

자잘한 frame들을 모아서 보낸다.
512B보다 작으면, 모아서 512B가 되면 붙여서 보낸다.
만약에 안 모이면? 그때는 Carrier Extension을 쓴다.

## Physical Layer

- point-to-point
- star
- two stars
- hierarchy of stars

## Implementation

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-gigabit-ethernet-1696267129485.jpeg)
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-gigabit-ethernet-1696266973254.jpeg)

- 1000Base-SX: two-wire short-wave fiber, 550m
- 1000Base-LX: two-wire long-wave fiber, 5000m
- 1000Base-CX: two-wire copper(STP), 25m
- 1000Base-T4: four-wire UTP, 100m

## Encoding

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-gigabit-ethernet-1696267212787.jpeg)

화살표 양방향으로 있으면 동시에 송/수신 안된다.
