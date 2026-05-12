---
title: MST Kruskal Algorithm
pubDatetime: 2023-12-10T23:13:00+09:00
featured: false
draft: false
tags:
  - MST
  - Greedy
  - Algorithms
  - Computer-Science
  - Kruskal
description: MST Kruskal 알고리즘
---

## Table of contents

## `python` 코드

```python
import sys

# sys.stdin = open('input.txt', 'r')
input = sys.stdin.readline
print = sys.stdout.write

V, E = map(int, input().rstrip().split())
edges = [tuple(map(int, input().rstrip().split())) for _ in range(E)]
edges.sort(key=lambda x: x[2])
parents = [i for i in range(V + 1)]
heights = [0 for _ in range(V + 1)]
MST = 0


def find(x):
    if parents[x] == x:
        return x
    parents[x] = find(parents[x])
    return parents[x]


def union(x, y):
    x = find(x)
    y = find(y)
    if x == y:
        parents[y] = x
        heights[x] += 1
        return

    if heights[y] > heights[x]:
        x, y = y, x

    parents[y] = x


for edge in edges:
    u, v, w = edge
    if find(u) == find(v):
        continue
    union(u, v)
    print(f"{u} {v} 사이 {w} 짜리 edge 추가\n")
    MST += w

print(f"{MST}\n")

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
10 17
1 2 3
1 6 2
2 3 17
2 4 16
3 4 8
3 9 18
4 5 11
4 9 4
5 6 1
5 8 5
5 9 10
5 7 6
6 7 7
7 8 15
8 9 12
8 10 13
9 10 9
```

### Output

```zsh
5 6 사이 1 짜리 edge 추가
1 6 사이 2 짜리 edge 추가
1 2 사이 3 짜리 edge 추가
4 9 사이 4 짜리 edge 추가
5 8 사이 5 짜리 edge 추가
5 7 사이 6 짜리 edge 추가
3 4 사이 8 짜리 edge 추가
9 10 사이 9 짜리 edge 추가
5 9 사이 10 짜리 edge 추가
48
```

## Execution Image

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702217695/image_ybvylt.png)
