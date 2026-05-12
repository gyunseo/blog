---
title: Chapter 5 Cable Networks
pubDatetime: 2023-11-05T23:19:00+09:00
featured: false
draft: false
tags:
  - Computer-Network
  - Computer-Science
  - Cable-Networks
description: Cable Networks
---

## Table of contents

## Cable Networks

- Cable television is a system of providing television to consumers via radio frequency signals transmitted to televisions through <u>fixed optical fibers or coaxial cables</u> as opposed to the over-the-air method used in traditional television broadcasting in which a television antenna is required.
- It was called **community antenna TV (CATV)** because an antenna at the top of a tall hill or building received the signals from the TV stations and distributed them, via coaxial cables, to the community.
- The cable TV office, called the **head end**, receives video signals from broadcasting stations and feeds the signals into coaxial cables.
  - Cable television **head end** is <u>a master facility for receiving television signals for processing and distribution</u> over a cable television system.
- 옛날에는 TV를 전파로 쏴 주었다. 그래서 안테나가 TV 전파를 제대로 수신하지 못할 경우(분지에 위치해 있다든지, 건물에 부딪히든지)가 있었다.
- 그래서 TV를 어떻게 잘 볼 수 있게 할 것이냐해서 나온 것이 **community antenna TV**이다.
- 사람들을 위해서 전파가 잘 잡히는 곳에 안테나를 놓고, 그것에서 전파를 받는다.
- 그것을 다시 coaxial cable로 다시 뿌려준다.
- 원칙은 무선으로 받아서, 유선으로 쏘아 주는 것이다.
- cable tv 방송사를 **head end**라고 한다.
  ![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699263699/image_tnwrz1.png)
- receiving antenna로 깨끗한 방송을 받는다.
- head end에서 동축 케이블(coaxial cable)로 받는다.
- utp 케이블보다 동축 케이블이 bandwidth가 넓어서, 화질이 더 좋다. 그래서 동축 케이블로 전파를 쏜다.
- 근데 동축 케이블로 쏘면 멀리 못간다.
- 증폭기(amplifier)를 달아서 멀리 보낸다.
- TV를 잘 보기 위해서 꾸민 네트워크이다.
- 증폭해서 가다 보니, 화질이 안 좋아진다.

## HFC Network

- 현존하는 매체 중에 noise가 가장 안 끼는 것이 광케이블이다.
- 광 케이블을 쓰면 빛으로 가면 화질도 깨끗하고, 거리도 멀리 간다.
- 그래서 광케이블로 대체한다.  
  ![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699263878/image_gemveo.png)
- 그러면 TV에서도 광케이블로 바꿔야 하는데, 그것을 바꾸려는 가정집은 아무도 없다.
- 그래서 동네 근처까지만 광케이블로 오고, 집에서만 동축 케이블을 쓰게 된다.
- 광 케이블도 쓰고, 동축 케이블도 쓴다하여, **Hybrid fiber-coaxial network (HFC network)** 가 된다.
- **Hybrid fiber-coaxial (HFC)** network uses a combination of fiber-optic and coaxial cable.
- **The regional cable head (RCH)** normally serves up to 400,000 subscribers.
- The RCHs feed the **distribution hubs**, each of which serves up to 40,000 subscribers.
- 그러다가 여기서 인터넷을 쓸 수 있도록 할 수 없을까?

## Cable TV for Data Transfer

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699264738/image_hwg3yh.png)

- The coaxial cable has a bandwidth that ranges from $5MHZ$ to $750MHz$.
  - The cable company has divided this bandwidth into three bands.
  - Each TV channel occupies $6MHz$, this can accommodate more than 80 channels.
- 어차피 TV 방송을 하는 곳을 정해져 있으니, 나머지 대역폭을 Data Transfer를 위해 사용하자.
- DSL과 똑같이 선을 그대로 이용하면서, 인터넷을 사용하자.
- Downstream data band is divided into $6MHz$ channels
  - Theoretically, downstream data can be received at $30Mbps$. The standard specifies only $27Mbps$.
- Upstream data can be sent at $12Mbps$.

## Sharing

- Upstream Sharing
  - The upstream data bandwidth is only $37MHz$.
  - There are only 6 $6MHz$ channels available.
  - **Time sharing** is used.
    - If one subscriber want to send data, she or he contends for the channel with others who want access; the subscriber must wait until the channel is available.
- Downstream Sharing
  - The downstream band has 33 channels of $6MHz$.

## CM(Cable Modem)

- A cable modem is a type of modem that provides access to a data signal sent over the cable television infrastructure.
  ![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699265460/image_ljkqpk.png)

## CMTS(Cable Modem Transmission System)

- **a cable modem termination (or transmission) system or CMTS** is equipment typically found in a cable company's headend, or at cable company hubsite and is used to **provide high speed data services**, such as cable internet or VoIP, to cable subscribers.
- ADSL modem과 CM이 비슷하다. DSLAM과 CMTS가 비슷하다.
  ![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699265625/image_oglnao.png)

## Data Transmission Schmes: DOCSIS

Several schemes have been designed to create <u>a standard for
data transmission over an HFC network</u>.
Prevalent is the one devised by Multimedia Cable Network
Systems (MCSN), called **Data over Cable Service Interface
Specification (DOCSIS)**.
<u>DOCSIS is an international standard</u> developed by CableLabs
and contributing companies.
Cable Television Laboratories, also called CableLabs, is a non-
profit research and development consortium.
DOCSISI.O was ratified as ITU-T J. 112 and ITU-T J.222 for
DOCSIS 3.0.

- 케이블 네트워크에서 인터넷을 쓰기 위한 국제 표준이다.
- <u>DOCSIS defines all the protocols necessary to transport data from a CMTS to a CM.</u>
- 최근 표준은 4.0이고, 속도는 $10Gbps$ (downstream), $6Gbps$ (upstream)

## SONET

The ANSI standard is called the **Synchronous Optical
Network (SONET)**.
The ITU-T standard is called the **Synchronous Digital
Hierarchy (SDH)**.
SONET/SDH is a **synchronous network**.
A single clock is used to handle the timing of transmissions.
Network-wide synchronization adds a level of predictability to
the system.

- 대부분 SONET/SDH 이렇게 병행 표기 돼 있다.
- 동기식 네트워크 synchronous network이다.
- 전화 네트워크 동기식이 아니다.
- 전송을 빨리 하기 위해서 동기식 네트워크가 개발됐다.
- 네트워크에서 노드들이 갖고 있는 시각이 모두 동일하다.
- SONET은 미국(북미) 표준이고, SDH는 국제표준이다.
- 근데 서로 호환이 되긴한다.

## Architecture (signals, devices, and connections)

- SONET defines a hierarchy of electrical signaling levels called
  synchronous transport signals (STSs).
  STS is the basic unit of framing in SONET.
- The corresponding optical signals are called optical carriers
  (OCs).
  OC levels describe the conceptual and physical
  specifications of the links required to support each level of
  signaling.
- SDH specifies a similar system called a synchronous transport
  module (STM).

- STS는 속도를 내려고 할 때 소넷에서, msg frame을 만든다. frame의 구조를 STS라고 한다. (frame format)
- 이거(STS)를 광신호로 어떻게 보낼 것인가 하는 것을 OC(optical carrier)라고 한다.
- STM은 SDH에서 사용하는 것.
- STS, OC는 SONET에서 사용하는 것.
  ![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699267465/image_qqdljv.png)
- STS-1, OC-1의 기본 속도 하나만 기억하면 된다.
- 혜화성대와 수원성대가 연결된 네트워크가 2.5Gbps가 하면 STM-16이라고 생각하면 된다.

## ATM

- **Asynchronous Transfer Mode (ATM)** is the cell relay protocol
  designed by the ATM Forum and adopted by the ITU-T.
- Design Goals
  Foremost is the need for a transmission system to optimize the
  use of high-data-rate transmission media, in particular optical
  fiber.
  The system must interface with existing systems and provide
  wide area interconnectivity.
  The design must be implemented inexpensively.
  The new system must be able to work with and support the
  existing telecommunications hierarchies.
  The new system must be connection-oriented to ensure accurate
  and predictable delivery.
  It is to move as many of the functions to hardware as possible (for
  speed).
- ATM은 거의 사용하지 않는다.
- cell relay protocol이다.
- ATM이 나오기 전의 WAN 네트워크는 대부분 구리선으로 연결돼 있었다.
- 그러다가 광네트워크가 발전을 하게 되고, SONET과 SDH와 같은 것들이 나오게 됐다.
- 광통신을 이용한 네트워크이 구성이 됐는데, 그 위에 올라가 있는 protocol들은 구리선 위에서 썼던 것들을 사용했다.
- 광전송에 적합한 protocol을 만들어 보자.
- 광케이블은 구리선에 비해 에러가 거의 나지 않는다는 것이다.
- 그에 비해 구리선은 에러 복구하는 것에 프로토콜들이 동작을 했다.
- 그래서 이에 적합한 프로토콜을 만들어보자해서 나온 것이다.
- 기존의 프로토콜과의 호환성도 유지하며...

## Problems

- As networks become more complex, the information that must
  be carried in the header becomes more extensive.
- Large header has inefficiency.
  To improve utilization, some protocols provide variable frame
  sizes to users.
- Mixed network traffic
  The variety of frame sizes makes traffic unpredictable.
  ![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699268024/image_syoyyq.png)
- 프로토콜에 이것 저것을 넣다 보니, header가 커졌다.
- 데이터를 전송하는 데에 있어 overhead로 작용한다.
- 데이터가 상대적으로 작아기게 됐다.
- 트래픽이 믹스되면 문제가 더 커졌다. (트래픽이 큰 것이 들어오면, 그것을 처리하느라 빨리 처리할 수 있는 작은 트래픽이 너무 나중에 처리되는 문제가 생겼다.)

## Cell Networks

- A cell is a small data unit of fixed size.
- A cell network can handle real-time transmissions.
  ![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699268144/image_jpcggb.png)
- 그럼 그렇게 하지말고 fixed size로 자잘하게 자르자.
- ethernet frame은 가변이다.

## Cells

- 이에 반해 ATM은 fixed size로 하겠다.
- A cell is only 53 bytes long with 5 bytes allocated to header
  and 48 bytes carrying payload.
- 헤더는 5B, Payload는 48B이다. (무조건 53B 작아도 더미데이터를 넣어서라도 53B)
- 그래서 ATM cell relay network이다.
- 그런데 아무도 안 쓴다. (TCP/IP 천하)
  ![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699268288/image_aex5rj.png)

## ATM Layers

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699268473/image_olglvl.png)

- physical layer는 SONET과 SDH를 사용한다.
- ATM layer에서는 53B cell로 만든다.
- AAL layer는 올라가는 application의 종류에 따라 어떤 종류의 AAL을 쓰는지 정해주는 adaption을 해준다.
- 위 3개가 우리가 기억해야 할 것. (근데 지금 안 쓴다.)

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699268596/image_oq7zdr.png)
