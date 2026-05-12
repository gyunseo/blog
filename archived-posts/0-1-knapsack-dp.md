---
title: 0-1 Knapsack DP
pubDatetime: 2023-12-10T22:01:00+09:00
featured: false
draft: false
tags:
  - DP
  - Computer-Science
  - Algorithms
description: 0-1 냅색 dp로 풀자
---

## Table of contents

## `python` 코드

```python
n, k = map(int, input().split())
items: list[tuple] = [()]
for _ in range(n):
    items.append(tuple(map(int, input().split())))

dp = [[0 if i == 0 or j == 0 else -1 for j in range(k + 1)] for i in range(n + 1)]


def recursive(i, j):
    if dp[i][j] != -1:
        return dp[i][j]

    else:
        if items[i][0] > j:
            dp[i][j] = recursive(i - 1, j)

        else:
            dp[i][j] = max(
                items[i][1] + recursive(i - 1, j - items[i][0]), recursive(i - 1, j)
            )

        return dp[i][j]


# for i in range(1, n + 1):
#     for j in range(1, k + 1):
#         if items[i][0] > j:
#             dp[i][j] = dp[i - 1][j]
#         else:
#             dp[i][j] = max(items[i][1] + dp[i - 1][j - items[i][0]], dp[i - 1][j])

print(recursive(n, k))

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
5 55
20 25
15 30
30 45
20 30
15 35
```

### Output

```zsh
95
```

## Execution Image

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702213378/image_okvrjx.png)
