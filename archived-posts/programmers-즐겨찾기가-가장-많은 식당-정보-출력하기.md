---
author: Gyunseo Lee
title: "Programmers: 즐겨찾기가 가장 많은 식당 정보 출력하기"
pubDatetime: 2024-02-27T20:06:00+09:00
modDatetime: 2024-02-27T20:06:00+09:00
featured: false
draft: false
tags:
  - Coding-Test
  - SQL
  - Programmers
  - Sub-Query
description: 서브 쿼리 적극 이용하기
ogImage: https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1709300745/image_jmhaka.png
---

## Table of contents

## 들어가며

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1709300745/image_jmhaka.png)

해당 문제에서 하기와 같은 SQL Query를 날리면, 아래 표와 같은 결과가 나옵니다.

```sql
SELECT food_type, rest_id, rest_name, favorites
FROM rest_info;
```

| food_type | rest_id | rest_name          | favorites |
| --------- | ------- | ------------------ | --------- |
| 한식      | 00001   | 은돼지식당         | 734       |
| 일식      | 00002   | 하이가쯔네         | 112       |
| 양식      | 00003   | 따띠따띠뜨         | 102       |
| 일식      | 00004   | 스시사카우스       | 230       |
| 일식      | 00005   | 코슌스             | 123       |
| 양식      | 00006   | 지아스나폴리       | 50        |
| 양식      | 00007   | 소마바이           | 65        |
| 분식      | 00008   | 애플우스           | 151       |
| 한식      | 00009   | 숙성돼지           | 143       |
| 한식      | 00010   | 맷돌우리콩감자탕   | 243       |
| 한식      | 00011   | 부암갈비           | 150       |
| 한식      | 00012   | 만다복             | 10        |
| 한식      | 00013   | 은성보쌈           | 10        |
| 한식      | 00014   | 동명항생선숯불구이 | 53        |
| 중식      | 00015   | 만정               | 20        |
| 한식      | 00016   | 오대산산채전문점   | 230       |
| 한식      | 00017   | 방화동쭈꾸미마을   | 80        |
| 분식      | 00018   | 가나안             | 51        |
| 분식      | 00019   | 에버그린           | 130       |
| 한식      | 00020   | 신동태             | 550       |
| 한식      | 00021   | 강수곱창           | 210       |
| 한식      | 00022   | 군자네             | 101       |
| 일식      | 00023   | 싹쓰리             | 42        |
| 한식      | 00024   | 농실가찹쌀순대     | 12        |
| 분식      | 00025   | 별미진             | 10        |

문제에서 원하는 것은 각 음식 종류 별로 가장 즐겨찾기가 많은 레코드를 보여주라는 것입니다.  
일단 제가 제출한 답을 보겠습니다.

## SQL Query

```sql
SELECT food_type, rest_id, rest_name, favorites
FROM rest_info
WHERE favorites in (
    SELECT MAX(favorites)
    FROM rest_info
    GROUP BY food_type
)
GROUP BY food_type
ORDER BY food_type DESC;
```

1. 일단 Sub Query의 결과는 다음과 같습니다.

| MAX(favorites) |
| -------------- |
| 734            |
| 230            |
| 102            |
| 151            |
| 20             |

2. `WHERE favorites in "Sub Query 결과"`에서 rest_info에 있는 레코드 중에서 `favorites` 필드 값이 바로 위의 표에 있는 숫자에 있는 값 중에 하나라면, `WHERE` 조건에 걸려서 필터링됩니다.

3. 필터링된 레코드들을 `food_type`으로 GROUP지어 줍니다. (`GROUP BY food_type`에 의해서)

4. `ORDER BY food_type DESC`에 의해, 레코드들을 음식 종류를 기준으로 내림차순 정렬을 합니다.

그런데 2번과 3번 과정에 약간의 논리적인 오류가 있습니다.  
속된 말로 뽀록으로 맞은 것이죠.  
그 과정을 설명하고 개선된 SQL Query를 설명하겠습니다.

`favorites` 필드 값이 `230`인 경우는 두 레코드가 있습니다.

| food_type | rest_id | rest_name        | favorites |
| --------- | ------- | ---------------- | --------- |
| 일식      | 00004   | 스시사카우스     | 230       |
| 한식      | 00016   | 오대산산채전문점 | 230       |

정답 레코드를 한 번 볼까요?

| food_type | rest_id | rest_name    | favorites |
| --------- | ------- | ------------ | --------- |
| 한식      | 00001   | 은돼지식당   | 734       |
| 중식      | 00015   | 만정         | 20        |
| 일식      | 00004   | 스시사카우스 | 230       |
| 양식      | 00003   | 따띠따띠뜨   | 102       |
| 분식      | 00008   | 애플우스     | 151       |

`230`이라는 값때문에, 한식은 `734`와 `234` 값을 갖는 레코드 두개가 필터링되었고, 결국 이것 때문에 `GROUP BY food_type`이라는 쓸데없는 연산이 한 번 더 추가됐습니다.  
`GROUP BY`도 결국 운이 좋게 가장 위에 있는

| food_type | rest_id | rest_name  | favorites |
| --------- | ------- | ---------- | --------- |
| 한식      | 00001   | 은돼지식당 | 734       |

레코드를 출력해주어서 정답이 된 거지,

| food_type | rest_id | rest_name        | favorites |
| --------- | ------- | ---------------- | --------- |
| 한식      | 00016   | 오대산산채전문점 | 230       |

위 레코드가 `GROUP BY`를 했음에도 출력이 됐다면은 정답처리가 될 수 없었을 것입니다.
그래서 SQL Query를 다음과 같이 변경하면 더 좋은 쿼리문이 될 거 같네요.

```sql
SELECT food_type, rest_id, rest_name, favorites
FROM rest_info
WHERE (food_type, favorites) in (
    SELECT food_type, MAX(favorites)
    FROM rest_info
    GROUP BY food_type
)
ORDER BY food_type DESC;
```

## 틀린 첫번째 SQL Query

```sql
SELECT food_type, rest_id, rest_name, MAX(favorites) as favorites
FROM rest_info
GROUP BY food_type
ORDER BY food_type DESC;
```

이것은 `GROUP BY`가 됐을 때, 어떤 레코드가 집계 함수에 파라미터로 들어가 있는 필드이외의 필드들이 어떻게 출력되는지에 대한 이해가 없어서 비롯된 코드입니다.
