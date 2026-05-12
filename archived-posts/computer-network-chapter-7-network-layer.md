---
title: Network Layer
pubDatetime: 2023-10-19T12:22:00+09:00
featured: false
draft: false
tags:
  - Computer-Network
  - Computer-Science
  - Network-Layer
description: Network Layer 공부한 거 정리
---

## Table of contents

## 들어가며

- physical and data link(데이터 링크 레이어는 에러 컨트롤): responsible for data delivery
- to solve the problem of delivery through serveral links, the network layer was designed
- the network layer is responsible for host-to-host delivery and for routing the packets through the routers or swithces

a에서 d를 갈 때 어느 route를 골라야할까? (어디로 가는 게 빠를까? 안전할까?)
routing을 전문적으로 해주는 장치인 router가 중요함.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/network-layer-1697686506932.jpeg)
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/network-layer-1697686274993.jpeg)

## Services

- Packetizing
  - 상위 계층에서 데이터가 내려온다.
  - 데이터를 packet으로 만든다. (앞에 header를 붙인다. encapsulating)
  - 목적지에서 그 packet을 까나가야 한다. (decapsulating)
  - router는 packet decapsulating하지 않는다. (data-link는 계층은 hop-by-hop으로 frame에 일정 부분 뗐다 붙였다 하는데 network layer는 그걸 하지 않는다)
- Routing
  - 가능한 routes 중에 best one을 찾는다. (unicast routing)
  - routing tables이 있다.

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/network-layer-1697686506932.jpeg)

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/network-layer-1697686563197.jpeg)
목적지 A인 것은 output interface 1번으로 보내라.
목적지 B인 것은 output interface 2번으로 보내라.
상기 그림은 routing table이다.
routing protocol이 하는 일은 routing table을 만드는 일을 한다. (routing table는 packet을 forward를 한다, 어느 인터페이스로 보낼지를)

chrome에 www.naver.com -> ip address로 변환 -> pc에 있는 routing table이 있어서, 그것을 참조함. -> 패킷으로 만들어서 보냄 -> 최종 목적지에서는 header를 보고, ip 어드레스를 확인한다. 본인의 패킷이면 받고, 아니면 버린다.

패킷이 너무 크면, fragmentation을 하여 보낸다.
수신 측에서는 잘라진 것들을 reassembling을 한다.

the network layer at the switch or router is **responsible for routing the packet**

ip packet은 ethernet frame 입장에서는 data이다.

- Error control
  - checksum may prevent any changes or corruptions in the header of the datagram.
  - the internet uses an auxiliary protocol, **ICMP**, that provides some kind of error control
- Flow control

  - it regulates the amount of data a source can send without overwhelming the receiver

- Contestion control (혼잡 제어)
  - a1,a2,a3,a4가 네트워크에 들어오면 혼잡해진다.
  - datagrams are dropped, the situation may become worse because, 재전송을 계쏙하게 돼서.
    ![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/network-layer-1697687226265.jpeg)
- **Quality of Service**

  - <u>the ability to provied different priority to different applications, users, or data flows, or to guarantee a certain level of performance to a data flow. </u> (dataflow마다 우선순위를 다르게 하는 것)
  - Ethernet이 QoS가 있는가? 가능한가? 없다. (Qos 기능이 없다.)

- Security
  - to provide security for a connectionless network layer, we need to have another virtual level that changes the connectionless service **to a connection-oriented service.**

## Packet Switching

- router: a switch that creates a connection between an input port and an output port
- switching: circuit switching, **packet switching (virtual circuit approach(가상 회선), datagram approach)** (network layer는 주로 packet에 대해 다룬다.)

## Datagram approach: connectionless service

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/network-layer-1697687787184.jpeg)

- datagram-> 아 connectionless구나
- network layer protocol **treats each packet independently**, with each packet **having no relationship to any other packet.**
- the packet in a message **may or may not travel the same path to their destination.**
- 그냥 편지 보내는 거랑 비유, 겉에 주소 쓰고, 우체국 가서 보낸다. (연결 설정을 해서, 상대방이 받아야 보내는 것은 connection oriented 예를 들어 전화걸 때 받는 거)
- 1GB 파일을 업로드 한다. 1500B로 fragmention돼서 1,2,3,4로 나간다. (각자를 차라고 생각하면, 각자의 길을 선택해서 간다. 목적지에는 패킷이 순서대로 도착하지 않을 수 있다. 상기 그림에서는 1,3,4,2순)
- 이메일을 도착한 순서대로 도착한다. 그렇다면 어디선가 이 순서를 맞춘다. (transport layer에서 순서대로 맞춘다.) -> 그렇다면 network layer는 이 방식을 선택했을까? 항상 network를 효율적으로 쓸 수 있어서, 매 패킷마다 가장 빠른 길로 갈 수 있음을 보장한다.
- it doest not need call setup
- the router routes the packet basd only on the destnation address.
  - the reason: the internet is made of so many heterogeneous networks.

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/network-layer-1697688294327.jpeg)
