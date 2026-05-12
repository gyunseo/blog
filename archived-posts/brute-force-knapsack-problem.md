---
title: Brute Force Knapsack Problem
pubDatetime: 2023-11-30T12:24:00+09:00
featured: false
draft: false
tags:
  - Algorithms
  - Computer-Science
  - Brute-Force
  - Knapsack-Problem
  - 0-1-Knapsack-Problem
description: Brute Force로 Knapscak Problem을 풀어 보자.
---

## Table of contents

## `python` 코드

```python
import time, unittest
from itertools import combinations


def get_max_value(items, limit_weight):
    max_value = -1
    items_size = len(items)
    # nCr에서 r을 1부터 n까지 증가시키면서 nCr을 구한다.
    for r in range(1, items_size + 1):
        comb_candidates = combinations(items, r)
        for candidate in comb_candidates:
            candidate_weight = sum([item[0] for item in candidate])
            candidate_value = sum([item[1] for item in candidate])
            if candidate_weight <= limit_weight and max_value < candidate_value:
                # max_value를 갱신한다.
                max_value = candidate_value
    return max_value


class KnapsackTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        # input.txt를 읽기
        # 첫 줄에는 물건의 개수 N과 최대 무게 K가 주어진다.
        # 두 번째 줄부터 N개의 줄에 거쳐 각 물건의 무게 W와 해당 물건의 가치 V가 주어진다.
        cls.N, cls.K = map(int, input().split())
        # (W, V) 튜플이 담긴 리스트
        cls.items = [tuple(map(int, input().split())) for _ in range(cls.N)]
        print("Brute Force Knapsack 테스트 시작")

    @classmethod
    def tearDownClass(cls) -> None:
        print("\nBrute Force Knapsack 테스트 종료\n")
        print(f"물건의 개수: {cls.N}")
        print(f"최대 무게: {cls.K}")
        print(f"물건의 무게와 가치: {cls.items}")
        print(f"최대 가치: {get_max_value(cls.items, cls.K)}")

    def setUp(self) -> None:
        self.start_time = time.time()

    def tearDown(self) -> None:
        self.end_time = time.time()
        print(
            f"\nget_max_value 함수 소요 시간: {self.test_function_end_time - self.test_function_start_time:4f}s"
        )
        print(f"테스트 자체의 소요 시간: {self.end_time - self.start_time:4f}s")

    def test_tsp(self):
        self.test_function_start_time = time.time()
        res = get_max_value(KnapsackTest.items, KnapsackTest.K)
        self.test_function_end_time = time.time()
        self.assertEqual(res, 14)


if __name__ == "__main__":
    unittest.main(verbosity=2)
```

## How to Run

python version: `3.11.6`

### Run `main.py`

```
pip install pipenv
pipenv --python 3.11.6
pipenv run python3 main.py < input.txt
```

### Input

`input.txt`:

```
4 7
6 13
4 8
3 6
5 12
```

### Output:

```
Loading .env environment variables...
Brute Force Knapsack 테스트 시작
test_tsp (__main__.KnapsackTest.test_tsp) ...
get_max_value 함수 소요 시간: 0.000028s
테스트 자체의 소요 시간: 0.000050s
ok

Brute Force Knapsack 테스트 종료

물건의 개수: 4
최대 무게: 7
물건의 무게와 가치: [(6, 13), (4, 8), (3, 6), (5, 12)]
최대 가치: 14

----------------------------------------------------------------------
Ran 1 test in 0.000s

OK
```

## Execution Image

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1701315006/image_txgs9m.png)
