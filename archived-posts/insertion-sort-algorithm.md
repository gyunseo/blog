---
title: Insertion Sort Algorithm
pubDatetime: 2023-12-07T01:49:00+09:00
featured: false
draft: false
tags:
  - Algorithms
  - Computer-Science
  - Decrease-and-Conquer
description: 삽입 정렬에 대해 알아 보자.
---

## Table of contents

## `python` 코드

```python
import time, unittest


def save_sort_procedure(fn):
    def wrapper(arr):
        arr_size = len(arr)
        for i in range(1, arr_size):
            key_val = arr[i]
            j = i - 1
            while j >= 0 and key_val < arr[j]:
                arr[j + 1] = arr[j]
                j -= 1
            arr[j + 1] = key_val
            InsertionSortTest.sort_procedure.append((arr[:], j + 1))
        return arr

    return wrapper


@save_sort_procedure
def get_insertion_sorted(arr):
    arr_size = len(arr)
    for i in range(1, arr_size):
        key_val = arr[i]
        j = i - 1
        while j >= 0 and key_val < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key_val
    return arr


class InsertionSortTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.random_numbers = list(map(int, input().strip("[").strip("]").split(",")))
        cls.sorted_random_numbers = sorted(cls.random_numbers)
        cls.sort_procedure = []
        print("Insertion Sort 테스트 시작")

    @classmethod
    def tearDownClass(cls) -> None:
        print("\nInsertion Sort 테스트 종료\n")

        print("Insertion Sort 과정을 출력합니다.")
        print(f"bolded 72 정렬 전: {cls.sort_procedure[-8][0]}")
        print(
            f"bolded 72 정렬 후: {cls.sort_procedure[-7][0]}, 삽입된 위치: {cls.sort_procedure[-7][1]}"
        )

    def setUp(self) -> None:
        self.start_time = time.time()

    def tearDown(self) -> None:
        self.end_time = time.time()
        print(
            f"\nget_insertion_sorted 함수 소요 시간: {self.test_function_end_time - self.test_function_start_time:4f}s"
        )
        print(f"\n테스트 소요 시간: {self.end_time - self.start_time:4f}s")

    def test_insertion_sort(self):
        self.test_function_start_time = time.time()
        res = get_insertion_sorted(InsertionSortTest.random_numbers)
        self.test_function_end_time = time.time()
        self.assertEqual(
            res,
            InsertionSortTest.sorted_random_numbers,
        )


if __name__ == "__main__":
    unittest.main(verbosity=2)
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
[83, 17, 19, 34, 29, 52, 45, 97, 15, 22, 6, 16, 31, 31, 88, 12, 16, 15, 48, 74, 26, 67, 73, 18, 1, 29, 98, 8, 97, 47, 78, 51, 81, 53, 98, 25, 95, 27, 29, 17, 8, 66, 40, 27, 58, 14, 37, 67, 63, 35, 20, 54, 38, 78, 71, 55, 25, 53, 80, 59, 6, 35, 98, 14, 48, 39, 18, 33, 16, 55, 30, 94, 84, 99, 88, 59, 26, 22, 53, 99, 72, 55, 71, 76, 76, 12, 79, 1, 33, 87, 26, 63, 52, 42, 28, 61, 59, 8, 3, 60, 99, 54, 36, 93, 59, 46, 77, 9, 81, 66, 53, 42, 43, 79, 64, 43, 1, 16, 77, 42, 94, 44, 46, 1, 8, 97, 93, 70, 94, 9, 94, 62, 26, 10, 34, 53, 11, 83, 68, 27, 43, 45, 72, 94, 78, 98, 95, 40, 11, 72, 4, 94, 18, 47, 16, 77, 34, 12, 60, 14, 60, 17, 77, 21, 75, 85, 87, 73, 65, 49, 87, 98, 48, 22, 26, 21, 22, 94, 90, 75, 63, 22, 33, 74, 12, 82, 62, 26, 14, 12, 29, 25, 65, 95, 27, 69, 59, 76, 74, 77, 17, 100, 92, 38, 19, 2, 44, 5, 83, 38, 42, 77, 13, 23, 61, 64, 54, 17, 79, 82, 42, 52, 57, 30, 12, 100, 65, 80, 81, 61, 13, 19, 68, 33, 88, 77, 48, 48, 48, 55, 39, 26, 61, 66, 96, 89, 15, 20, 16, 71, 82, 62, 98, 6, 14, 92, 4, 43, 12, 3, 80, 15, 35, 16, 50, 34, 58, 42, 22, 30, 24, 29, 9, 66, 10, 60, 48, 90, 66, 71, 34, 2, 46, 63, 12, 71, 10, 47, 59, 52, 41, 77, 8, 72, 83, 46, 5, 43, 97, 91]
```

### Output

```zsh
Insertion Sort 테스트 시작
test_insertion_sort (__main__.InsertionSortTest.test_insertion_sort) ...
get_insertion_sorted 함수 소요 시간: 0.001265s

테스트 소요 시간: 0.001290s
ok

Insertion Sort 테스트 종료

Insertion Sort 과정을 출력합니다.
bolded 72 정렬 전: [1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 6, 6, 6, 8, 8, 8, 8, 8, 9, 9, 9, 10, 10, 10, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 18, 18, 18, 19, 19, 19, 20, 20, 21, 21, 22, 22, 22, 22, 22, 22, 23, 24, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 28, 29, 29, 29, 29, 29, 30, 30, 30, 31, 31, 33, 33, 33, 33, 34, 34, 34, 34, 34, 35, 35, 35, 36, 37, 38, 38, 38, 39, 39, 40, 40, 41, 42, 42, 42, 42, 42, 42, 43, 43, 43, 43, 44, 44, 45, 45, 46, 46, 46, 47, 47, 47, 48, 48, 48, 48, 48, 48, 48, 49, 50, 51, 52, 52, 52, 52, 53, 53, 53, 53, 53, 54, 54, 54, 55, 55, 55, 55, 57, 58, 58, 59, 59, 59, 59, 59, 59, 60, 60, 60, 60, 61, 61, 61, 61, 62, 62, 62, 63, 63, 63, 63, 64, 64, 65, 65, 65, 66, 66, 66, 66, 66, 67, 67, 68, 68, 69, 70, 71, 71, 71, 71, 71, 72, 72, 72, 73, 73, 74, 74, 74, 75, 75, 76, 76, 76, 77, 77, 77, 77, 77, 77, 77, 77, 78, 78, 78, 79, 79, 79, 80, 80, 80, 81, 81, 81, 82, 82, 82, 83, 83, 83, 84, 85, 87, 87, 87, 88, 88, 88, 89, 90, 90, 92, 92, 93, 93, 94, 94, 94, 94, 94, 94, 94, 95, 95, 95, 96, 97, 97, 97, 98, 98, 98, 98, 98, 98, 99, 99, 99, 100, 100, 72, 83, 46, 5, 43, 97, 91]
bolded 72 정렬 후: [1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 6, 6, 6, 8, 8, 8, 8, 8, 9, 9, 9, 10, 10, 10, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 18, 18, 18, 19, 19, 19, 20, 20, 21, 21, 22, 22, 22, 22, 22, 22, 23, 24, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 28, 29, 29, 29, 29, 29, 30, 30, 30, 31, 31, 33, 33, 33, 33, 34, 34, 34, 34, 34, 35, 35, 35, 36, 37, 38, 38, 38, 39, 39, 40, 40, 41, 42, 42, 42, 42, 42, 42, 43, 43, 43, 43, 44, 44, 45, 45, 46, 46, 46, 47, 47, 47, 48, 48, 48, 48, 48, 48, 48, 49, 50, 51, 52, 52, 52, 52, 53, 53, 53, 53, 53, 54, 54, 54, 55, 55, 55, 55, 57, 58, 58, 59, 59, 59, 59, 59, 59, 60, 60, 60, 60, 61, 61, 61, 61, 62, 62, 62, 63, 63, 63, 63, 64, 64, 65, 65, 65, 66, 66, 66, 66, 66, 67, 67, 68, 68, 69, 70, 71, 71, 71, 71, 71, 72, 72, 72, 72, 73, 73, 74, 74, 74, 75, 75, 76, 76, 76, 77, 77, 77, 77, 77, 77, 77, 77, 78, 78, 78, 79, 79, 79, 80, 80, 80, 81, 81, 81, 82, 82, 82, 83, 83, 83, 84, 85, 87, 87, 87, 88, 88, 88, 89, 90, 90, 92, 92, 93, 93, 94, 94, 94, 94, 94, 94, 94, 95, 95, 95, 96, 97, 97, 97, 98, 98, 98, 98, 98, 98, 99, 99, 99, 100, 100, 83, 46, 5, 43, 97, 91], 삽입된 위치: 217

----------------------------------------------------------------------
Ran 1 test in 0.002s

OK
```

## Execution Image

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1701881510/image_yafzyb.png)
