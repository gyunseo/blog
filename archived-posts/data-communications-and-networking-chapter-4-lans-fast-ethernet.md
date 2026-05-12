---
title: Data Communications and Networking Chapter 4 LANs Fast Ethernet
pubDatetime: 2023-10-03T01:33:00+09:00
featured: false
draft: false
tags:
  - Computer-Network
  - Computer-Science
  - LAN
  - Ethernet
  - Fast-Ethernet
description: Fast Ethernet 공부한 거 정리
---

## Table of contents

## Fast Ethernet (IEEE 802.3u Working Group, Fast Ethernet)

- **100Mbps**
- Standard Ethernet과 backward-compatible
- Frame format, min/max frame lengths, addressing (48-bit address) 모두 10Mbps Ethernet과 동일

## MAC Sublayer

- MAC sublayer (Fast Ethernet MAC)는 Fast Ethernet LAN에 대한 CSMA/CD Media Access Method (Protocol)을 똑같이 그대로 정의한다.
- bus topology를 버리고, star topology만 이용하기로 했다. (hub만 이용하는 구조이다.)
- autonegotiation 기능은 10Mbps이냐 100Mbps이냐에 따라 모두 지원한다.
  - 기존

## Implementation

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-fast-ethernet-1696265660260.jpeg)
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-fast-ethernet-1696265637883.jpeg)

- 100Base-TX: two wires category 5 UTP or STP, 100m
- 100Base-FX: two wires fiber, 185m
- 100Base-T4: Four wires category 3 UTP, 100m

wire가 2개 이상이어서, 송/수신이 동시에 된다. 그래서 뒤에 X 붙임.
기존 케이블(10Mbps용 category 3)을 쓰는데, 100Mbps가 지원되게 해주는 implementation. (근데, half-duplex여서 송/수신이 동시에 안된다.)
cable의 max length는 250m이다. (CSMA/CD protocol과 최소 frame size를 그대로 유지한다고 하면은...)

## Encoding

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-fast-ethernet-1696265878803.jpeg)
저 그림을 보면 왜 100Base-T4가 왜 half-duplex인지 알 수 있다.
(검정색 2개 wire가 송/수신 시 모두 쓰인다. )
