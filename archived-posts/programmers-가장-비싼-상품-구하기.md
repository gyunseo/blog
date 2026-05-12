---
author: Gyunseo Lee
title: Programmers 가장 비싼 상품 구하기 SQL 문제 풀이
pubDatetime: 2024-02-25T14:41:00+09:00
modDatetime: 2024-02-25T14:41:00+09:00
featured: false
draft: false
tags:
  - SQL
  - Programmers
  - Coding-Test
description: Aggregate function에 대해 더 공부해 보자...
ogImage: https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1708839816/image_a2jb3n.png
---

## Table of contents

## 들어가며

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1708839816/image_a2jb3n.png)

이 문제는 집계 함수 중 `MAX`를 사용할줄 아는지 묻는 문제였다.

- [가장 비싼 상품 구하기 문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/131697)

## SQL Query

```sql
SELECT MAX(price) as MAX_PRICE
FROM product;
```
