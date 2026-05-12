---
title: Counting Money Algorithm
pubDatetime: 2023-12-10T22:15:00+09:00
featured: false
draft: false
tags:
  - Greedy
  - Algorithms
  - Computer-Science
description: 거스름돈 계산기
---

## Table of contents

## `python` 코드

```python
받은_돈 = int(input())

줘야_될_오만원 = 받은_돈 // 50000
오만원_주고_남은_돈 = 받은_돈 % 50000
줘야_될_만원 = 오만원_주고_남은_돈 // 10000
만원_주고_남은_돈 = 오만원_주고_남은_돈 % 10000
줘야_될_오천원 = 만원_주고_남은_돈 // 5000
오천원_주고_남은_돈 = 만원_주고_남은_돈 % 5000
줘야_될_천원 = 오천원_주고_남은_돈 // 1000
천원_주고_남은_돈 = 오천원_주고_남은_돈 % 1000
줘야_될_오백원 = 천원_주고_남은_돈 // 500
오백원_주고_남은_돈 = 천원_주고_남은_돈 % 500
줘야_될_백원 = 오백원_주고_남은_돈 // 100
백원_주고_남은_돈 = 오백원_주고_남은_돈 % 100
줘야_될_오십원 = 백원_주고_남은_돈 // 50
오십원_주고_남은_돈 = 백원_주고_남은_돈 % 50
줘야_될_십원 = 오십원_주고_남은_돈 // 10
십원_주고_남은_돈 = 오십원_주고_남은_돈 % 10

print(f"당신이 받을 지폐와 동전의 개수는 다음과 같습니다.")
print(f"오만원 지폐: {줘야_될_오만원}장")
print(f"만원 지폐: {줘야_될_만원}장")
print(f"오천원 지폐: {줘야_될_오천원}장")
print(f"천원 지폐: {줘야_될_천원}장")
print(f"오백원 동전: {줘야_될_오백원}개")
print(f"백원 동전: {줘야_될_백원}개")
print(f"오십원 동전: {줘야_될_오십원}개")
print(f"십원 동전: {줘야_될_십원}개")
print(f"나머지: {십원_주고_남은_돈}원")

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
123456789
```

### Output

```zsh
123456789
당신이 받을 지폐와 동전의 개수는 다음과 같습니다.
오만원 지폐: 2469장
만원 지폐: 0장
오천원 지폐: 1장
천원 지폐: 1장
오백원 동전: 1개
백원 동전: 2개
오십원 동전: 1개
십원 동전: 3개
나머지: 9원
```

## Execution Image

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702214249/image_ls4but.png)
