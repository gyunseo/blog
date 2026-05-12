---
title: DFS and BFS Algorithms
pubDatetime: 2023-12-07T02:41:00+09:00
featured: false
draft: false
tags:
  - Algorithms
  - Computer-Science
  - Decrease-and-Conquer
description: DFS와 BFS 알고리즘에 대해 알아 보자
---

## Table of contents

## `python` 코드

```python
import sys
from typing import List, Final, Optional
from collections import deque

# sys.stdin = open("input.txt", "r")
input = sys.stdin.readline
MAX_VERTEX_SIZE: Final[int] = 1_000
MAX_EDGE_SIZE: Final[int] = 10_000
N: Optional[int] = None
M: Optional[int] = None
V: Optional[int] = None
adjacent_lists: List[List[int]] = [[] for _ in range(MAX_VERTEX_SIZE + 1)]
is_visited: List[bool] = [False for _ in range(MAX_VERTEX_SIZE + 1)]


def init_is_visited() -> None:
    for i in range(1, MAX_VERTEX_SIZE + 1):
        is_visited[i] = False


def read_console_input() -> None:
    global N, M, V
    N, M, V = map(int, input().rstrip().split())
    for _ in range(M):
        u, v = map(int, input().rstrip().split())
        adjacent_lists[u].append(v)
        adjacent_lists[v].append(u)


def solve() -> None:
    def dfs(start: int) -> None:
        stack: List[int] = []
        stack.append(start)
        while stack:
            cv: int = stack.pop()
            if is_visited[cv]:
                continue
            is_visited[cv] = True
            print(cv, end=" ")
            if cv == V:
                print(f"found {V} return!")
                return
            for nv in adjacent_lists[cv]:
                if not is_visited[nv]:
                    stack.append(nv)

    def bfs(start: int) -> None:
        queue: deque[int] = deque()
        queue.append(start)
        while queue:
            cv: int = queue.popleft()
            if is_visited[cv]:
                continue
            is_visited[cv] = True
            print(cv, end=" ")
            if cv == V:
                print(f"found {V} return!")
                return
            for nv in adjacent_lists[cv]:
                if not is_visited[nv]:
                    queue.append(nv)

    print(f"DFS와 BFS로 {V}를 찾아봅시다!")
    init_is_visited()
    dfs(1)
    print()
    init_is_visited()
    bfs(1)
    print()


if __name__ == "__main__":
    read_console_input()
    solve()
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
10 11 9
1 2
1 4
1 5
2 3
3 4
5 6
6 7
6 9
7 8
8 9
9 10
```

### Output

```zsh
DFS와 BFS로 9를 찾아봅시다!
1 5 6 9 found 9 return!

1 2 4 5 3 6 7 9 found 9 return!


```

## Execution Image

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1701884553/image_p4dxtp.png)
