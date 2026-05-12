---
title: Maze Algorithm
pubDatetime: 2023-12-10T20:53:00+09:00
featured: false
draft: false
tags:
  - test
description: this is template
---

## Table of contents

## `python` 코드

```python
from typing import Final, Optional
import sys

input = sys.stdin.readline
sys.setrecursionlimit(10**9)
MAZE: Final[list[list[int]]] = [
    [1, 1, 0, 1, 1],
    [0, 1, 0, 1, 0],
    [1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 1, 1, 1],
]

dx: Final[list[int]] = [0, 1, 0, -1]
dy: Final[list[int]] = [-1, 0, 1, 0]

start: Optional[tuple[int, ...]] = None
finish: Optional[tuple[int, ...]] = None
is_visited: list[list[bool]] = [[False] * 5 for _ in range(5)]


def solve(cur_i, cur_j, path):
    if is_visited[cur_i][cur_j]:
        return
    is_visited[cur_i][cur_j] = True
    assert finish is not None
    if cur_i == finish[0] and cur_j == finish[1]:
        print(f"{cur_i}, {cur_j}에 도착")
        print(f"경로: {path + [(cur_i, cur_j)]}")
        return
    for i in range(4):
        next_i, next_j = cur_i + dx[i], cur_j + dy[i]
        if next_i < 0 or next_i >= 5 or next_j < 0 or next_j >= 5:
            continue
        if MAZE[next_i][next_j] == 0:
            continue
        solve(next_i, next_j, path + [(cur_i, cur_j)])


start = tuple(map(int, input().rstrip().split()))
finish = tuple(map(int, input().rstrip().split()))
solve(start[0], start[1], path=[])
```

## How to Run

python version: `3.11.6`

### Run `main.py`

```
pip install pipenv
pipenv --python 3.11.6
pipenv run python3 main.py <input.txt
```

### Input

`input.txt`:

```
0 0
4 4
```

### Output

```zsh
4, 4에 도착
경로: [(0, 0), (0, 1), (1, 1), (2, 1), (2, 2), (2, 3), (3, 3), (4, 3), (4, 4)]
```

## Execution Image

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702209553/image_chegnp.png)
