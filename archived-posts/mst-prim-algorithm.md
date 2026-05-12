---
title: MST Prim Algorithm
pubDatetime: 2023-12-10T23:02:00+09:00
featured: false
draft: false
tags:
  - MST
  - Prim
  - Algorithms
  - Computer-Science
description: MST Prim 알고리즘
---

## Table of contents

## `python` 코드

```python
import sys
import heapq

# sys.stdin = open('input.txt', 'r')
input = sys.stdin.readline
print = sys.stdout.write

V, E = map(int, input().rstrip().split())
graph = [[] for _ in range(V + 1)]
is_visited = [False for _ in range(V + 1)]
hq = []

while E:
    A, B, C = map(int, input().rstrip().split())
    graph[A].append((B, C))
    graph[B].append((A, C))

    E -= 1


def prim(start):
    ret = 0
    heapq.heappush(hq, (0, start))

    while hq:
        cw, cv = heapq.heappop(hq)
        if is_visited[cv]:
            continue

        is_visited[cv] = True
        print(f"{cv} 추가됨, 이 놈의 가중치는 {cw}\n")
        ret += cw

        for next in graph[cv]:
            nv, nw = next
            if is_visited[nv]:
                continue
            heapq.heappush(hq, (nw, nv))

    return ret


print(f"{prim(1)}\n")
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
1 추가됨, 이 놈의 가중치는 0
6 추가됨, 이 놈의 가중치는 2
5 추가됨, 이 놈의 가중치는 1
2 추가됨, 이 놈의 가중치는 3
8 추가됨, 이 놈의 가중치는 5
7 추가됨, 이 놈의 가중치는 6
9 추가됨, 이 놈의 가중치는 10
4 추가됨, 이 놈의 가중치는 4
3 추가됨, 이 놈의 가중치는 8
10 추가됨, 이 놈의 가중치는 9
48
```

## Execution Image

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702217296/image_d6tixz.png)
