---
title: N-Queen Problem
pubDatetime: 2023-12-10T20:28:00+09:00
featured: false
draft: false
tags:
  - Computer-Science
  - Algorithms
  - N-Queen
  - Backtracking
description: N-Queen 문제
---

## Table of contents

## `python` 코드

```python
import sys

n = int(sys.stdin.readline())
col = [0] * n  # 각 row마다 퀸이 놓인 col의 index를 저장하는 리스트
count = 0


# 현재 row에 퀸을 놓을 수 있는지 체크하는 함수
def is_available(row):
    for i in range(row):
        # 같은 col에 놓인 퀸이 있는 경우
        if col[i] == col[row]:
            return False
        # 대각선에 놓인 퀸이 있는 경우
        if abs(col[i] - col[row]) == row - i:
            return False
    return True


# DFS 알고리즘으로 모든 경우의 수 탐색
def dfs(row):
    global count
    if row == n:
        count += 1
    else:
        for i in range(n):
            col[row] = i
            if is_available(row):
                dfs(row + 1)


dfs(0)
print(count)

```

## How to Run

python version: `3.11.6`

### Run `main.py`

```
pip install pipenv
pipenv --python 3.11.6
pipenv run python3 main.py
```

### Input

`input.txt`:

```
8
```

### Output

```zsh
92
```

## Execution Image

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702207735/image_uibnlr.png)
