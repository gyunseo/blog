---
author: Gyunseo Lee
title: "LeetCode 438: Find All Anagrams in a String"
pubDatetime: 2024-07-06T01:34:00+09:00
modDatetime: 2024-07-06T01:34:00+09:00
featured: false
draft: false
tags:
  - PS
  - LeetCode
  - Algorithms
  - HashMap
  - Sliding-Window
description: Sliding Window 문제!
ogImage: ""
---

## Table of contents

## 들어가며

걸린 시간: 45분 (자력으로 못 풀고, 솔루션을 찾아서 보고 참고해서 풀었습니다.)

처음 문제를 읽고, p의 길이만큼의 sliding window를 만들어서 풀면 order of N square에서 order of N으로 쉽게 바꿔서 풀 수 있겠다고 생각을 해서 들어 갔습니다.

## 접근

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1720197539/image_jijiez.png)

그런데, window 안에 들어 있는 문자열이 p의 anagram인지 체크하는 로직을 order of N 보다 더 빠른 시간복잡도 안에 할 수 있는 방법을 떠올리지 못했습니다... 😥  
그래서 솔루션을 봤는데, HashMap 두 개를 이용해서 해시맵을 비교해서 order of 1 안에 valid한 문자열인지(즉, p의 anagram인지) 체크를 하더군요.

## 구현

```python
from collections import defaultdict
class Solution:

    def findAnagrams(self, s: str, p: str) -> List[int]:

        def OOB(idx):
            if idx < 0 or idx >= len_s:
                return True
            return False

        len_s = len(s)
        len_p = len(p)
        p_hash_map = defaultdict(lambda: 0)
        s_hash_map = defaultdict(lambda: 0)
        for ch in p:
            p_hash_map[ch] += 1
        print(p_hash_map)

        ans = []
        start = end = 0

        for start in range(len_s):

            while not OOB(end) and end - start < len_p:
                s_hash_map[s[end]] += 1
                end += 1

            # print(s_hash_map)
            # O(26) = O(1)
            if p_hash_map == s_hash_map:
                ans.append(start)
            # shift window
            s_hash_map[s[start]] -= 1
            if s_hash_map[s[start]] <= 0:
                s_hash_map.pop(s[start])

        return ans





```

슬라이딩 윈도우가 문자열 s를 훑으면서, window안에 있는 문자열이 valid한 문자열인지 확인한다라고 생각하면 편한 거 같습니다.  
그래서 python의 대표적인 HashMap 자료 구조인 dictionary를 사용해서 구현을 했습니다.
