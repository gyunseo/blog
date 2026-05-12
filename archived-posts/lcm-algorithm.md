---
title: LCM(Least Common Multiple) Algorithm
pubDatetime: 2023-11-21T02:59:00+09:00
featured: false
draft: false
tags:
  - Algorithms
  - LCM
  - GCD
  - Transform-and-Conquer
description: 최소 공배수 알고리즘에 대해 알아 보자.
---

## Table of contents

## `Python` 코드

```python
import sys, unittest, time

sys.setrecursionlimit(10**9)


def get_gcd(a, b):
    if b == 0:
        return a
    return get_gcd(b, a % b)


def get_lcm(a, b):
    return a * b // get_gcd(a, b)


class LCMTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        print("LCM(Least Common Multiple) 테스트 시작\n")

    @classmethod
    def tearDownClass(cls) -> None:
        print("\nLCM(Least Common Multiple) 테스트 종료\n")
        print(f"1071과 1029의 최소공배수: {get_lcm(1071, 1029)}")

    def setUp(self) -> None:
        self.start_time = time.time()

    def tearDown(self) -> None:
        self.end_time = time.time()
        print(f"\n테스트 소요 시간: {self.end_time - self.start_time:4f}s")

    def test_lcm(self):
        """
        1071과 1029의 최소공배수를 구하는 테스트
        """
        self.assertEqual(get_lcm(1071, 1029), 52479)


if __name__ == "__main__":
    unittest.main(verbosity=2)

```

## How to Run

python version: 3.11.6

```zsh
pip install pipenv
pipenv --python 3.11.6
pipenv run python3 main.py
```

```zsh
LCM(Least Common Multiple) 테스트 시작

test_lcm (__main__.LCMTest.test_lcm)
1071과 1029의 최소공배수를 구하는 테스트 ...
테스트 소요 시간: 0.000016s
ok

LCM(Least Common Multiple) 테스트 종료

1071과 1029의 최소공배수: 52479

----------------------------------------------------------------------
Ran 1 test in 0.000s

OK
```

## Execution Image

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1700503303/image_ojxjx4.png)
