---
author: Gyunseo Lee
title: "LeetCode 74: Search a 2D Matrix"
pubDatetime: 2024-07-10T20:02:00+09:00
modDatetime: 2024-07-10T20:02:00+09:00
featured: false
draft: false
tags:
  - PS
  - Algorithms
  - Binary-Search
  - LeetCode
description: 이분탐색 구현은 암기하고 있도록 하자
ogImage: ""
---

## Table of contents

## 들어가며

걸린 시간: 23분

이 문제를 처음 읽었을 때, 각 행마다 bisect_left, bisect_right 쿼리를 날려서 문제를 풀려고 했습니다.  
근데 그러면 시간 복잡도가 Order of mLgn이 되더라고요. 그러면 문제에서 요구한 Order of Lg(mn)보다 크게 돼서, 시간 초과가 납니다.  
그래서 하는 수 없이 이분 탐색을 그냥 구현하기로 했습니다.😀

## 접근

matrix에 이분탐색을 어떻게 할까 생각을 해 봤습니다.  
matrix를 행별로 끊어서 늘어 뜨리면 결국 하나의 정렬된 리스트가 될 것이라는 아이디어에서 출발했습니다.  
그러면 list의 idx를 열개수로 나눈 몫과 나머지가 matrix의 좌표가 돼 버립니다.

## 구현

```python
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        r = len(matrix)
        c = len(matrix[0])
        def binary_search():
            def check(idx):
                i, j = divmod(idx, c)
                if matrix[i][j] >= target:
                    return True
                return False

            lo = -1
            hi = r * c
            while lo + 1 < hi:
                mid = (lo + hi) // 2
                if check(mid):
                    hi = mid
                else:
                    lo = mid

            if hi == r * c:
                return False
            # lo-hi is cross point
            if matrix[hi // c][hi % c] == target:
                return True
            else:
                return False
        return binary_search()
```

```go
func divmod(a int, q int) (int, int) {
    n := a / q
    r := a % q
    return n, r
}
func searchMatrix(matrix [][]int, target int) bool {
    r, c := len(matrix), len(matrix[0])
    check := func (index int) bool {
        i, j := divmod(index, c)
        if matrix[i][j] >= target {
            return true
        }

        return false
    }

    lo, hi := -1, r * c
    for lo + 1 < hi {
        mid := (lo + hi) / 2
        if check(mid) {
            hi = mid
        } else {
            lo = mid
        }
    }
    // lo-hi is cross point
    if hi == r * c {
        return false
    }
    if matrix[hi / c][hi % c] == target {
        return true
    }
    return false
}
```

이분탐색은 off-by-one Error가 나기 쉽습니다.  
그래서 [이분 탐색 헷갈리지 않게 구현하기](https://www.acmicpc.net/blog/view/109)의 아티클을 예전에 읽은 적이 있습니다.  
해당 아티클의 발상과 아이디어를 많이 기억해 나가면서 구현을 했습니다.
