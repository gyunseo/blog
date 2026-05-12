---
title: GCD Algorithm
pubDatetime: 2023-12-10T18:33:00+09:00
featured: false
draft: false
tags:
  - Algorithms
  - GCD
  - Computer-Science
  - Decrease-and-Conquer
description: 유클리드 호제법에 대해 알아 보자
---

## Table of contents

## `python` 코드

```python
def get_gcd(x, y):
    while y:
        tmp = y
        if x % y == 0:
            return y
        y = x % y
        x = tmp

    return y


print(get_gcd(15, 21))
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

### Output

```zsh
3
```

## Execution Image

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702200922/image_jwimgq.png)
