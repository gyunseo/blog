---
title: LCS Algorithm
pubDatetime: 2023-12-10T20:24:00+09:00
featured: false
draft: false
tags:
  - Computer-Science
  - Algorithms
  - LCS
  - DP
description: LCS 알고리즘에 대해 알아 보자
---

## Table of contents

## `python` 코드

```python
import sys

input = sys.stdin.readline

input_word = input().rstrip()
word1, word2 = "tophat", "tomato"
len_input_word, len1, len2 = len(input_word), len(word1), len(word2)
dp_matrix1 = [[0] * (len_input_word + 1) for _ in range(len1 + 1)]
dp_matrix2 = [[0] * (len_input_word + 1) for _ in range(len2 + 1)]
for i in range(1, len_input_word + 1):
    for j in range(1, len1 + 1):
        if input_word[i - 1] == word1[j - 1]:
            dp_matrix1[i][j] = dp_matrix1[i - 1][j - 1] + 1
        else:
            dp_matrix1[i][j] = max(dp_matrix1[i][j - 1], dp_matrix1[i - 1][j])
print(dp_matrix1[-1][-1])

for i in range(1, len_input_word + 1):
    for j in range(1, len2 + 1):
        if input_word[i - 1] == word2[j - 1]:
            dp_matrix2[i][j] = dp_matrix2[i - 1][j - 1] + 1
        else:
            dp_matrix2[i][j] = max(dp_matrix2[i][j - 1], dp_matrix2[i - 1][j])

print(dp_matrix2[-1][-1])

if dp_matrix1[-1][-1] == dp_matrix2[-1][-1]:
    print(f"{word1}, {word2} 모두 대치 가능")
elif dp_matrix1[-1][-1] > dp_matrix2[-1][-1]:
    print(f"{word1} 대치 가능")
else:
    print(f"{word2} 대치 가능")

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
topato
```

### Output

```zsh
topato
5
5
tophat, tomato 모두 대치 가능
```

## Execution Image

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702207540/image_goj1uo.png)
