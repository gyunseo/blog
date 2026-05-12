---
author: Gyunseo Lee
title: Programmers 인기있는 아이스크림 SQL 문제 풀이
pubDatetime: 2024-02-25T14:17:00+09:00
modDatetime: 2024-02-25T14:17:00+09:00
featured: false
draft: false
tags:
  - SQL
  - Programmers
  - Coding-Test
description: ORDER BY 정렬 순서는 여러 개 지정해 줄 수 있다...
ogImage: https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1708838398/image_qqt5rc.png
---

## Table of contents

## 들어가며

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1708838398/image_qqt5rc.png)

이 문제는 여러 개의 Column에서 ORDER BY 정렬 순서를 지정해 줄 수 있는지를 물어보는 문제입니다.

- [인기있는 아이스크림 문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/133024)

## SQL Query

```sql
SELECT flavor
FROM first_half
ORDER BY total_order DESC, shipment_id ASC;
```
