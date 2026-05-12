---
author: Gyunseo Lee
title: "Programmers: 보호소에서 중성화한 동물"
pubDatetime: 2024-04-23T01:26:00+09:00
modDatetime: 2024-04-23T01:26:00+09:00
featured: false
draft: false
tags:
  - Coding-Test
  - SQL
  - Programmers
  - Join
description: Inner Join을 이용해서 푼다...
ogImage: https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1713803314/image_svstd7.png
---

## Table of contents

## 들어가며

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1713803314/image_svstd7.png)

## SQL Query

```sql
SELECT o.animal_id, o.animal_type, o.name
FROM animal_outs o
    INNER JOIN animal_ins i
    ON o.animal_id = i.animal_id
WHERE (o.sex_upon_outcome LIKE "%Neutered%"
    OR o.sex_upon_outcome LIKE "%Spayed%")
    AND i.sex_upon_intake LIKE "%Intact%"
ORDER BY o.animal_id
```

Inner Join은 두 테이블 모두 조인 컬럼에 해당하는 값이 모두 존재한는 경우를 말한다.
