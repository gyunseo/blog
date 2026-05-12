---
author: Gyunseo Lee
title: "LeetCode 17: Letter Combinations of a Phone Number"
pubDatetime: 2024-07-02T23:16:00+09:00
modDatetime: 2024-07-02T23:16:00+09:00
featured: false
draft: false
tags:
  - PS
  - LeetCode
  - Algorithms
  - Brute-Force
description: Python의 기본 내장 라이브러리를 적극 활용하자...
ogImage: ""
---

## Table of contents

## 들어가며

걸린시간: 11분

처음 문제를 읽고, 모든 경우의 수를 Cartesian Product로 구하면 답은 나오겠다는 생각이 들었습니다.

## 접근

그리고 문제 조건을 보니깐, digits의 최대 길이가 4이어서, Python의 product 함수를 써서 카테시안 곱들을 구해도 문제에서 시간초과를 받지 않겠다는 생각을 하고 구현을 했습니다.

## 구현

휴대전화 버튼의 각 숫자에 해당하는 문자들은 Dictionary를 이용해서, Global 변수로 저장해서 구현을 했습니다.

```python
from itertools import product

digitAlphabetMap = {
    "2": ["a", "b", "c"],
    "3": ["d", "e", "f"],
    "4": ["g", "h", "i"],
    "5": ["j", "k", "l"],
    "6": ["m", "n", "o"],
    "7": ["p", "q", "r", "s"],
    "8": ["t", "u", "v"],
    "9": ["w", "x", "y", "z"]
}

class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        string_list = []
        combination_list = []
        for d in digits:
            string_list.append(digitAlphabetMap[d])
        for comb in product(*string_list):
            if len(comb) == 0:
                continue
            combination_list.append("".join(comb))
        return combination_list
```

## 다른 풀이 방법

DFS 알고리즘을 사용해서 product 라이브러리를 사용하지 않고, 직접 카테시안 곱들을 구할 수 있습니다.  
코테에서는 어떤 문제가 나올지 모르니 그렇게 구현하는 것도 연습을 해 봐야 겠습니다 ㅎㅎ 🥸
