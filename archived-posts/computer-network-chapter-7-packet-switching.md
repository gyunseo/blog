---
title: Packet Switching
pubDatetime: 2023-10-24T13:33:00+09:00
featured: false
draft: false
tags:
  - Computer-Network
  - Packet-Switching
description: packet switching
---

## Table of contents

## Packet Switching

## Datagram approach: Connectionless ...

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/packet-switching-1698122175849.jpeg)

- DA가 없으면 그냥 버린다. (routing table에 없으면)
- L2 스위치는 local area network일 뿐이다.

## Virtual-circuit approach: Connection-oriented service

- before all datagrams in a message na be sent, a virtual connection shoudl be set up to define the path for the datagrams.
  - after connection setup, the datgrams can all follow the same path.
- not only must the packet...

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/packet-switching-1698122375237.jpeg)
이거는 packet이 순서대로 갈 수밖에 없다.  
연결 설정하고, 연결 설정된 경로로 packet들이 간다.  
이 논리적인 길을 Virtual Circuit이라고 한다.  
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/packet-switching-1698122451416.jpeg)
L1 레이블이 붙어있다.  
1 - L1이면 2 - L2로 간다.
레이블을 붙여서 보낸다.

setup, data transfer, and disconnect(teardown) - 3단계
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/packet-switching-1698122693757.jpeg)
setup하는 packet이 간다. (연결 설정하는 packet)
packet 앞 부분에 14번을 붙여서 보낸다.  
R1이 받으면, label 14번이 들어왔다.  
현재 상황에서 가장 빠른 길을 찾는다. (3번 포트로 보내는 게 가장 빠르다.)
3번 포트로 보낸다.  
비어있는 있는 레이블인 66번 레이블을 붙여서 보낸다.  
R3에서도 고민을 한다. (현재 상태에서는 R4로 보내는 게 빠르다.)  
그러면 또 22번 레이블을 붙여서 보낸다.  
여기서 또 어디로 보내면 가장 빠를지 고민한다.  
4번 포트로 보낸다.
연결 설정하는 packet이 테이블을 완성해 나가면서 B로 간다.

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/packet-switching-1698122908816.jpeg)

- 그러면 B에서 다시 ackknowledgment packet을 보낸다.
- 이제 테이블을 고정시킨다.
- 이제 data packet이 떠난다.

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/packet-switching-1698122961304.jpeg)

- 이제 고정된 경로로 packet이 간다.
- 모든 network protocol은 connectionless이거나 connection-oriented이다. (IP이든 X.25이든 뭐든)

## Performance

- delay, throughput, and packet ....

### delay

- transmission delay
- propagation delay (상수)
- processing delay ($Delay_{pr}$ = Time required to process a packet in a system, 라우터도 컴퓨터다.)
- queuing delay (큐에 들어가서 기다리는 시간)
- total delay

### throughput

- 단위 시간 당 처리량

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/packet-switching-1698123325541.jpeg)![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/packet-switching-1698123367188.jpeg)
고속 장치로 backbone을 구성.

### Packet Loss

- 큐에 packet을 넣어 놨다. 예를 들어 100까지 저장해 놨는데, 101개가 새로 들어오면 잃어 버린다.
-
