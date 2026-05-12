---
author: Gyunseo Lee
title: "LeetCode 1438: Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit"
pubDatetime: 2024-07-04T01:34:00+09:00
modDatetime: 2024-07-04T01:34:00+09:00
featured: false
draft: false
tags:
  - PS
  - LeetCode
  - Algorithms
  - Sliding-Window
  - Two-Pointers
  - Monotonic-Queue
description: Sliding Window... Monotonic Queue... 어렵네요 😮
ogImage: ""
---

## Table of contents

## 들어가며

걸린 시간: 50분 (자력으로 풀지 못하고, 솔루션을 찾아서 보고 참고해서 풀었습니다.)

처음 문제를 읽고, subarray를 모두 결정짓는 경우의 수를 생각해 봤습니다.  
결정짓는 경우의 수는 간단합니다.  
subarray의 시작 index `s`와 끝 index `e`의 순서쌍 (s, e)를 구하면 됩니다.  
즉 $_{n}C_2$ 입니다.  
이 문제에서는요, 주어진 array의 길이의 최대가 $10^5$ 이어서, $n=10^5$ 이게 되고, 시간 초과가 나오게 됩니다.

## 접근

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1720028245/image_n2xlsa.png)

그래서 저는 문제의 목표를 다시 명확히 해봤습니다.

> 목표: `nums`의 subarray들 중에서, subarray내 |최대 원소의 값 - 최소 원소의 값| <= `limit`을 만족하는 subarray를 구한다. 그리고 그 subarray들 중에서 |subarray| (즉, len(subarray))가 가장 큰 값을 구하여라.

$O(N^2)$을 $O(N)$으로 개선하면 어떨까라는 생각이 들었고, 이 문제에서는 투포인터를 쓰면 개선을 할 수 있겠다라는 생각이 들었습니다.  
그래서 `l`, `r`을 두고 투포인터 테크닉을 써서, l, r을 요리조리 옮겨 다니게 했습니다.  
처음 두 포인터의 초기값은 `0`으로 두고, |max - min|값이 limit보다 작으면, r += 1을 해주고, |max - min|이 l += 1을 해주어서, 기존의 O(N^2)을 O(N)으로 개선하게 했습니다.  
그런데...

> max - min|값이 limit보다 작으면, r += 1을 해주고, |max - min|이 l += 1을 해주어서

를 할 수 있는 근거는 뭐냐라고 물으신다면요...
세 가지의 강력한 관찰을 바탕으로 도출해냈습니다.

1. `l`이 증가함에 따라 `max(subarray) - min(subarray) > limit`이 되는 최초의 `r` 지점은 증가한다.
2. 각 `l`에대해 `max(subarray) - min(subarray) > limit`이 되는 최초의 `r` 지점을 찾은 이후에는 더이상 `nums[r + 1]`, `nums[r + 2]`...를 탐색할 필요가 없습니다. 왜냐면 임의의 아무 숫자를 subarray에 받아들여준들 max(subarray) - min(subarray)는 커지기만 합니다.
3. `max(subarray) - min(subarray) <= limit`가 되는 최초의 `r` 지점을 탐색해낸 다음에는 r을 계속 증가해도 됩니다. 왜냐면 2번에서 말한 대로, 임의의 아무 숫자를 subarray에 받아들여 주면 `max(subarray) - min(subarray)`는 커지기만 할 수 있지, 절대 작아질 수 없습니다.

## 구현 (TLE 받음)

```python
class Solution:

    def longestSubarray(self, nums: List[int], limit: int) -> int:
        def OOB(cur_l, cur_r):
            if cur_l < 0 or cur_l >= n:
                return True
            if cur_r < 0 or cur_r >= n:
                return True
            return False

        n = len(nums)
        # print(f"n: {n}")
        l = r = 0
        max_num = min_num = nums[0]
        li = [nums[0]]
        ans = 0
        while not OOB(l, r) and l <= r:
            max_abs = max_num - min_num
            # print(f"l: {l}, r: {r}, max_abs: {max_abs}")
            if max_abs <= limit:
                ans = max(ans, r - l + 1)
                r += 1
                # find a new num
                if OOB(l, r):
                    continue
                li.append(nums[r])
                max_num = max(max_num, nums[r])
                min_num = min(min_num, nums[r])

            else:
                l += 1
                del li[0]
                max_num = max(li)
                min_num = min(li)
        return ans
```

위 코드는 아주 큰 input에 대해 TLE를 받았습니다.  
사실 구현하면서도

```python
       else:
                l += 1
                del li[0]
                max_num = max(li)
                min_num = min(li)
```

이 부분에서 시간 복잡도 상에서 큰 문제가 있겠구나를 직감했습니다. (결국 O(N^2)이 되네요...)  
그러면, 투 포인터에서 왼쪽 포인터를 증가하고 나서, O(1)만에 투 포인터 구간 내에서 max와 min을 뽑는 법이 뭐가 있을지 고민을 했고, 결국 인터넷에서 approach를 찾아 봤습니다.

## 구현 (Monotonic Queue 테크닉)

```python
from collections import deque
class Solution:

    def longestSubarray(self, nums: List[int], limit: int) -> int:
        def OOB(cur_l, cur_r):
            if cur_l < 0 or cur_l >= n:
                return True
            if cur_r < 0 or cur_r >= n:
                return True
            return False

        n = len(nums)
        # print(f"n: {n}")
        l = r = 0

        dec_dq = deque()
        inc_dq = deque()

        dec_dq.append(0)
        inc_dq.append(0)
        ans = 0
        while not OOB(l, r) and l <= r:
            max_abs = nums[dec_dq[0]] - nums[inc_dq[0]]
            # print(f"l: {l}, r: {r}, max_abs: {max_abs}")
            if max_abs <= limit:
                ans = max(ans, r - l + 1)
                r += 1
                # find a new num
                if OOB(l, r):
                    continue

                while dec_dq and nums[dec_dq[-1]] < nums[r]:
                    dec_dq.pop()

                while inc_dq and nums[inc_dq[-1]] > nums[r]:
                    inc_dq.pop()

                dec_dq.append(r)
                inc_dq.append(r)

            else:
                l += 1
                if dec_dq[0] < l:
                    dec_dq.popleft()
                if inc_dq[0] < l:
                    inc_dq.popleft()
        return ans

```

특정 구간에서 상수 시간만에 max와 min을 뽑아내는 테크닉으로 Monotonic Queue라는 테크닉을 쓰면 된다는 걸 알게 됐습니다.  
간단히 설명하자면 단조감소 큐와 단조증가 큐를 둡니다.

1. 단조감소큐는 단조감소가 항상 이뤄지게 큐에 원소를 넣으면 됩니다. 만약 단조감소가 깨질 거 같다? 그러면 이미 들어간 원소들을 모조리 popleft해줍니다.
2. 단조증가큐는 단조증가가 항상 이뤄지게 큐에 원소를 넣으면 됩니다. 만약 단조증가가 깨질 거 같다? 그러면 이미 들어간 원소들을 모조리 popleft해줍니다.

Monotonic Queue는 Queue의 Top을 peek해서 단조증감이 깨질 거 같은지를 파악해야 되기 때문에, Deque 자료구조를 이용해서 구현해야 합니다.  
그리고 중요한 점!! Queue에는 Index를 넣어야 됩니다.

단조감소큐의 가장 앞을 보면 최대값이 나오고, 단조증가큐의 가장 앞을 보면 최소값이 나옵니다!
