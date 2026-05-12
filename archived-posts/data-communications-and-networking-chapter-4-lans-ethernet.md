---
title: Data Communications and Networking Chapter 4 LANs Ethernet
pubDatetime: 2023-10-02T00:04:00+09:00
featured: false
draft: false
tags:
  - Computer-Science
  - Computer-Network
  - LAN
  - Ethernet
description: Ethernet 공부한 거 정리
---

## Table of contents

## Ethernet

Local Area Network: a computer network that is designed for <u>a limited geographic area such as a building or a campus</u>

Ethernet: a family of wired computer networking technologies commonly used in LAN

1985년, IEEE에서 <u>다양한 manufacturers의 equipment들 사이의 intercommunication을 가능케하기</u> 위해 Project 802라 불리는 프로젝트를 시작.

ISO에서는 또한 이걸 **ISO 8802** 표준으로 승인.

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-part1-1696173798651.jpeg)

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-part1-1696173925385.jpeg)
MAC이라 불리는 sublayer는 각 LAN에 대해 specific한 media access method (protocol)를 정의한다.

Ethernet MAC은 CSMA/CD가 Ethernet LANs를 위한 media access method (protocol)라고 정의한다.

Token Ring MAC과 Token Bus MAC은 각각 token-passing method가 Token Ring LANs와 Token Bus LANs를 위한 media access method (protocol)라 정의한다.

Logical Link Control (LLC): <u>flow control, error control, part of the framing duties</u>e들이 한 sublayer로 collected된다. (그 sublayer가 LLC)

LLC는 모든 IEEE LANs를 위해 one single data link control protocol을 제공한다.

LLC는 **protocol data unit (PDU)** 을 정의한다.

- control field: for flow and error control
- DSAP and SSAP fields는 source (보내는 쪽의 어플리케이션이 무엇이다. 한컴오피스냐 곰플레이어냐)와 destination (받는 쪽의 어플리케이션이 무엇이다.)에 있는 upper-layer protocol을 정의한다. (랜카드 위에 올라 가는 application protocol이 무엇이냐?)

근데 most upper-layer protocol들은 LLC를 안 쓴다. (복잡하고 끼어들면 속도가 느려진다.)

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-part1-1696175216740.jpeg)

DSAP: Destination Service Access Point
SSAP: Source Service Access Point

만약 email을 썼다고 하면, 이메일 전체 내용이 data에 쏙 들어 간다.
SSAP는 source (나), DSAP (상대방 이메일)

(HDLC는 WAN Protocol)

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-part1-1696175792874.jpeg)

- Standard Ethernet: 10Mbps
- Fast Ethernet: 100Mbps
- Gigabit Ethernet: 1Gbps
- 10 Gigabit (Ten-Gigabit) Ethernet: 10Gbps

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-part1-1696176038888.jpeg)

- 802.1Q: Virtual LANs (VLANs)
- **802.2: Logical Link Control**
- **802.3: CSMA/CD Ethernet**
- 802.3af: Power over Ethernet (PoE) (예, 인터넷 전화)
- **802.4: Token Bus**
- **802.5: Token Ring**
- 802.15: Wireless Personal Area Network (WPAN) (사람 한명의 공간 정도)
- 802.15.1: Bluetooth
- 802.15.4: ZigBee (공장에서 씀)
