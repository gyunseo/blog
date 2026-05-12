---
title: Chapter 4 Bluetooth
pubDatetime: 2023-10-05T11:59:00+09:00
featured: false
draft: false
tags:
  - Computer-Science
  - Computer-Network
  - LAN
  - Wireless-LAN
  - Bluetooth
description: Bluetooth 공부한 거 정리
---

## Table of contents

## Bluetooth

- 전화, 노트북, 컴퓨터, 카메라, 프린터, 커피 제조기 등과 같은 다양한 기능의 기기들을 연결하기 위해 고안된 무선랜 기술.
- <u>A Bluetooth LAN은 ad hoc network(AP가 따로 존재하지 않는다.)이다.</u>
  - 네트워크는 자발적(spontaneously)으로 형성된다.
  - 때때로 gadget이라고 불리는 장치들은 서로를 찾아서 **piconet**라고 불리는 네트워크를 만든다.
- **IEEE 802.15** 표준은 무선 **개인 영역 네트워크(PAN)** 를 정의한다.

## Architecture

- Bluetooth는 **piconet**와 **scatternet**의 두 가지 네트워크 유형을 정의한다.
- 블루투스 장치에는 근거리 무선 송신기가 내장되어 있다.
- 버전 **5.2**의 현재 date rate는 $2.4GHz$ 대역폭을 가진 $2Mbps$이다.
  - 이는 IEEE 802.11be 무선랜과 블루투스 랜 사이에 간섭이 발생할 가능성이 있음을 의미한다.(그래서 frequency hopping이라s는, 무선 주파수를 뛰어 넘는 방법을 사용한다.)

| Bluetooth version     | Maximum range | Date rates | Message capacity | Throughput | Power consumption |
| --------------------- | ------------- | ---------- | ---------------- | ---------- | ----------------- |
| **Bluetooth Classic** | 10m           | 1mbps      | 31bytes          | 700kbps    | Very high         |
| **Bluetooth v4.x**    | 30m           | 1mbps      | 31bytes          | 300kbps    | high              |
| **Bluetooth v5.0**    | 200m          | 2mbps      | 255bytes         | 1400kbps   | low               |
| **Bluetooth v5.2**    | 200m          | 2mbps      | 255bytes         | 1400kbps   | very low          |

- 5.x 버전에서는 거리가 200m까지 가능하다. 그래서 거리를 짧게 쓰면 속도를 높일 수 있다. ($50mbps$까지)
- 거리를 멀리하면 속도가 느려지고...

## Piconets

- piconet은 최대 8개의 station을 가질 수 있으며, 그 중 하나는 **primary(master)** 라고 불리고, 나머지는 **secondary(slaves)** 라고 불린다.(하나는 primary, 나머지 7개는 secondary) (추가적으로 8대를 더 붙일 수 있다. 그렇게 하더라도, active한 station은 8개만 가능하다. 결국 동시에 가능한 거는 8개이다.)
- 모든 secondary station들은 그들의 clock과 hopping sequence를 primary와 동기화한다.
- piconet은 오직 하나의 primary station을 가질 수 있다.
- primary와 secondary 사이의 통신은 1대1 또는 1대多가 될 수 있다.
- piconet은 최대 7개의 secondary station을 가질 수 있지만, **추가로 8개의 secondary station이 parked state에 있을 수 있다.**
- parked state의 secondary station은 parked state로부터 이동될 때까지 통신에 참여할 수 없다.
- **piconet에서 8개의 station만이 활성화될 수 있다.**
  ![piconet](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699084869/image_po3pgh.png)

## Scatternet

- <u>piconet은 scatternet이라고 불리는 것을 형성하기 위해 결합될 수 있다.</u>
- 하나의 piconet 내의 secondary station은 다른 piconet 내의 primary station이 될 수 있다.
- 이 스테이션은(slave로서) 첫 번째 piconet의 primary station으로부터 메시지를 수신할 수 있고, primary station으로서 동작하여 두 번째 piconet의secondary들에게 전달할 수 있다.
  ![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699086717/image_ym9fit.png)
- 상기 그림처럼 오른쪽 Piconet에 있는 Secondary가 동그라민 친 station을 타고 왼쪽 Primary와 통신을 한다.(대신 많이 느리다.)

## Bluetooth Layers

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699087517/image_hgbmyw.png)

- Radio layer: 무선으로 쏘는 부분
- Baseband layer: radio layer 바로 위에 있는 layer. 데이터를 어떻게 보낼 것인가.

## Radio Layer

- Bluetooth device는 <u>저전력(low-power)이며 범위는 10m이다.</u>
  - 범위는 power-class-dependant이지만, 실제로는 $1m$에서 $100m$까지 다양하다.
- Bluetooth는 $2.4-GHz$ ISM band를 각각 $1MHz$의 79개 채널로 분할하여 사용한다. (FHSS를 사용하며, 주파수를 뛰어다니기 위해, 79개의 채널로 분할한다.)
- Bluetooth는 다른 디바이스 또는 다른 네트워크로부터의 간섭을 피하기 위해, physical layer에서 **frequency-hopping spread spectrum (FHSS)** 방법을 사용한다.
- Bluetooth는 1초에 1600번 도약한다(hop).
- bit를 signal로 변환하기 위해 bluetooth는 **GFSK(FSK with Gaussian bandwidth filtering)** 라는 정교한 버전의 FSK를 사용한다.

## Baseband Layer

- Radio layer 바로 위에 있는 layer.
- 데이터를 어떻게 보낼 것인가에 관심이 있는 layer.
- access method는 TDMA이다.
- <u>primary station과 secondary station는 time slot을 이용하여 서로 통신한다.</u>
  - time slot의 길이는 dwell time $625\mu s$와 정확히 같다.
  - <u>secondary station들은 서로 직접 소통할 수 없습니다.</u>
- 블루투스는 **TDD-TDMA(time-division duplex TDMA)** 라고 불리는 TDMA의 형태를 사용한다.
- secondary station과 수신기가 데이터를 주고 받지만, 동시에 데이터를 받지 못하는 <u>half-duplex communication</u>의 일종이다.
- 그렇다면 **TDD-TDMA(time-division duplex TDMA)** 가 어떻게 동작하느냐? 하기 내용에서 계속.

## Single-secondary Communication

- primary station은 짝수 슬롯을 사용하고, secondary station은 홀수 슬롯을 사용한다.
  ![Single-secondary communication](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699094221/image_kgax0k.png)
- 스마트폰이 Primary, 블루투스 헤드폰이 Secondary라고 생각하면 된다.
- 동시에 주고 받는 것은 안된다. 한 번 주고, 한 번 받아야 한다. (<u>half-duplex communication</u>)
- $625ms$단위로 time slot을 나누어 놓았다.
- 데이터를 실제로 보내는 것은 $366ms$이다.
- 그러면서 동시에 주파수가 달라진다.($f0$~$f78$까지 있다.) (1초에 1600번을 hop한다.)

## Multiple-secondary Communication

- 이 방법은 reservation 있는 poll/select 작업과 유사하다.
- <u>primary station은 secondary station을 선택할 때도 poll한다.</u>
  - polled된 station은 프레임을 전송하기 위해 다음 time slot이 예약된다.
- polled된 secondary station이 전송할 프레임이 없는 경우, 채널은 silent 상태가 된다.
  ![Multiple-secondary Communication](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699119249/image_slrtry.png)
- Primary는 스마트폰, Secondary 1은 블루투스 헤드폰, Secondary 2는 블루투스 키보드라고 생각하면 쉽다.
- 한 번씩 Primary가 Secondary 1에게 데이터를 보내고, 다시 Secondary 1이 다시 Primary에게 데이터를 보내고, 그 다음 Primary가 Secondary 2에게 데이터를 보내고, 다시 Secondary 2가 Primary에게 데이터를 보낸다.
- 그러니 당연히 장치를 많이 붙이면, 순번이 늦게 오게 되고, 결국 속도가 느려진다. 한 번씩 돌아가면서 기회를 줄 수밖에 없으니, 느릴 수밖에 없다.

## Physical Links

- primary station과 secondary station 사이에는 SCO link와 ACL link라는 두 가지 유형의 링크를 만들 수 있다.
- **Synchronous Connection-Oriented(SCO) link**
  - <u>지연 방지(데이터 전달 지연)</u>가 무결성(무오류 전달)보다 더 중요할 때 사용된다.
  - <u>패킷이 손상되면 재전송되지 않는다.</u>
  - SCO는 지연을 피하는 것이 가장 중요한 실시간 오디오에 사용된다.
  - 음악의 경우 데이터가 조금 깨져도 상관없고, 끊임 없이 듣는 것이 중요하기 때문에, SCO link로 통신한다.
- **Asynchronous Connection-Less(ACL) Link**
  - 지연 시간을 피하는 것보다 <u>데이터 무결성이 더 중요할 때</u> 사용된다.
  - 키보드의 경우 데이터 무결성이 중요하기 때문에 (타이핑한 대로 입력이 안된다면...), 조금 늦게 가도 에러가 안 나는 것이 중요하다. 그래서 ACL link로 통신한다.

## Frame Format

- 강의 내용 상으로는 참고만 하라고 했다.
- A frame in the baseband layer can be one of three types: one-slot, three-slot, or flve-slot.
  ![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699120017/image_aclxlb.png)

## L2CAP

- **The Logical Link Control and Adaptation Protocol**, 또는 **L2CAP**는 LAN에서 LLC sublayer과 거의 동일하다.
- L2CAP은 multiplexing(다중화, 여러 개의 디바이스를 하나로 묶는 것) , segmentation(메시지를 자른다.) 및 reassembly, QOS(Quality of Service), group management 등의 구체적인 임무를 수행한다.
- ACL link에서 데이터 교환을 위해 사용되며, <u>SCO 채널은 L2CAP을 사용하지 않는다</u>. (왜냐면 에러가 나면 복구하고 그래야 되니, integrity가 중요해서 쓴다.)

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699120427/image_snamza.png)
