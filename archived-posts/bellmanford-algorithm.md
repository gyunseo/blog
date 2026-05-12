---
title: bellman ford Algorithm
pubDatetime: 2023-12-10T21:56:00+09:00
featured: false
draft: false
tags:
  - Computer-Science
  - Algorithms
  - Bellman-Ford
  - DP
description: this is template
---

## Table of contents

## `python` 코드

```python
import sys

sys.stdin = open("input.txt", "r")
input = sys.stdin.readline
INF = int(1e9)
N, M = map(int, input().rstrip().split())
dist = [INF] * (N + 1)
edges = []
for _ in range(M):
    edges.append(tuple(map(int, input().rstrip().split())))


def bellman_ford(start):
    dist[start] = 0
    for i in range(1, N):
        for edge in edges:
            src, dest, weight = edge
            if dist[src] == INF:
                continue
            if dist[dest] > dist[src] + weight:
                dist[dest] = dist[src] + weight

    for edge in edges:
        src, dest, weight = edge
        if dist[src] == INF:
            continue
        if dist[dest] > dist[src] + weight:
            return False

    return True


if bellman_ford(1) == False:
    print(-1)
else:
    for i in range(2, N + 1):
        print(dist[i] if dist[i] != INF else -1)
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
5 10
1 2 6
1 4 7
2 3 5
2 4 8
2 5 -4
3 2 -2
4 3 -3
4 5 9
5 3 7
5 1 2
```

### Output

```zsh
2
4
7
-2
```

## Execution Image

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702213017/image_gtkrwd.png)
