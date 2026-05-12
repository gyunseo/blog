---
title: Brute Force String Matching Algorithm
pubDatetime: 2023-11-29T21:33:00+09:00
featured: false
draft: false
tags:
  - Algorithms
  - Computer-Science
  - Brute-Force
  - String-Matching
description: Brute Force String Matching 알고리즘에 대해 알아 보자.
---

## Table of contents

## `python` 코드

```python
import time, unittest, sys, re


def get_string_matching_result(given_str, pattern_str):
    pattern_str_start_indice = []
    given_str_size = len(given_str)
    pattern_str_size = len(pattern_str)
    for i in range(given_str_size - pattern_str_size + 1):
        for j in range(pattern_str_size):
            # given_str의 (i + j)번째 인덱스부터 pattern_str의 j번째 인덱스까지 비교
            # 하나라도 다르면 나가리
            if given_str[i + j] != pattern_str[j]:
                break
            if j == pattern_str_size - 1:
                # pattern_str의 마지막 인덱스까지 비교했는데도 다르지 않다면
                # pattern_str이 given_str에 존재한다는 의미
                pattern_str_start_indice.append(i)
    return pattern_str_start_indice


class StringMatchingTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        # input.txt를 읽기
        cls.str_data = sys.stdin.read()
        cls.pattern_str_start_indice = [
            match.start() for match in re.finditer(r"어린 왕자", cls.str_data)
        ]
        print("String Matching 테스트 시작")

    @classmethod
    def tearDownClass(cls) -> None:
        print("\nString Matching 테스트 종료\n")
        print("pattern string: 어린 왕자")
        print(
            f"'어린 왕자' pattern string start indice: {get_string_matching_result(cls.str_data, '어린 왕자')}"
        )
        print("나타난 횟수: ", len(get_string_matching_result(cls.str_data, "어린 왕자")))

    def setUp(self) -> None:
        self.start_time = time.time()

    def tearDown(self) -> None:
        self.end_time = time.time()
        print(
            f"\nget_string_matching_result 함수 소요 시간: {self.test_function_end_time - self.test_function_start_time:4f}s"
        )
        print(f"테스트 자체의 소요 시간: {self.end_time - self.start_time:4f}s")

    def test_string_matching(self):
        self.test_function_start_time = time.time()
        res = get_string_matching_result(StringMatchingTest.str_data, "어린 왕자")
        self.test_function_end_time = time.time()
        self.assertEqual(
            res,
            StringMatchingTest.pattern_str_start_indice,
        )


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

`input.txt`: <https://cdn-uploads.piazza.com/paste/iql5qo7vipc4vg/935495d5a4adae7983e902cc7cf663a30a5345171a9bdffadad9ed902d9385ca/TheLittlePrince.txt>

### Output

```zsh
Loading .env environment variables...
String Matching 테스트 시작
test_string_matching (__main__.StringMatchingTest.test_string_matching) ...
get_string_matching_result 함수 소요 시간: 0.008769s
테스트 자체의 소요 시간: 0.008799s
ok

String Matching 테스트 종료

pattern string: 어린 왕자
'어린 왕자' pattern string start indice: [7, 34, 1308, 1804, 3374, 3394, 3449, 3800, 4434, 4604, 4723, 4773, 4983, 5038, 5963, 6368, 6721, 6820, 7107, 7236, 7398, 7442, 7570, 7620, 7804, 8016, 8206, 8430, 8573, 9035, 9057, 9605, 9643, 9682, 9991, 10291, 10854, 11457, 11673, 11713, 11853, 11972, 12360, 12449, 12580, 12636, 12714, 12797, 12978, 13205, 13310, 13409, 13543, 13743, 13765, 13822, 13870, 13954, 14011, 14191, 14514, 15029, 15098, 15114, 15210, 15319, 15339, 15393, 15497, 15852, 16197, 16269, 16322, 16501, 16676, 16810, 17021, 17241, 17346, 17485, 17564, 17835, 18031, 18268, 18336, 18525, 18666, 18697, 18775, 18858, 18996, 19044, 19124, 19216, 19260, 19371, 19532, 19588, 19659, 19719, 19761, 19875, 19942, 20019, 20085, 20168, 20209, 20282, 20591, 21438, 21842, 21958, 22241, 22282, 22347, 22574, 22617, 22657, 22789, 22815, 23031, 23276, 23655, 23890, 23907, 24129, 24333, 24426, 24527, 24641, 24766, 24878, 24900, 25005, 25137, 25170, 25299, 25815, 25919, 26340, 26772, 26952, 27046, 27190, 27246, 27293, 28088, 28609, 28727, 28794, 28922, 28963, 29123, 29201, 29279, 29328, 29395, 29538, 29642, 29796, 29913, 29933, 30025, 30078, 30318, 30374, 30394, 30412, 30501, 30606, 30681, 30767, 30880, 30996, 31017, 31114, 31174, 31251, 31297, 31424, 31452, 31568, 31753, 31833, 31924, 31944, 32018, 32112, 32141, 32238, 32412, 32777, 32902, 33559, 33622, 33856, 34303, 34578, 34665, 34762, 34989, 35059, 35247, 35470, 35580, 35637, 35767, 36032, 36060, 36091, 36154, 36352, 36480, 36701, 36868, 36991, 37022, 37151, 37302, 37365, 37692, 37789, 37858, 38073, 38236, 38416, 38545, 38822, 38905, 38932, 39145, 39190, 39442, 39472, 39566, 39774, 39833, 39988, 40247, 40276, 40567, 40984, 41132, 41212, 41316, 41426, 41614, 41679, 42020, 42176, 42233, 42357, 42491, 42621, 42699, 42892, 42914, 43267, 43490, 43755, 44418, 44831, 45105, 45162, 45329, 45513, 46076, 46165, 46185, 46589, 46774, 46834, 46957, 47012, 47343, 47425, 47479, 47800, 47839, 47847, 48182]
나타난 횟수:  281

----------------------------------------------------------------------
Ran 1 test in 0.027s

OK
```

## Execution Image

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1701262831/image_ceyaxd.png)
