---
author: Gyunseo Lee
title: BFS 알고리즘 테크닉
pubDatetime: 2024-02-09T23:38:00+09:00
modDatetime: 2024-02-09T23:38:00+09:00
featured: false
draft: false
tags:
  - Algorithms
  - Computer-Science
  - BFS
description: PS에서 사용되는 BFS 알고리즘 테크닉 정리
---

## Table of contents

## 들어가며

BFS 알고리즘을 총 4개의 유형으로 분리하여, PS에서 자주 쓰는 테크닉을 정리하려 합니다.✍️

1. 거리 측정
2. 시작점이 여러개 일 때
3. 시작점이 두 종류일 때
4. 1차원에서의 BFS

## 거리 측정

- [BOJ 2178번: 미로 탐색](https://www.acmicpc.net/problem/2178)

```cpp
#include <iostream>
#include <queue>
#include <tuple>
#define endl '\n'
using namespace std;
const int MAX = 100;
queue<pair<int, int>> q;
string board[MAX];
// dist가 is_visited의 역할도 같이한다.
int dist[MAX][MAX];
int di[4] = {-1, 1, 0, 0};
int dj[4] = {0, 0, -1, 1};
int N, M;

bool OOB(int i, int j) {
    if (i < 0 || i >= N)
        return true;
    if (j < 0 || j >= M)
        return true;
    return false;
}

void ReadUserInput() {
    cin >> N >> M;
    for (int i = 0; i < N; i++) {
        cin >> board[i];
    }
}

void Solve() {
    int cur_i, cur_j;
    q.push({0, 0});
    dist[0][0] = 1;
    while (!q.empty()) {
        tie(cur_i, cur_j) = q.front();
        q.pop();
        if (cur_i == (N - 1) && cur_j == (M - 1)) {
            cout << dist[cur_i][cur_j] << endl;
            return;
        }
        for (int k = 0; k < 4; k++) {
            int next_i, next_j;
            next_i = cur_i + di[k];
            next_j = cur_j + dj[k];
            if (OOB(next_i, next_j))
                continue;
            if (board[next_i][next_j] == '0')
                continue;
            if (dist[next_i][next_j] >= 1)
                continue;
            dist[next_i][next_j] = dist[cur_i][cur_j] + 1;
            q.push({next_i, next_j});
        }
    }
}
int main() {
    ios_base::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    ReadUserInput();
    Solve();
    return 0;
}

```
