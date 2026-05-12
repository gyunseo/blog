---
title: Floyd Warshall Algorithm
pubDatetime: 2023-12-10T22:07:00+09:00
featured: false
draft: false
tags:
  - DP
  - Algorithms
  - Computer-Science
description: 플로이드 와샬 알고리즘
---

## Table of contents

## `python` 코드

```python
import sys

# sys.stdin = open('input.txt', 'r')
input = sys.stdin.readline

INF = int(1e9)
n = int(input().rstrip())
m = int(input().rstrip())
dist = [[INF if i != j else 0 for j in range(0, n + 1)] for i in range(0, n + 1)]
for _ in range(m):
    a, b, c = map(int, input().rstrip().split())
    dist[a][b] = c if c < dist[a][b] else dist[a][b]


def floyd_warshall():
    for k in range(1, n + 1):
        for i in range(1, n + 1):
            for j in range(1, n + 1):
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])


floyd_warshall()
for i in range(1, n + 1):
    for j in range(1, n + 1):
        print(dist[i][j] if dist[i][j] != INF else 0, end=" ")
    print()

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
9
21
1 2 8
1 3 3
1 6 13
2 3 2
2 4 1
3 2 3
3 4 9
3 5 2
4 5 4
4 7 6
4 8 2
5 1 5
5 4 6
5 6 5
5 9 4
6 7 1
6 9 7
7 5 3
7 8 4
8 9 1
9 7 5
```

### Output

```zsh
0 6 3 7 5 10 11 9 9
9 0 2 1 4 9 7 3 4
7 3 0 4 2 7 8 6 6
9 15 12 0 4 9 6 2 3
5 11 8 6 0 5 6 8 4
9 15 12 10 4 0 1 5 6
8 14 11 9 3 8 0 4 5
14 20 17 15 9 14 6 0 1
13 19 16 14 8 13 5 9 0
```

## Execution Image

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702213718/image_v2de64.png)
