---
title: Merge Sort Algorithms
pubDatetime: 2023-11-28T18:25:00+09:00
featured: false
draft: false
tags:
  - Algorithms
  - Merge-Sort
  - Divide-and-Conquer
description: Merge Sort에 대해서 알아보자.
---

## Table of contents

## `python` 코드

```python
import time, random, unittest




def get_merge_sorted(arr):

    if len(arr) <= 1:

        return arr



    mid = len(arr) // 2

    left_arr = get_merge_sorted(arr[:mid])

    right_arr = get_merge_sorted(arr[mid:])



    def merge(left, right):

        merged_arr = []

        left_idx, right_idx = 0, 0



        while left_idx < len(left) and right_idx < len(right):

            if left[left_idx] < right[right_idx]:

                merged_arr.append(left[left_idx])

                left_idx += 1

            else:

                merged_arr.append(right[right_idx])

                right_idx += 1



        # 여기로 왔다는 말은

        # left, right 둘 중 하나는 끝까지 다 돌았다는 뜻

        # 둘 중 하나만 돌았을 때는 위의 while문에서 이미 merged_arr에 추가가 되었기 때문에

        # 둘 중 하나만 돌았을 때는 그냥 나머지를 다 넣어주면 된다.



        while left_idx < len(left):

            merged_arr.append(left_arr[left_idx])

            left_idx += 1



        while right_idx < len(right):

            merged_arr.append(right_arr[right_idx])

            right_idx += 1



        return merged_arr



    partial_merged_list = merge(left_arr, right_arr)

    MergeSortTest.sort_procedure.append(partial_merged_list)

    return partial_merged_list




class MergeSortTest(unittest.TestCase):

    @classmethod

    def setUpClass(cls) -> None:

        print("0~1000까지의 정수 50개를 랜덤으로 생성합니다.")

        cls.random_numbers = [random.randint(0, 1000) for _ in range(50)]

        cls.sorted_random_numbers = sorted(cls.random_numbers)

        cls.sort_procedure = []

        print("Merge Sort 테스트 시작")



    @classmethod

    def tearDownClass(cls) -> None:

        print("\nMerge Sort 테스트 종료\n")



        print("Merge Sort 과정을 출력합니다.")

        for i, procedure in enumerate(cls.sort_procedure):

            print(f"{i + 1}번째 과정: {procedure}")



    def setUp(self) -> None:

        self.start_time = time.time()



    def tearDown(self) -> None:

        self.end_time = time.time()

        print(f"\n테스트 소요 시간: {self.end_time - self.start_time:4f}s")



    def test_merge_sort(self):

        self.assertEqual(

            get_merge_sorted(MergeSortTest.random_numbers),

            MergeSortTest.sorted_random_numbers,

        )




if __name__ == "__main__":

    unittest.main(verbosity=2)
```

## How to Run

python version: `3.11.6`

### Run `main.py`

```zsh
pip install pipenv
pipenv --python 3.11.6
pipenv run python3 main.py
```

### Output

```
Loading .env environment variables...
0~1000까지의 정수 50개를 랜덤으로 생성합니다.
Merge Sort 테스트 시작
test_merge_sort (__main__.MergeSortTest.test_merge_sort) ...
테스트 소요 시간: 0.000105s
ok

Merge Sort 테스트 종료

Merge Sort 과정을 출력합니다.
1번째 과정: [558, 738]
2번째 과정: [558, 738, 928]
3번째 과정: [0, 668]
4번째 과정: [0, 668, 833]
5번째 과정: [0, 558, 668, 738, 833, 928]
6번째 과정: [589, 753]
7번째 과정: [287, 589, 753]
8번째 과정: [462, 951]
9번째 과정: [274, 462, 951]
10번째 과정: [274, 287, 462, 589, 753, 951]
11번째 과정: [0, 274, 287, 462, 558, 589, 668, 738, 753, 833, 928, 951]
12번째 과정: [124, 886]
13번째 과정: [89, 124, 886]
14번째 과정: [422, 799]
15번째 과정: [422, 475, 799]
16번째 과정: [89, 124, 422, 475, 799, 886]
17번째 과정: [236, 768]
18번째 과정: [236, 325, 768]
19번째 과정: [195, 322]
20번째 과정: [406, 788]
21번째 과정: [195, 322, 406, 788]
22번째 과정: [195, 236, 322, 325, 406, 768, 788]
23번째 과정: [89, 124, 195, 236, 322, 325, 406, 422, 475, 768, 788, 799, 886]
24번째 과정: [0, 89, 124, 195, 236, 274, 287, 322, 325, 406, 422, 462, 475, 558, 589, 668, 738, 753, 768, 788, 799, 833, 886, 928, 951]
25번째 과정: [368, 414]
26번째 과정: [72, 368, 414]
27번째 과정: [373, 825]
28번째 과정: [373, 800, 825]
29번째 과정: [72, 368, 373, 414, 800, 825]
30번째 과정: [346, 450]
31번째 과정: [24, 346, 450]
32번째 과정: [731, 909]
33번째 과정: [483, 731, 909]
34번째 과정: [24, 346, 450, 483, 731, 909]
35번째 과정: [24, 72, 346, 368, 373, 414, 450, 483, 731, 800, 825, 909]
36번째 과정: [423, 836]
37번째 과정: [125, 423, 836]
38번째 과정: [28, 665]
39번째 과정: [28, 505, 665]
40번째 과정: [28, 125, 423, 505, 665, 836]
41번째 과정: [535, 764]
42번째 과정: [151, 535, 764]
43번째 과정: [468, 547]
44번째 과정: [42, 171]
45번째 과정: [42, 171, 468, 547]
46번째 과정: [42, 151, 171, 468, 535, 547, 764]
47번째 과정: [28, 42, 125, 151, 171, 423, 468, 505, 535, 547, 665, 764, 836]
48번째 과정: [24, 28, 42, 72, 125, 151, 171, 346, 368, 373, 414, 423, 450, 468, 483, 505, 535, 547, 665, 731, 764, 800, 825, 836, 909]
49번째 과정: [0, 24, 28, 42, 72, 89, 124, 125, 151, 171, 195, 236, 274, 287, 322, 325, 346, 368, 373, 406, 414, 422, 423, 450, 462, 468, 475, 483, 505, 535, 547, 558, 589, 665, 668, 731, 738, 753, 764, 768, 788, 799, 800, 825, 833, 836, 886, 909, 928, 951]

----------------------------------------------------------------------
Ran 1 test in 0.001s

OK
```

## Execution Image

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1701172466/image_igndqo.png)
![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1701172477/image_hi2rd3.png)
