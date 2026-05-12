---
title: Windows의 "디스플레이 연결이 제한될 수 있습니다" 오류를 해결하자.
pubDatetime: 2023-10-08T00:18:00+09:00
featured: false
draft: false
tags:
  - Windows
  - Monitor
  - 잔류전원
  - 외장모니터
description: Yoga Slim 7 ProX 14ARH7은 전설이다...
---

## Table of contents

## 들어가며

추석에 할머니 집에 노트북을 들고 다녀오고 나서, 갑자기 노트북 C-to-DP 케이블로 연결하던 외장 모니터가 감지되지 않는 오류가 발생했다.
진짜 오만 가지 생각이 다 들어서, 그래픽 카드 드라이버 재설치부터 시작해서 온갖 것을 다 시도해 봤다.
결국 카카오톡 레노버서비스 채널에 문의를 해서 해결을 했다.

## 잔류 전원 방전시키기

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/fix-windows-external-monitor-not-detected-1696692517090.jpeg)

문의 결과 상기 이미지와 같은 답변을 받았다.
그래서 말한 대로 비사용재설정 구멍에 USIM 교체 사용하는 핀을 이용하여 5초 간 누르고, 전원 버튼을 15초 누르고 다시 AC어댑터를 연결하여 부팅을 해보니 감지가 잘 됐다.

## 원인 분석

아마 할머니 집의 콘센트가 접지가 안돼서 발생했던 문제같았다.

## 참고 문서

<https://download.lenovo.com/consumer/mobiles_pub/yoga_slim_7i_pro_14_7_x_ug_ko.pdf>
