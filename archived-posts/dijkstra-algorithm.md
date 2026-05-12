---
title: Dijkstra Algorithm
pubDatetime: 2023-12-10T22:57:00+09:00
featured: false
draft: false
tags:
  - Greedy
  - Algorithms
  - Computer-Science
description: 다익스트라
---

## Table of contents

## `C++` 코드

```cpp
#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const int MAX = 800;
const ll INF = 200000 * 1000;

int N, E, v1, v2, res = 3 * INF;
vector<pair<int, int>> vertex[MAX + 1];
ll dist[MAX + 1];
priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;

void Input()
{
    int a, b, c;
    cin >> N >> E;
    for (int i = 0; i < E; i++)
    {
        cin >> a >> b >> c; // a - b 사이 c의 가중치
        vertex[a].push_back({b, c});
        vertex[b].push_back({a, c});
    }
    cin >> v1 >> v2;
}

void InitPriorityQueue()
{
    while (!pq.empty())
        pq.pop();
}

void Dijkstra(int start)
{
    fill_n(dist, MAX + 1, INF); // dist 배열 초기화
    InitPriorityQueue();        // 우선순위 큐 초기화
    dist[start] = 0;
    pq.push({0, start});
    cout << "A에서 최단 거리:" << endl;
    for (int i = 1; i <= N; i++)
    {
        cout << dist[i] << " ";
    }
    cout << endl;
    while (!pq.empty())
    {
        int cdist, cv, nv, ndist;
        cdist = pq.top().first;
        cv = pq.top().second;
        pq.pop();
        if (cdist > dist[cv])
            continue; // 우선순위 큐에 있는 게 dist 배열에 저장된 값보다 크다면 continue
        for (const auto &n : vertex[cv])
        {
            ndist = cdist + n.second;
            nv = n.first;
            if (ndist < dist[nv])
            {
                dist[nv] = ndist;
                pq.push({ndist, nv});
            }
        }
        cout << "A에서 최단 거리:" << endl;
        for (int i = 1; i <= N; i++)
        {
            cout << dist[i] << " ";
        }
        cout << endl;
    }
}

void Solve()
{
    Input();
    Dijkstra(1);
    cout << "A에서 최단 거리:" << endl;
    for (int i = 1; i <= N; i++)
    {
        cout << dist[i] << " ";
    }
    cout << endl;
}

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
    Solve();
    return 0;
}
```

## How to Run

c++ 17 standard

### Run `main.cpp`

```
g++ main.cpp --std=c++17 -o main.out && ./main.out < input.txt
```

### Input

`input.txt`:

```
8 14
1 2 2
1 3 4
2 3 3
3 4 1
3 5 3
4 5 3
4 6 3
4 7 1
5 6 2
6 7 6
7 8 14
7 2 4
2 8 2
2 4 9

```

### Output

```zsh
A에서 최단 거리:
0 200000000 200000000 200000000 200000000 200000000 200000000 200000000
A에서 최단 거리:
0 2 4 200000000 200000000 200000000 200000000 200000000
A에서 최단 거리:
0 2 4 11 200000000 200000000 6 4
A에서 최단 거리:
0 2 4 5 7 200000000 6 4
A에서 최단 거리:
0 2 4 5 7 200000000 6 4
A에서 최단 거리:
0 2 4 5 7 8 6 4
A에서 최단 거리:
0 2 4 5 7 8 6 4
A에서 최단 거리:
0 2 4 5 7 8 6 4
A에서 최단 거리:
0 2 4 5 7 8 6 4
A에서 최단 거리:
0 2 4 5 7 8 6 4
```

## Execution Image

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702216709/image_ptu2h4.png)
