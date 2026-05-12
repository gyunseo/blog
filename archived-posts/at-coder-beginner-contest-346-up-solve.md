---
author: Gyunseo Lee
title: AtCoder Beginner Contest 346 Up Solve
pubDatetime: 2024-03-24T16:20:00+09:00
modDatetime: 2024-03-24T16:20:00+09:00
featured: false
draft: false
tags:
  - At-Coder
  - PS
  - Algorithms
description: AtCoder Beginner Contest 346 업솔빙...
ogImage: ""
---

## Table of contents

## [B - Piano](https://atcoder.jp/contests/abc346/tasks/abc346_b)

### 목표: 무한으로 반복되는 키보드의 부분 문자열들 중에 `W`개의 흰 건반과 `B`개의 검은 건반으로 이뤄진 부분 문자열이 존재하는가?

#### 1. 무한으로 반복되는 키보드가 아니고 1개의 키보드(`wbwbwwbwbwbw`)만 존재한다면?

건반을 앞에서 차례로 훑으면서, 하나의 시작 건반 지점 마다 `W + B`개 range의 중첩 반복문을 돌려서, 흑/백건 건반을 카운트한다. 그리고 카운트된 각각의 흑/백건 건반 카운트가 각각 `W`, `B`와 같은지 확인합니다.

#### 2. 그럼 무한으로 반복되는 키보드라면?

나머지 연산을 이용하면 됩니다.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1711274611/image_tfvs9e.png)

위의 그림에서 `C`를 확인해 봅시다.  
`wbwbwwbwbwbw` 문자열에서 `0`번째 인덱스에 위치하고, 새로 시작되는 `wbwbwwbwbwbw` 문자열에서 `0`번째 인덱스에 위치해 있습니다.  
concatenated된 `wbwbwwbwbwbwwbwbwwbwbwbw`에서는 각각 `0`번째와 `12`번째에 위치해 있습니다.  
그래서 `MOD = 12`로 두고 모듈로 연산을 이용해서 카운트를 하면 됩니다.  
아래 코드를 살펴 봅시다.

```cpp
#include <bits/stdc++.h>
#define endl '\n'
using namespace std;
const string s = "wbwbwwbwbwbw";
int W, B;

int main() {
    ios_base::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    cin >> W >> B;
    const int N = s.size();
    for (int i = 0; i < N; i++) {
        int nw = 0, nb = 0;

        for (int j = 0; j < W + B; j++) {
            if (s[(i + j) % N] == 'w')
                ++nw;
            else
                ++nb;
        }

        if (nw == W && nb == B) {
            cout << "Yes" << endl;
            return 0;
        }
    }
    cout << "No" << endl;
    return 0;
}
```

아래 코드 부분에서 `MOD(12)`를 넘어 가서, 새로이 반복되는 키보드를 가리키는 경우 새로운 키보드를 concatenate하는 대신, modulo 연산을 이용하여서 문자열 순회를 구현했습니다.

```cpp
        for (int j = 0; j < W + B; j++) {
            if (s[(i + j) % N] == 'w')
                ++nw;
            else
                ++nb;
        }
```

## [D - Gomamayo Sequence](https://atcoder.jp/contests/abc346/tasks/abc346_b)

### 목표: `00011`과 같은 수열에서 toggle cost를 최소로 하며, sub sequences에서 adjacent characters가 동일한 수열의 원소가 딱 두개만 되게 만드는 것

$N = 2 \times 10^5$ 이라서 $O(NlogN)$ 이거나 $O(N)$ 근데 정렬을 시키거나 이분 탐색을 해서, 뭔가를 얻을 건덕지는 없어 보이고, 그러면 $O(N)$인데 이거는 그리디 말고 DP로 풀어야 할 거 같다는 느낌적인 느낌이 들었습니다.

```cpp
#include <bits/stdc++.h>

#define endl '\n'
#define VI vector<int>
#define watch(x) cout << (#x) << " is " << x << endl
#define FOR(s, e) for (int i = s; i < e; i++)
using namespace std;
using ll = long long;
#define VL vector<long long>

const int MAX = 200000;
const ll INF = (int)1e18;
int N;
string S;
// dp table은 i번째 문자가 k로 되고, j만큼의 adjacent character pair가 있을 때
// min cost table이다
ll dp[MAX + 1][2][2];
VL costs;

int main() {
    ios_base::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    cin >> N;
    cin.ignore();
    getline(cin, S);
    for (int i = 0; i < N; i++) {
        int cost;
        cin >> cost;
        costs.push_back(cost);
    }

    fill(&dp[0][0][0], &dp[MAX - 1][1][2], INF);
    dp[0][0][S[0] - '0'] = 0;
    dp[0][0][(S[0] - '0') ^ 1] = costs[0];

    FOR(1, N) {
        int cur_digit = S[i] - '0';
        for (int k = 0; k < 2; k++) {
            dp[i][0][k] = dp[i - 1][0][k ^ 1] + (cur_digit == k ? 0 : costs[i]);
            dp[i][1][k] = min(dp[i - 1][0][k], dp[i - 1][1][k ^ 1]) +
                          (cur_digit == k ? 0 : costs[i]);
        }
    }
    cout << min(dp[N - 1][1][0], dp[N - 1][1][1]) << endl;
    return 0;
}
```
