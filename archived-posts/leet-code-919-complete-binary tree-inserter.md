---
author: Gyunseo Lee
title: "LeetCode 919: Complete Binary Tree Inserter"
pubDatetime: 2024-07-16T01:16:00+09:00
modDatetime: 2024-07-16T01:16:00+09:00
featured: false
draft: false
tags:
  - PS
  - Algorithms
  - Binary-Tree-Traversal
  - Binary-Tree
  - LeetCode
  - BFS
description: 문제를 꼼꼼히 천천히 읽자...
ogImage: ""
---

## Table of contents

## 들어가며

걸린 시간: 120분

이 문제를 처음 읽었을 때, binary tree가 아닌 binary search tree로 읽어 버린 실수를 하고 말았습니다.  
그래서 거의 20분 넘게 삽질을 하다가, complete binary tree라는 것을 깨닫고 다시 처음부터 문제를 접근했습니다.

## 접근

이 문제는 결국 이진 트리를 BFS 방식으로 순회하면 쉽게 해결되는 문제입니다.  
그런데 뭔가 계속 삽질을 하게 됐습니다.  
그래서 거의 2시간 걸려서 풀었네요.

## 구현

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

from collections import deque

class CBTInserter:
    def __init__(self, root: Optional[TreeNode]):
        self.node_list = [None for _ in range(10000 + 1)]
        q = deque()
        q.append((root, 0))
        self.node_list[0] = root
        while q:
            cur_node, cur_idx = q.popleft()
            next_node_left = cur_node.left
            next_node_right = cur_node.right

            if next_node_left != None:
                self.node_list[cur_idx * 2 + 1] = next_node_left
                q.append((next_node_left, cur_idx * 2 + 1))


            if next_node_right != None:
                self.node_list[cur_idx * 2 + 2] = next_node_right
                q.append((next_node_right, cur_idx * 2 + 2))
        # print(self.node_list)
        self.put_idx = len([*filter(lambda x: x != None, self.node_list)])

    def insert(self, val: int) -> int:
        # print(self.node_list)
        self.node_list[self.put_idx] = TreeNode(val)

        # even num (right)
        if self.put_idx % 2 == 0:
            parent_idx = self.put_idx // 2 - 1
            self.node_list[parent_idx].right = self.node_list[self.put_idx]
        # odd num (left)
        else:
            parent_idx = self.put_idx // 2
            self.node_list[parent_idx].left = self.node_list[self.put_idx]

        self.put_idx += 1
        return self.node_list[parent_idx].val

    def get_root(self) -> Optional[TreeNode]:
        return self.node_list[0]


# Your CBTInserter object will be instantiated and called as such:
# obj = CBTInserter(root)
# param_1 = obj.insert(val)
# param_2 = obj.get_root()
```
