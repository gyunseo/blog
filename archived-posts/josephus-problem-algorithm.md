---
title: Josephus Problem Algorithm
pubDatetime: 2023-12-10T18:57:00+09:00
featured: false
draft: false
tags:
  - Algorithms
  - Computer-Science
  - Decrease-and-Conquer
description: this is template
---

## Table of contents

## `python` 코드

```python
from collections import deque
import sys

input = sys.stdin.readline
n, k = map(int, input().rstrip().split())
people: deque[int] = deque(i for i in range(1, n + 1))
ans: list[int] = []

while people:
    for _ in range(k - 1):
        people.append(people.popleft())
    ans.append(people.popleft())

print("<", end="")
print(", ".join(map(str, ans)), end="")
print(">")

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
7 3
```

### Output

```zsh
<3, 6, 2, 7, 5, 1, 4>
```

## Execution Image

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702202439/image_dtn6kp.png)
