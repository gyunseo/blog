---
title: Chapter 5 Telephone Networks
pubDatetime: 2023-11-05T03:03:00+09:00
featured: false
draft: false
tags:
  - Computer-Network
  - Computer-Science
  - WAN
  - Telephone-Networks
description: Telephone networks
---

## Table of contents

## Telephone Networks

- telephone networks는 **plain old telephone system (POTS)** 로 불리며, 회선 교환(circuit switching)을 사용한다.
- telephone networks에는 end offices, tandem offices, regional offices와 같은 여러 레벨의 switching offices가 있다.
- **PSTN**은 **Public Switched Telephone Network** 를 의미하며, 이 단어를 **POTS** 보다 더 많이 쓴다. (사무실에서 쓰는 전화기들이 PSTN이다.)

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699121405/image_o1y8l5.png)

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699121990/image_edwamq.png)
초기 telephone network의 모습이다.  
그래서 새로운 전화기를 추가하면, 전화선을 mesh형태로 추가를 해야 했다.  
그러면 토목 공사(땅을 파고, 케이블을 묶고)를 해야 하고, 많은 비용이 들었다.  
그래서 한 가지 생각한 방법은 기계를 만들어, 그 기계에 전화기를 연결하는 것이었다.  
그 기계를 switch(교환기)라고 불렀다.  
![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699122584/image_jgajeh.png)
만약에 한 전화기에 다른 전화기로 전화를 걸고 싶다면, 교환기를 거쳐야 했고, 교환기에 있는 사람이 그 전화를 선으로 연결해 주었다.  
그리고 전화가 종료되면, 그 연결됐던 선을 다시 끊었다.  
그래서 이것을 temporary connection이라고 불렀으며, 기계를 switch라고 하였다.  
그런데 사람이 이 일을 하다 보니 힘들었다.  
그래서 교환기에 software를 집어 넣고, 각 전화기에 번호를 부여했다.  
![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699122721/image_u3chyk.png)
예를 들어, 11번 전화기에서 13번 전화기로 전화를 걸면, 전자 교환기에서 자동으로 전화를 연결해 주었다.  
그런데 전화 수요가 늘게 되면, 하나의 전자 switch로 전화를 감당할 수 없었고, 새로운switch를 두어서 해결했다.  
그러나 계층을 두지 않고, 초기 telephone network의 전화기들 처럼 switch를 둔다면, 그때와 똑같이 mesh형태로 switch를 연결하는 사태가 발생하게 되기 때문에, 아래의 그림처럼 계층을 두었다.  
![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699122869/image_qqjsgi.png)
학교 사무실에 있는 전화선을 쫓아 가면 600주년기념관이 나온다.  
또 그 선에서 선을 따라가면 혜화 전화국이 나온다.  
혜화 전화국에 switch(교환기)가 있다.(end office)  
end office와 전화기 사이 선을 local loop 혹은 subscriber(가입자) line(선로)이라고 한다.
Trunk는 (전화)국간 전송로(전화국-전화국)이다.  
Trunk line은 고속 전송로이다.  
local loop은 그렇지 않다.

- **local loop**는 subscriber telephone을 가장 가까운 end office에 연결하는 twisted-pair 케이블이다. (가입자 선로)
- trunks는 <u>office 사이의 통신을 다루는 전송 매체(transmission media)</u>이다.

## LATAs

- 미국은 200개 이상의 local access transport areas(LATAs)로 나뉘었다.
- Intra-LATA services
  - **common carriers**(telephone companies)가 LATA 내에서 제공하는 서비스를 intra-LATA services라고 한다.
- Inter-LATA services
  - LATA 간의 서비스는 interexchange carriers(IXCs)가 담당한다.
  - 이런 carriers는 long-distance companies라고 불리기도 한다.
- 미국은 땅이 커서, 구역마다 통신 사업자가 다르게 커버한다. (AT&T, Verizon, Sprint 등등 전화 회사만 200개)
- 그 전화 회사를 common carrier라고 부른다. (telephone company)
  ![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699124155/image_lwfwt0.png)

760(국번, 혜화 전화국 교환기의 번호)-0671(학과 사무실 번호)
이론적으로 하나의 국번에는 000~999번까지 가능하다.  
그런데 실제로는 한 교환기가 여러 개의 국번을 갖고, 여러 개의 전화번호를 수용한다.

## Points of Presence (POPs)

- 여러 IXCs는 **Point of Presence**(POP)라고 하는 **switching office**를 통해 inter-LATA service를 제공할 수 있다.
- <u>POP은 communication entity (통신회사)들 사이의 인위적인 분계점(demarcation) 또는 interface point이다.</u>
  - telephone system에서 POP는 long-distance carrier가 서비스를 종료하고 local telephone network에 connection을 제공할 수 있는 장소이다.
  - Internet에서 POP는 인터넷에 대한 액세스 포인트로서, <u>서로 다른 ISP가 mutual peering agreements에 의해 그들의 network 간에 Internet traffic을 교환</u>할 수 있게 하고, 이는 비용 없이 traffic을 교환할 수 있게 한다.
  - ISP: Internet Service Provider (KT, SKT), 인터넷 서비스 제공자
  - common carrier: telephone company

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699188202/image_tta6di.png)

## Signaling

- Signaling means <u>the information exchange concerning the establishment and control of a connection and the management of the network</u>, in contrast to user information transfer.
- 연결을 설정하고, 연결을 제어하는 것에 대한 정보를 주고 받는 것
- 네트워크 관리하는 데에 사용되는 정보를 주고 받는 것
- 유저 인포메이션 transfer가 아니다.
- 760-0672로 전화를 걸었을 때, 그 정보가 교환기로 간다.
- 760-0672로 가야 하려면 어떻게 해야되지? 이 정보를 주고 받는 것은 data가 아니다.
- 전화 수화기를 들었을 때, 여보세요, 안녕하세요가 데이터이다.
- 유저 인포메이션을 보내기 전에 연결을 설정하고, control하는 정보를 주고 받는 것 혹은 call transfer도 포함한다.
- 결국 제어 정보를 주고 받는 것이 signaling이라고 한다.
  - There are **in-band** and **out-of-band signaling**.
- In-band signaling is <u>the exchange of signaling (call control) information within the same channel that the telephone call itself is using</u>.

  - It is a an example of **Dial-tone multi-frequency (DTMF)**.
  - 데이터를 주고 받는 채널로, 제어 정보를 주고 받는 것을 말한다.
  - 전화를 할 때, 다이얼을 누르는 소리가 같이 들린다. 이것이 데이터를 주고 받는 채널로 제어 정보를 주고 받는 것을 의미한다. (하기 그림 참고)
    ![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699188945/image_eiu97w.png)

- These complex tasks resulted in the provision of a separate network for signaling.
- 사용자가 보낼 때는 in-band로 간다.
- 국간 전송을 할 때에는 control information과 data를 가는 것은 channel을 따로 쓴다. (Out-of-band signaling)
- 이때 쓰는 protocol이 **Signaling System #7**
- **Out-of-band signaling** is the exchange of information in order to control a telephone call that is done <u>on a channel that is dedicated</u> for the purpose and separate from the channels used for the telephone call.
  - Out-of-band signaling is used in **Signaling System #7 (SS7 or SSN7)**.
- <u>The tasks of data transfer and signaling are separated in modern telephone networks</u>.
  ![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699192664/image_eqtb8y.png)
- SP, STP, SCP는 외울 필요 X.
  ![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699192730/image_xpoxvs.png)
- 상기 그림도 참고로만 볼 것.

## Services provided by telephone networks

- Analog switched service is the familiar **dial-up service**.
  - With switched line, **dial-up line**, when the caller dials a number, the call is conveyed to a switch at the exchange.
  - The switch connects the two lines for the duration of the call.
- 전화기 수화기를 들면 뚜- 소리가 들린다.
- 760-0672를 누르면 call information이 간다.
- 전화를 걸 때마다 매번 연결되는 길이 달라질 수 있다. (전화 품질이 안 좋은 경우, 끊었다가 다시 걸면 품질이 좋아질 수 있는 이유가 이것때문이다.)
- 그때 그때마다 선이 할당되는 서비스가 **dial-up service**, **dial-up line**

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699193202/image_bzzj3b.png)

- An analog leased service offers customers the opportunity to lease a line, sometimes called a <u>leased(dedicated) line, that is permanently connected to another customer</u>.
- 예를 들어, 남북한 직통 전화.
- 임대해서 사용하는 선 (**leased line**)
- 600주년 기념관과 수원성대까지 선이 연결돼 있다. 그 선은 KT가 깔아 놓은 것을 성대에서 매달 사용료를 내고 쓴다. 이것을 임대회선, **leased line**, 전용회선이라고 부른다.  
  ![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699193333/image_e6z0fj.png)

## Digital Services

- 선에 아날로그 신호를 쏘면 아날로그 신호가 가는 것이고, 디지털 신호를 쏘면 디지털 신호가 간다. 선 자체에는 아무런 의미가 없다. (품질의 차이가 존재할 뿐이다.)
- 아날로그에 쓰이는 선 따로 있고, 디지털 신호에 쓰이는 선이 따로 있는 것이 아니다.
- 그래서 기존에 깔아 놓은 전화선을 이용해 디지털 통신을 하자.
- 그런데 디지털 신호들이 멀리 가지 못했다. 멀리 가도록 특별한 장비를 이용하고자 했다. 그러면서 나온 장비들이 DSU, CSU이다.
- Switched/56 service
  - The digital version ofan analog switched line
  - **Digital Service Unit (DSU)**
- Digital Data Service (DDS)
  - The digital version of analog leased line
- **Leased lines** can be used for telephone, data, or Internet services.
  - A **CSU/DSU (Channel Service Unit/Data(or Digital) Service Unit)** is a digital-interface device used to connect a router to a digital circuit such as a T1 or T3 line.
  - **CSU/DSU**는 디지털 신호를 디지털 신호로 바꿔서 보낸다.(멀리 가도록 할 수 있게 line coding을 한다.)
    ![csu-dsu](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699194053/image_lgoajh.png)

## Dial-up Service

- traditional telephone lines can carry frequencies between <u>$300Hz$ and $3300Hz$</u>, giving them a bandwidth of $3000Hz$.
  - 너무 높은 이상한 소리를 수화기에 갖다 대면, 교환기에서 $300Hz$이하 $3300Hz$이상 주파수를 다 자른다. (수화기에 대고 노래를 틀면 음질이 안 좋은 것이 그 이유이다.)
- All this range is used for transmitting volce.
- However, the edges of this range are not used for data communications because of a higher degree of accuracy to ensure integrity in data signals.
- <u>The effective bandwidth of a telephone line being used for data transmission is $2400Hz$, covering the range from $600Hz$ to $3000Hz$</u>.
- 데이터 용으로 쓰려하니 $600Hz$에서 $3000Hz$정도만 쓸 수 있다. 안전하게 digital data를 전송하는 데에 쓰려면 $600Hz$~$3000Hz$이 효과적이다.(하기 그림 참고)  
  ![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699194469/image_utgyxf.png)
- **Modem** stands for **modulator/demodulator**.

  - TELCO는 Telephone Company, 전화 회사, 통신 회사 (KT, SKT)
  - A modulator creates a bandpass analog signal from binary data.
  - A demodulator recovers the binary data from the modulated signal.
  - Telephone network에는 digital 신호가 갈 수 없으니, 사람 목소리처럼 analog 신호로 바꿔 줘야한다. 원격지에서는 analog를 digital로 바꿔줘야 한다.
  - digital -> analog -> digital (<u>mo</u>dulator + <u>dem</u>odulator)

  ![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699195259/image_quz1yw.png)

## Modem Standards

- <u>V-series standards</u> published by the ITU-T
- V.90 ($56K$ Modem) -> 이론적으로 최대 가능한 속도, 전화 네트워크에서
  - Traditional modems have a limitation on the data rate (maximum of $33.6Kbps$), as determined by the Shannon formula.
  - Ⅵ90 modems provides a bit rate of $56Kbps$.
  - These modems may be used only if one party is using digital signaling.
  - <u>Downloading rate is a maximum of $56Kbps$, while the uploading rate can be a maximum of $33.6Kbps$</u>.
- 원래 변환을 하면 $33.6Kbps$가 최대인데, 변환이 없으면 $56Kbps$가 가능하다.
  ![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699195829/image_enfvo4.png)

## Digital Subscriber Line

- subscriber line 케이블 품질이 점점 좋아져서, 나머지 남는 주파수가 많이 남게 됐다.
- 그래서 남는 주파수로 digital data를 보내 보자해서 나온 것이다.
- 전화선의 주파수를 다르게 써보자.
- 음성이 나가는 부분과 디지털 신호가 나가는 부분을 따로 쓰자.
- After traditional modems reached their peak data rate, telephone companies developed another technology, DSL to provide higher-speed access to the Internet.
- DSL technology is one of the most promising for supporting high-speed digital communication <u>over the existing local loops</u>.
- DSL technology is a set of technologies, each differing in the first letter (**ADSL**, **VDSL**, **HDSL**, and **SDSL**).
- The set is often referred to as **xDSL**.

## ASDL (Asymmetrical DSL)

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1699196115/image_rqrdnc.png)

- 대역을 똑같이 나누지 않고, 비대칭으로 나눈다.
- 컴퓨터에서는 ADSL modem을 사용해서 이용했다.
- 전화국에서는 **DSLAM(Digital subscriber line access multiplexer)** 을 이용해서, voice 대역을 뽑아서 전화 네트워크로 넘기고, 나머지 upstream, downstream 대역을 뽑아서 인터넷으로 보내줬다.
- The service is <u>not suitable</u> for business customers who need a large bandwidth in both directions.
- ADSL uses the existmg local loop.
- The twisted-pair local loop is actually capable of handling bandwidths up to $1.1 MHz$.
  - $1.1MHz$ is Just the theoretical bandwidth.
  - Factors such as the <u>distance</u> between the residence and the switching office, the <u>size of the cable</u>, the <u>signaling</u> used, and so on affect the bandwidth.
- <u>The data rate of ADSL is not fixed</u>; it changes based on the condition and type of the local loop cable.

- Actual bit rate
  - Because of the high signal/noise ratio, the actual bit rate is much lower.
  - Upstream: $64Kbps$ to $1Mbps$
  - Downstream: $500Kbps$ to $8Mbps$

## Other DSL Technologies

- **HDSL(High-bit-rate Digital Subscriber Line)**

  - It was designed as an alternatlve to the T-1 line.
  - It is less susceptible to attenuation and gets more length.

- **SDSL(Symmetric Digital Subscriber Line)**

  - It provides full-duplex symmetric commumcation supporting up to $768Kbps$ in each direction.

- **VDSL(Very-high-bit-rate Digital Subscriber Line)**
  - It is an alternative approach that is similar to ADSL.
  - It uses coaxial, fiber-opfic, or twisted-pair cable for short distances.
  - It provides $25Mbps$ to $55Mbps$ downstream and $3.2Mbps$ upstream normally.
