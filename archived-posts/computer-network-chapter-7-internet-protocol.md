---
title: IP Protocol
pubDatetime: 2023-10-24T14:00:00+09:00
featured: false
draft: false
tags:
  - Computer-Network
  - Computer-Science
  - IP
description: this is template
---

## Table of contents

## Internet Protocol Version 4

- IPv4 is the fourth version of the Internet Protocol
-
- it is one of the core protocols of standars-based internetworking methods in the Internet and other packet-switching networks.

## IPv4 Addressing

- uniquely identify each device on the internet.
- ip는 conneciton당 하나씩 할당한다.

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/internet-protocol-1698123806915.jpeg)
위에 그림은 IP 주소가 두 개 필요하다.  
전화 번호는 PSTN의 network address이다.

- ICANN(the Internet Corporation for Assigned Names and Numbers)에서 ip가 중복되지 않도록 관리한다.

우리나라는 Korea Internet & Security Agency (한국인터넷진흥원)에서 관리 (.kr 도메인)

## Internet Address

- IPv4의 경우,
- 4B로 ip address가 구성돼 있다.
- 각각의 Byte를 10진수로 표현한다.
- DDN(dotted-decimal notation) 표기법이라고 한다.
- IPv6의 경우,
- 16진수로 나타내고, hexadecimal notation이라고 한다.

## Hierarchy in addressing

telephone은 three level hierarchy를 갖고 있다.

(408) 864 - 8902

ip는 하기와 같다.  
the first address is called the network address and defines the organization network.

prefix|suffix
<- 32bits ->

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/internet-protocol-1698124841723.jpeg)
prefix는 network,
suffix는 host 부분
kisa 같은 곳에서 앞 부분을 할당해서 나눠주고, 각 기관 네트워크 관리자가 뒷 부분이 겹치지 않게 관리한다.

## Classful Addressing

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/internet-protocol-1698124867936.jpeg)

Class D는 one to many
Class E 앞으로 어떤일이 생길지 몰라서 예약

Class A는 나눠 줄 건 별로 없고, 받은 사람이 분배할 건 많다.  
Class B는 나눠 줄 건 조금 있는데, 받은 사람이 분배할 건 조금 있다.

## Classless Addressing

지금 ipv4와 ipv6가 공존하는 상황이다.
