---
author: Gyunseo Lee
title: "BOJ 5525: IOIOI"
pubDatetime: 2024-07-12T02:42:00+09:00
modDatetime: 2024-07-12T02:42:00+09:00
featured: false
draft: false
tags:
  - PS
  - BOJ
  - Algorithms
  - Two-Pointers
  - Sliding-Window
description: Window마다의 쿼리 시간 복잡도를 어떻게 줄일까...
ogImage: ""
---

## Table of contents

## 들어가며

걸린 시간: 37분

처음 보자마자, 이전에 풀었던 [leet-code-438-find-all-anagrams-in-a-string](leet-code-438-find-all-anagrams-in-a-string.md) 이 생각났습니다.  
Sliding Window 테크닉을 쓰면, 전체 문자열을 훑는 데에는 O(M)일 건데, Window 안에서 문자열이 `IOIOI`스러운 교대 문자열인 것을 log나 상수 스케일 안에 어떻게 알 수 있지? 라는 생각을 했습니다.  
역시 먼저 코드 치기보다는 문제 전체 설계를 해 보기!

## 접근

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1720719957/image_tqoxlf.png)
이 때 생각난 것이, alternating하는 개수를 계속 들고 있으면 상수 시간안에 판별이 가능하지 않을까라는 것이었습니다!  
그래서 이때부터는 바로 구현에 들어갔습니다.

## 구현

```python
import sys

input = sys.stdin.readline

def OOB(idx):
    if idx < 0 or idx >= M:
        return True
    return False

if __name__ == "__main__":
    N = int(input().strip())
    M = int(input().strip())
    S = input().strip()
    ans = 0
    windowSize = 2 * N + 1
    # print(N, M, S)
    start = end = 0
    alternatingCount = 0

    for start in range(M):
        isStartLegit = True if S[start] == "I" else False
        while not OOB(end) and end - start + 1 < windowSize:
            # 앞으로 새로 볼 문자가 alternating하는지 카운트
            if not OOB(end + 1) and S[end + 1] != S[end]:
                alternatingCount += 1
            end += 1
        # windowSize만큼 창문이 커졌으면
        # 이제 조건을 충족했는지 까볼 차례
        # 먼저 막 문자도 legit한지
        if OOB(end):
            break
        isEndLegit = True if S[end] == "I" else False
        # print(S[start:end + 1])
        # print(f"alternating count so far: {alternatingCount}, is legit start: {isStartLegit}, is legit end: {isEndLegit}")
        if isStartLegit and isEndLegit and alternatingCount == 2 * N:
            ans += 1
        # window에서 하나 pop하는데, alternating한걸 pop하면 count 하나 까기
        if not OOB(start + 1) and S[start] != S[start + 1]:
            alternatingCount -= 1
    print(ans)


```

투 포인터는 역시 off-by-one 에러가 많이 나는 테크닉입니다. 그래서 OOB (out of bound) 함수를 두어서 체크를 했습니다.
