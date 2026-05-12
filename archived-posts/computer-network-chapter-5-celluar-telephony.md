---
title: Chapter 5 Celluar Telephony
pubDatetime: 2023-10-12T12:07:00+09:00
featured: false
draft: false
tags:
  - Computer-Science
  - Computer-Network
  - celluar-telephony
description: Celluar Telephony에 대해서 공부한 거 정리
---

## Table of contents

## Celluar Telephony

- Each celluar service area is divided into small regions called **cell**s
- Each cell contains an antenna and is controlled by a small office, called the **base station (BS) (기지국)**
- Each base station is controlled by a switching office, called a **mobile switching center (MSC)**
  - MSC는 기지국을 control한다.
  - MSC가 핵심적인 역할을 한다. 전화를 연결하고, 전화를 얼마나 했는지, 데이터를 얼마나 썼는지 등
  - 그거에 따라 과금을 하기도 한다.
- The MSC coordinates communication between all the base stations and the telephone central office
  - It is responsible for <u>connetcing calls, recording call information, and billing</u>

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/celluar-telephony-1697080731772.jpeg)

- 휴대폰의 무선 연결은 BS까지
- 기지국과 연결이 되는 범위가 Cell이다. (가상의 공간)
- BS과 MSC는 유선으로 연결이 된다. (서울-부산이면 기지국까지만 무선으로 연결된다.)
- 하나의 MSC에 연결의 Cell들이 연결돼 있다.
- BS는 생각보다 하는 역할이 없다.

## Frequency-reuse Principle

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/celluar-telephony-1697080852481.jpeg)

- In a pattern with reuse factor 4, only one cell separates the cells using the same set of frequencies.
- 각 셀마다 주파수를 다른 주파수를 사용한다. (왼쪽 그림은 최소한 네 개의 서로 다른 주파수가 있어야 한다.)
- 같은 주파수를 사용하면 통신을 하는 데에 방해를 받는다.
- 그래도 혹시 파란 1번이 회색 1번까지 갈 수 있으니, 조금 더 안심하게 하기 위해서, 오른쪽 그림은 7개 셀을 사용한다.)
- 위의 설명을 reuse factor라고 한다. (7개 말고도 더 늘릴 수 있다.)
- 서울과 지방 SBS radio 주파수가 다른 것이 그 원리이다.
- 차를 몰고 가다 보면, 점점 다른 지역으로 가게 되면 라디오가 지직거린다. (각 지역의 주파수를 찾아서 맞추어야 한다.)

## Transmitting

- The mobile station scans the band, seeking a setup channel
  with a strong signal, and sends the data (phone number) to the
  closest base station using that channel.
- The base station relays the data to the MSC.
- The MSC sends the data on to the telephone central office.
- If the called party is available, a connection is made and the
  result is relayed back to the MSC.
- mobile station이 band를 스캔한다. (나의 기지국이 어디있지?)
- 인접 기지국들에서 신호가 잡히는데, strong signal이 오는 곳의 기지국과 연결을 한다.
- 휴대전화에서 이제 data를 보내면, BS에서 그 data를 MSC로 relay한다.
- MSC는 다시 telephone central office로 data를 전송하고, 알맞은 원격지로 data가 찾아가게 된다.

## Receiving

- MSC는 자기 자신이 관장하는 cell들에게 paging이라는 것을 보낸다.
- 통상적으로 그 번호가 어디 있는지 알고 있다. (전화를 했는데, 상대 전화기가 꺼져 있다면 그 어느 MSC에도 존재하지 않는 것이다.)
- 내가 전화하려는 mobile station은 어느 기지국에 있는 것인가? (paging)
- 어느 곳에 있다는 것을 알게 되면, call setup이 연결되고, 전화가 된다.
- MSC searches for the location of the mobile station by **sending query signals to each cell** in a process called **paging**
- MSC transmits a ringing signal and, **when the mobile station answers**, assigns a voice channel to the call.
  ![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699270250/image_ttrr4n.png)

## Handoff

- The mobile station moves from one cell to another.
  When it does, the signal may become weak.
  The MSC seeks a new cell that can better accommodate the
  communication.
- 한 셀에서 다른 셀로 가는 것을 handoff라고 한다.
  ![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699270266/image_ul3yqg.png)

- Hard Handoff
- Communication must first be broken with the previous base
  station before communication can be established with the new
  one. (a "break before make" connection)
- break before make connection
  (통화가 안될 가능성이 생김)
  ![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699270325/image_uacqox.png)
- hard handoff는 위험 부담이 있다.
- 새로 connection을 맺으려는 BS에 더 이상 선이 없어서, 수용이 안될 수도 있다.

- Soft Handoff
  A mobile station can communicate with two base stations at the
  same time. During handoff, a station may continue with the new
  base station before breaking from the old one. (a "make before
  break" connection)
- make connection before break
  (중간 구역에서는 양다리를 걸친다.)
- 딴 구역으로 들어가는 순간, 이전의 통신을 끊는다.
  현재는 대부분 Soft Handoff를 사용한다.
  ![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699270441/image_qmujo3.png)

## Roaming

- <u>Neighboring service providers can provide extended coverage through a roaming contract</u>
- 예: 호주에 있는 사람이 영국으로 가도 서로 통신이 되는 구조
  ![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699296486/image_icooc7.png)

## 이동통신 서비스의 진화

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699297762/image_cb0qj4.png)

- 와이브로는 지금 거의 사용되지 않음

## First Generation

- subscriber line을 없애서 통신하려고 나온 것.
- it was designed for voice communication using analog signals.
- **Advanced Mobile Phone System** (AMPS)
  - it uses **FDMA(Frequency Division Multiple Access)** to separate channels in a link
  - AMPS operates in the $800MHz$ band
  - the system uses two separate analog channels for forward and reverse.

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/celluar-telephony-1697081996594.jpeg)

상기 그림에서

- Each band is $25MHz$, made of **832** $30kHz$ analog channels.
- 이론상 **832대**가 동시에 통화가 가능하다.
- 채널을 할당해 주고, 그것으로 소통한다.
- 원래 목적이 subscriber line을 대체하는 것이라, $300Hz$~$3300Hz$ 사이의 사람 목소리 주파수 대역이 $3kHz$라 그리 설정했다.
- frequency modulation이라는 것을 사용하면, 폭이 $30kHz$로 늘어난다.
  ![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/celluar-telephony-1697082165826.jpeg)

## Second Generation (2G)

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699298174/image_odfors.png)

- the second generation was mainly <u>designed for digitized voice</u>.

- IS-136 D-AMPS
- GSM
- IS-95 CDMA

### D-AMPS

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/celluar-telephony-1697082325233.jpeg)

- digital로 변환하면서 기존에 비해 최대 3배 수용이 가능해졌다.
- 832개의 채널을 하나 뽑아서, 3대를 연결한다.
- time division multiple access (TDMA)를 사용해서 3배 수용이 가능해졌다.
- The evolution of the analog AMPS into a digital system is digital AMPS.
- D-AMPS uses the same bands and channels as AMPS.
- D-AMPS, or IS-136, is a di ital cellular hone s stem usingTDMA and FDMA.

### GSM

- **Global System for Mobile Communcation** (유럽 표준)
- reuse factor: 3
- The Global System for Mobile Communication (GSM) is a
  European standard.
  The aim was to replace a number of incompatible 1G
  technologies.
- Because of the complex error correction mechanism, GSM allows a reuse factor as low as 3.
  ![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/celluar-telephony-1697082403892.jpeg)
  ![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/celluar-telephony-1697082424305.jpeg)
- GSM은 8명이 들어올 수 있다.
- $25MHz$ 채널을 **124개**의 채널로 나누고, 한 채널은 $200kHz$이다.
- 한 채널에 8명이 들어 온다.

내부 프레임 구조:
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/celluar-telephony-1697082457601.jpeg)

### IS-95

- Interim Standaard 95, based on CDMA and DSSS (Direct Sequence Spread Spectrum)
- 이때 부터 GPS 지원
- **Pilot channel** sends a continuous stream of 1s to mobile station
- 디지털 통신이 가능했다.
- IS-95 defines two data rate sets
  - first set: 9600, 4800, 2400, 1200bps
  - second set: 14400, 7200, 3600, 1800bps

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/celluar-telephony-1697082584604.jpeg)

- 휴대폰 **ESN(electornic serial number)** 으로 사용자 식별 (이거와 음성을 섞어 채널로 쏜다.)
- 20개의 채널이 있다. 한 채널에 64명의 사용자를 수용할 수 있었다.
- 음성은 3kHz로 가정한다.
- 음성과 ESN을 섞어서 채널로 쏘는 구조였다.
  ![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/celluar-telephony-1697082662309.jpeg)
- 전화를 받을 때에도 ESN이 관련된다.

## Third Generation

- The 3G can provide <u>both digital data and voice
  communication</u>.
- The 3G concept started in 1992, when ITU issued a blueprint
  called Internet Mobile Communication for year 2000 (IMT-
  2000).
- Some criteria for 3G technology as outlined the next slide.
- provide both digital data and voice communication
- Internet Mobile Communication for 2000 (IMT-2000)

- voice quality comparable to that of the existing public telephone network
- 144Kbps, 384Kbps, 2Mbps
- a band of 2GHz
- bandwidth: 2MHz
- 인터넷 사용가능
  ![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/celluar-telephony-1697082809953.jpeg)

## Fourth Generation (4G)

- data rate 100Mbps (moving car), 1Gbps for stationary user
- 모든 걸 IP packet으로 바꿔서 보내겠다. All IP, packet-switched, networks
- Some of the objectives defined by the 4G working group are
  as follows:
  A spectrally efficient system
  High network capacity
- Data rate of 100Mbps for access in a moving car and I Gbps
  for stationary users.
- Data rate of at least 100Mbps between any two points in the
  world.
- Smooth handoff across heterogeneous networks.
  High QoS for next generation multimedia support.
- Interoperability with existing wireless standards
- **All IP**, <u>packet-switched. networks</u>.
