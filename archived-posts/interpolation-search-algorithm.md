---
title: Interpolation Search Algorithm
pubDatetime: 2023-12-10T18:44:00+09:00
featured: false
draft: false
tags:
  - Computer-Science
  - Algorithms
  - Decrease-and-Conquer
description: 보간 탐색
---

## Table of contents

## `python` 코드

```python
def interpolation_search(sorted_collection, item):
    left = 0
    right = len(sorted_collection) - 1

    while left <= right:
        # avoid divided by 0 during interpolation
        if sorted_collection[left] == sorted_collection[right]:
            if sorted_collection[left] == item:
                return left
            else:
                return None

        point = left + ((item - sorted_collection[left]) * (right - left)) // (
            sorted_collection[right] - sorted_collection[left]
        )

        # out of range check
        if point < 0 or point >= len(sorted_collection):
            return None

        current_item = sorted_collection[point]
        if current_item == item:
            return point
        else:
            if point < left:
                right = left
                left = point
            elif point > right:
                left = right
                right = point
            else:
                if item < current_item:
                    right = point - 1
                else:
                    left = point + 1
    return None


if __name__ == "__main__":
    collection = [i for i in range(500)]
    target = int(input("Enter a number to search for: "))
    result = interpolation_search(collection, target)
    if result is not None:
        print(f"{target} found at positions: {result}")
    else:
        print("Not found")
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

`input`:

```
5
```

### Output

```zsh
Enter a number to search for: 5
5 found at positions: 5
```

## Execution Image

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702201517/image_tbyxtl.png)
