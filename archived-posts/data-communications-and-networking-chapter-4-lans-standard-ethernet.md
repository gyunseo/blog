---
title: Data Communications and Networking Chapter 4 LANs Standard Ethernet
pubDatetime: 2023-10-02T01:18:00+09:00
featured: false
draft: false
tags:
  - Computer-Science
  - Computer-Network
  - Ethernet
  - LAN
  - Standard-Ethernet
description: Standard Ethernet 공부한 거 정리
---

## Table of contents

## Standard Ethernet (IEEE 802.3 Working Group, CSMA/CD Ethernet)

10Mbps의 데이터 속도를 가진 원래의 이더넷 기술을 Standard Ethernet이라고 부른다.
대부분의 implementation은 Ethernet 발전 과정에서 다른 기술로 이동했지만 발전 과정에서 변경되지 않은 Standard Ethernet의 일부 기능이 있다.
다른 세 가지 기술을 이해할 수 있는 길을 마련하기 위해 이 Standard Ethernet에 대해 논의한다.

## Ethernet Frame

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-part2-1696177248832.jpeg)

## Physical-layer Header

- Preamble (7B): 1과 0이 교대하는 56bits
- SFD (1B): Start Frame Delimeter, flag (10101011)

이 헤더의 두 필드는 왜 있냐? Physical Layer에서 처리한다.

Preamble의 역할은 receiving system에 coming frame을 alert하는 것이다. 그리고 receiving system이 동기화돼 있지 않으면, clock을 동기화할 수 있도록 한다.

SFD는 프레임의 시작을 알린다.

간단히 정리하자면, Destination Address가 날라가는 걸 방지하기 위해 앞에 8B를 넣어 놨다.

## 앞 2개 field를 뺀 진짜 Ethernet Frame

- Destination Address (6B): 목적지 주소
- Source Address (6B): 송신지 주소
- Length / Type (2B): 어떤 경우에는 Type으로 해석되고, 또 다른 어떤 경우에는 Length로 해석된다.
  - field의 value가 1518보다 작으면, length field로 해석되고, data field의 length를 정의한다.
  - field의 vlaue가 1536보다 크면, MAC frame을 사용하는 upper-layer protocol을 정의한다. (랜카드 위에 바로 application이 올라가는 게 아니라, network layer가 있는데, network layer protocol의 종류가 엄청 많다. 그래서 그걸 구분하는 용도이다. 그럼 length는? 상위 계층에서 알아서 처리한다.)
- Data and Padding (46B ~ 1500B): 최소 Byte보다 적은 게 들어 가면 Padding으로 가짜 Byte들이 들어간다.
- CRC (Cyclic Redundancy Check) (4B): error detection information, **CRC-32**

## Frame Length

Minimum Frame Length: 46B + 18B = 64B
Maximum Frame Length: 1500B + 18B = 1518B

Minimum length restriction이 있는 이유는 올바른 CSMA/CD 동작을 보장하기 위해서이다.

Maximum은 왜 있냐? 만약 1GB가 frame length라고 하면, 1GB를 보내는 동안 다른 station은 보내지를 못한다.
그래서 shared media를 monopolizing을 막기위해서 Maximum Frame Length가 있다.
그리고 랜카드의 메모리 Buffer Size도 줄여야 한다.

## Addressing

각 station은 Ethernet Network에서 자신들만의 Network Interface Card (NIC)를 갖는다.
우리는 NIC 주소를 MAC Address, Ethernet Address, Hardware Address라고 부른다.

`4A:30:10:21:10:1A` 와 같이 6B로 나타낸다.

앞의 3B는 Vendor Address (제조사)

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-part2-1696220119713.jpeg)
전송은 left-to-right byte-to-byte. 하지만 각 byte에서는 LSB가 먼저 보내지고, MSB가 가장 나중에 보내진다.

Unicast Address: only one recipient를 정의한다. (source address는 항상 Unicast Address이다.)
Multicast Address: a group of addresses를 정의한다.
Broadcast Address: recipients가 netwrok에 있는 모든 stations라는 걸 의미한다.

Broadcast Address는 Hexadecimal로 `FF-FF-FF-FF-FF-FF`이다.

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-part2-1696223467557.jpeg)
상기 그림을 기반으로 다음과 결론을 도출할 수 있다.
Source Address의 Byte 1의 LSB는 항상 0이고, Destination Address의 Byte 1 LSB는 Unicast Address일 경우에는 0이고, Multicast이거나 Broadcast Address일 경우에는 1이다.

## Distinguish Between Unicast, Multicast, and Broadcast Transmission

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-part2-1696223903316.jpeg)
상기 그림을 통해 어떻게 Unicast, Multicast, 그리고 Broadcast transmission들이 서로 구분되는지 알아 보자.

Standard Ethernet은 기본적으로 coaxial cable (동축 케이블) 을 이용한 bus topology나 twisted pair cable (UTP or STP)과 hub를 이용한 star topology를 사용한다.

전송 의도가 unicast, multicast, broadcast이든 간에, standard Ethernet에서의 transmission은 항상 broadcast이다.

bus topology에서는 station A가 station B에게 frame 하나를 전송하면, 모든 station들이 수신한다.
star topology에서는 station A가 station B에게 frame 하나를 전송하면, hub가 수신한다.
그리고, 허브가 A를 제외한 모든 station에게 전송해 준다.

- unicast는 받아야 될 recipient만 frame을 받고 나머지 station은 frame을 discard한다.
- multicast도 똑같다.
- broadcast는 sender를 제외한 station이 모두 수신한다.

## Access Method

Standard Ethernet은 1-persistent CSMA/CD를 Media Access Method로 사용한다.
Ehternet에서 slot time은 bits로 정의된다.
slot time은 한 station이 **512 bits**를 보내는 데에 요구되는 시간이다. (Chapter 3의 CSMA/CD에서 왜 **512bits**를 보내는지 그 이유를 다뤘었다. $Minimum\;T_{fr}=2 \times T_p$이기 때문이다. 나중에 해당 블로그 글 링크로 걸기)
그렇다면, 10Mbps의 Standard Ethernet에서는 Time Interval이 51.2$\mu s$가 걸린다. (중학교 때 배운 거속시로 계산해 보면 금방 나온다.)
하기 그림을 보며 이해해 보자.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-part2-1696230966046.jpeg)

## 첫 번째 bit의 모험...

그렇다면 collision은 언제 일어날까?
최악의 경우를 생각해 보자.
station A가 있고, frame을 보내려는 destination station B가 있다고 하자.
두 station은 shared media에서 가장 양 끝단에 존재한다고 하자.
network는 10Mbps의 data rate를 가지고, Slot time이 512bits이고, Time interval (transmission delay)이 $51.2\mu s$인 상황을 가정해 보자.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-part2-1696235756573.jpeg)
위 그림과 같은 상황이 발생하게 된다.
그러니깐, collision은 slot time의 first half 동안에만 일어날 수 있게 된다.
이유는 위의 최악의 상황을 가정한 위의 그림을 보며 생각해 보자. (1bit가 B에 도달하기 직전에 B가 carrier sense를 하여, 자기도 512bits 중 1bit를 보내기 시작하고, 그래서 결국 Maximum $T_p$ 에 수렴한 시간 즉, half of slot time인 25.6$\mu s$에 collision이 발생하게 되는 것이다. 근데 왜 half of slot time과 Maximum $T_p$가 같을까? 왜냐면 slot time을 $2 \times Maximum\;T_p$로 구했기 때문이다..)
그리고 만약 first half of slot time에 collision이 일어난다면, 이 collision은 sender가 slot time (first 512 bits times) 동안 sense할 수 있다.
만약 이 시간 이후에 collision이 일어나서, collision이 다시 A로 돌아와서 (최악의 경우 25.6$\mu s$ 동안 다시 A로 돌아가겠죠?), collision detection이 돼, collision error가 first 512 bits times 이후에 발생했다고 하면, late collision이 일어났다고 한다. (주로 케이블 길이를 너무 길게 설정했을 때 주로 일어난다.)

## Cable Length 계산

$$MaxLength=Propagation\,Speed \times SlotTime/2$$
$$MaxLength=(2*10^8)*({51.2}*10^{-6}/2) = 5120m$$
위 수식에 따라 Propagation Speed (빛의 속도) 를 20만 km/s로 잡고, 충돌이 SlotTime의 절반 시간 안에 일어나니 계산 결과가 5120m가 나온다. (이론적으로)
그런데, repeater와 interface들에서 발생하는 딜레이와 jam sequence를 보내는 데에 들어가는 시간을 고려하여, Standard Ethernet에서는
**MaxLength = 2500m**이다.

## Implementation

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-part2-1696250622335.jpeg)
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-part2-1696250662099.jpeg)

- 10Base5: data rate가 10Mbps, Baseband (digital) signal 사용, 500m thick coaxial케이블 사용 (500m니깐 5개 연결 가능)
- 10Base2: data rate가 10Mbps, Baseband (digital) signal 사용, 200m에 준하는 185m thin coaxial 케이블 사용
- 10Base-T: data rate가 10Mbps, Baseband (digital) signal 사용, 100m UTP 케이블 사용
- 10Base-F: data rate가 10Mbps, Baseband (digital) signal 사용, 2000m fiber-optic 케이블 (광케이블) 사용

## Encoding and Decoding

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-part2-1696250805426.jpeg)

## 10Base5: Thick Ethernet

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-part2-1696251379388.jpeg)

- Transceiver: a transmitter and a receiver

주의 깊게 살펴봐야할 것은 transceiver이다. transceiver는 transmitting, receiving 그리고 collision dectection을 책임진다.
Thick coaxial에 **tap**을 통해 연결된다.
Station에는 **Transceiver cable**을 통해 연결된다. (maximum 50m)
500m라는 제한을 둔 것은 신호가 감쇠되기 때문이다.
멀리 갈수록 신호가 줄어든다.
그만큼 감쇠되는 걸 막으려면 power를 많이 써야 하기 때문에, 그러면 전력소모가 너무 심해서 500m로 끊은 것이다.

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-part2-1696252202825.jpeg)

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-part2-1696252356082.jpeg)

(~~교수님이 그냥 별로 안 중요하게 설명하고 넘어간 정보들. 근데 시험에는 나올지도 모름 ㅋㅋ~~)

컴퓨터 간 간격은 2.5m.
한 프레임이 보내지고, 다음 한 프레임을 보내기까지, transmitter는 최소 96bits의 idle line state를 전송해야 한다.
10Mbps에서 interpacket(interframe) gap은 $9.6\mu s$이다.
Collision Detection Time은 한 segment length에서의 propagation delay의 최소 2배여야 한다.

## 10Base2: Thin Ethernet

**Cheapernet**이라고도 불린다.
transceiver가 NIC의 일부이다. 즉, station 안에 있다는 말이다.
동축 케이블을 사용한다.
T connector를 사용해, 케이블과 케이블을 연결해 나가는 구조이다. (지금은 잘 안 씀.)

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-part2-1696254045937.jpeg)

## 10Base-T: Twisted-Pair Ethernet

physical star topology를 이용한다. (Hub를 사용해서)

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-part2-1696257278724.jpeg)

## 10Base-F: Fiber Ethernet

10Base-T에서 cable을 광케이블을 사용하면 10Base-F이다.

## IEEE 802.3 Working Group

Broadband는 Analog
Baseband는 Digital (Manchester Encoding 사용)
~~1Base5는 뭐지?~~
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-part2-1696257478333.jpeg)

## Changes in the Standard

- Bridged Ethernet
  - **bridge**들에 의한 LAN의 division
- Switched Ethernet
  - bandwidth가 station과 **switch** 사이에서 공유됨. (각 5Mbps)
- Full-Duplex Ethernet
  - CSMA/CD가 필요없음.

## Bridged Ethernet

bridge들에 의해 나눠진 LAN의 division이다.
bridge는 bandwidth를 raise하고 collision domain을 분리한다.

## Raising Bandwidth

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-standard-ethernet-1696258472204.jpeg)
unbridged된 하나의 네트워크가 있다고 생각해 보자.
CSMA/CD 방식을 이용하기 때문에, 어떤 하나의 station이 frame을 보내고 있으면, 또 다른 하나의 station은 frame을 못 보낸다.
즉, total capacity (10Mbps) 가 두 station 사이서 공유된다는 것이다.
한 station이 보내고, 또 다른 한 station이 보내고 교대한다.
결국 평균적으로 각 station은 5Mbps의 rate로 data를 보내게 된다.
상기 그림이 그 예시를 보여준다.

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-standard-ethernet-1696258804889.jpeg)
상기 그림 같이 12개의 station을 6개로 나눴다고 해 보자.
bridge로 나뉜 각 network는 bandwidthwise적으로 독립적이다. (각 segment마다 bandwidth가 독립적이라는 말 같다.)
나뉜 각 네트워크는 10Mbps의 capacity를 갖게된다.
각 segment는 이제 6개의 station 사이서 capacity를 공유한다. (사실은 bridge가 station처럼 행동하기 때문에 7개이다.)
그렇게 되면 10/12 Mbps가 아닌, 10/7 Mbps의 rate로 평균적으로 각 segment의 station이 data를 보낼 수 있기 때문에, bandwidth가 raise된 것이다.

## Separating Collision Domains

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-standard-ethernet-1696260310961.jpeg)

상기 그림을 보자.
bridge로 collision domain의 separation이 없을 때는 12개의 station이 모두 medium을 access하기 위해 contend한다.
그러나, bridging을 통해 오직 3개의 station들이 medium을 access하기 위해 contend (경쟁)한다.

(교수님의 첨언)
repeater는 그냥 신호를 더 멀리 갈 수 있게 만들어 주는 것이다.
그런데, bridge에게는 주소가 있다. (송신자 주소, 목적지 주소 MAC 어드레스가 있다.)
처음에는 다른 segment로도 뿌려진다. 그런데 같은 segment에 있는 게 학습이 되면, 그 다음부터 같은 segment에 있는 것이라 bridge에서 filtering해서 다른 segment로 보내지 않는다. 그래서 다른 segment에서 carrier sense를 해서 collision domain을 separation하고, bandwidth를 독립적으로 사용할 수 있는 것이다.

## Switched Ethernet

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-standard-ethernet-1696260647694.jpeg)
<u>dumb hub</u>는 network hardware의 가장 basic이다.
네트워크에서 한 노드로부터 정보를 받으면, 그 정보를 같은 네트워크에 있는 다른 모든 노드에게 다 보내 준다.
상기 그림을 보며 이해해 보자.
A->E로 보낼 때, 동시에 B->C로 보낼 수 있게 할 수 없을까?
그렇게 할 수 있는 통신 software를 넣어 보자 -> 그게 switch

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-standard-ethernet-1696260840461.jpeg)

N개의 station이 있는 네트워크에서, N개의 네트워크를 갖는 건 어떨까? 라는 의문에서 Switched Ethernet은 시작한다.
bridged ethernet에서 각 segment가 bridge를 station을 포함해서 bandwidth를 공유한 거 처럼 switch 또한 각 domain에서 10Mbps를 switch와 station이 공유하여, 각 5Mbps의 대역폭을 갖는다.
layer-2 switch(L2 Switch)는 packet을 더 빠르게 핸들링하게 해주는 정교한 방법이 있는 N-port bridge이다.

그렇다면 그 정교한 방법이란?
(교수님의 첨언)
bridge처럼 알고리즘을 이용해 address를 학습한다.
처음에는 목적지를 모르니, 모든 station에 다 보내 준다.
1번 포트에서 트래픽이 들어 오면, 기록을 해 놓는다.
1번 포트에는 ethernet address 무엇이 있다.
처음에는 목적지를 모르니, 딴 포트들로 다 보내 준다.
그러면 특정 포트에서 응답이 온다. 예를 들어 4번 포트에는 뭐가 있다. 이것도 기록을 한다.
기록이 다 되면, 특정 포트에서 들어 오는 패킷을 딴 특정 포트로 보내준다.

## Full-Duplex Ethernet

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/data-communications-and-networking-chapter-4-lans-standard-ethernet-1696261627798.jpeg)

(10Base5와 10Base2는 half-duplex이고, 10Base-T는 항상 full-duplex이다.)

L2 Switch를 계속 발전 시켜 보니, UTP 케이블은 8개 가닥이 있다. (가닥이 2개가 있어야 전기신호를 보낼 수 있음.) 심지어 4쌍이나 있음. 그러면 보내면서 받자.
CSMA/CD가 필요없다. 보내는 거 10Mbps, 받는 거 10Mbps (increasing bandwidth)

(Full-Duplex Ethernet은 다시 정리하기)
