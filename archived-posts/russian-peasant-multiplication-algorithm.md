---
title: Russian Peasant Multiplication Algorithm
pubDatetime: 2023-12-10T02:43:00+09:00
featured: false
draft: false
tags:
  - Algorithms
  - Decrease-and-Conquer
  - Computer-Science
description: 러시아 농부 곱셈 알고리즘
---

## Table of contents

## `python` 코드

```python
import time


def normal_multiplication(a, b):
    start_at = time.time()
    result = a * b
    end_at = time.time()
    print(f"elapsed time: {end_at - start_at:.10f}s")
    return result


def get_russian_peasant_multiplication(a, b):
    start_at = time.time()
    result = 0
    while a > 0:
        if a & 1:
            result += b
        a = a >> 1
        b = b << 1
    end_at = time.time()
    print(f"elapsed time: {end_at - start_at:.10f}s")
    return result


A = 195342362382473513845003428
B = 399253634579252174384
import time

start_at = time.time()
russian_result = get_russian_peasant_multiplication(A, B)
print("로씨아 농부 곱셈 알고리즘")
print(f"result: {russian_result}, type: {type(russian_result)}")
print()
normal_result = normal_multiplication(A, B)
print("파이썬 곱셈 연산자")
print(f"result: {normal_result}, type: {type(normal_result)}")

```

## How to Run

python version: `3.11.6`

### Run `main.py`

```
pip install pipenv
pipenv --python 3.11.6
pipenv run python3 main.py
```

### Input

따로 input 없음

### Output

```zsh
elapsed time: 0.0000138283s
로씨아 농부 곱셈 알고리즘
result: 77991148168499936470722000918464516022933788352, type: <class 'int'>

elapsed time: 0.0000007153s
파이썬 곱셈 연산자
result: 77991148168499936470722000918464516022933788352, type: <class 'int'>
```

## Execution Image

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702143853/image_uvefm0.png)

python은 int class의 경우 `3.12` 버전 이전은 작은 수의 경우

$$
O(N^2)
$$

알고리즘을 쓰는 반면, 큰 수의 경우 카라추바 알고리즘을 쓰는 걸로 알고 있다.
카라추바는

$$
O(N^{1.58})
$$

이다.  
N은 자릿수.  
그리고 러시아 농부 곱셈은

$$
O(lgN)
$$

고로,
22^(1.58) = 132.1380324110
lg22 = 4.45943161863729
그러면 당연히 러시아 농부 곱셈이 더 빨라야 되지만은, python 내부 구현체는 c언어로 구현돼 있어서, C와 카라추바 알고리즘으로 구현된 파이썬 일반 곱셈 연산이 더 빠르다.

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702145388/image_pguv0o.png)
상기 이미지는 cpython코드의 일부이다.  
`k_mul`이 카라추바 알고리즘이다.  
python script가 워낙 high cost language여서 일어난 현상 같다.  
c로 작성하면 어떻게 될까?
교수님이 올려 주신 테스트 숫자로는 64비트 운영체제에서는 20자리가 넘어가는 정수를 핸들링 할 수가 없다.  
java의 BigInteger 클래스를 이용해 실험해 봐야 겠는데, 그것 또한 내부 구현이 어떻게 돼 있는지는 잘 모르겠다.  
왜 큰 수의 곱셈을 Russian Peasant 방식으로 처리하는가에 대한 답은, 매우 큰 수의 경우 시간 복잡도가 log로 떨어지기 때문에, 빠른 시간 안에 곱셈을 처리할 수 있기 때문이다.
또 궁금한 점은 왜 파이썬은 `3.12`부터는 굳이 고속 푸리에 변환을 사용했고, 그 전에는 러시아 농부 곱셈과 같은 딴 곱셈 알고리즘은 사용하지 않고 카라추바 알고리즘을 사용했는가이다.

## 참고 문서

- [O(N^2) grade school multiplication algorithm for small numbers](http://hg.python.org/cpython/file/b514339e41ef/Objects/longobject.c#l2570)
   - [big numbers it uses Karatsuba algorithm](http://hg.python.org/cpython/file/b514339e41ef/Objects/longobject.c#l2694)
