---
title: Data Communications and Networking Chapter 4 LANs WIFI
pubDatetime: 2023-10-03T03:25:00+09:00
featured: false
draft: false
tags:
  - Computer-Science
  - Computer-Network
  - LAN
  - WIFI
  - Wireless-LAN
description: this is template
---

## Table of contents

## WIFI (IEEE 802.11 Working Group, Wireless LAN)

- attenuation (감쇠)
  - 신호가 모든 방향으로 퍼지다 보니 신호가 감쇠된다.
- interference (간섭)
  - receiver는 의도된 sender 말고도, 다른 sender들에게 signal을 받는다.
- multipath propagation
  - 무선은 가는 방향이 다방향으로 퍼진다.
- Error
  - 위의 특징들로 인해 에러가 많고, 에러 감지가 힘들다.

## Access Control

Wireless LANs에서는 CSMA/CD를 쓸 수 없다.
하기 세가지 이유로 인해 쓸 수 없다.

- station이 data를 보내고, 동시에 collision signal을 수신해야 한다.
  - duplex mode가 필요하고, wireless host는 그럴 만한 power가 없다.
- hidden terminal problem때문에 collision이 detect되지 않을 수 있다.
- signal fading때문에 collision을 듣기가 어렵다.

## Hidden Terminal Problem

## Exposed Terminal Problem

## BSS (Basic Service Set)

Ad hoc network (BSS without AP)
Infrastructrue (BSS with AP)

## ESS (Extended Service Set)

BSS들을 AP(Distributed System)로 연결한 것
