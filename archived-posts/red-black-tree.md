---
title: Red Black Tree Data Structure
pubDatetime: 2023-11-21T03:59:00+09:00
featured: false
draft: false
tags:
  - Algorithms
  - BST
  - Red-Black-Tree
  - Data-Structure
  - Self-Balancing-BST
description: Red Black Tree에 대해 알아 보자.
---

## Table of contents

## `C` 코드

CLRS의 Red Black Tree 챕터를 참고하여 작성했습니다.

```c
#include <stdio.h>
#include <stdlib.h>

#define BLACK 0
#define RED 1

typedef struct node
{
    int color, key;
    struct node *left, *right, *p;
} Node;

typedef struct
{
    Node *root;
    Node *nil;
} RBTree;

void init_RBTree(RBTree *T)
{
    T->nil = (Node *)malloc(sizeof(Node));

    T->nil->p = NULL;
    T->nil->left = NULL;
    T->nil->right = NULL;
    T->nil->key = 0;
    T->nil->color = BLACK;

    T->root = T->nil;
}

Node *new_node(int data)
{
    Node *tmp = malloc(sizeof(Node));

    tmp->p = NULL;
    tmp->left = NULL;
    tmp->right = NULL;
    tmp->key = data;
    tmp->color = RED;

    return tmp;
}

Node *tree_minimum(RBTree *T, Node *x)
{
    while (x->left != T->nil)
    {
        x = x->left;
    }
    return x;
}

void left_rotate(RBTree *T, Node *x)
{
    Node *y = x->right;
    x->right = y->left;
    if (y->left != T->nil)
        y->left->p = x;
    y->p = x->p;
    if (x->p == T->nil)
        T->root = y;
    else if (x == x->p->left)
        x->p->left = y;
    else
        x->p->right = y;
    y->left = x;
    x->p = y;
}

void right_rotate(RBTree *T, Node *x)
{
    Node *y = x->left;
    x->left = y->right;
    if (y->right != T->nil)
        y->right->p = x;
    y->p = x->p;
    if (x->p == T->nil)
        T->root = y;
    else if (x == x->p->left)
        x->p->left = y;
    else
        x->p->right = y;
    y->right = x;
    x->p = y;
}

void rb_insert_fixup(RBTree *T, Node *z)
{
    while (z->p->color == RED)
    {
        if (z->p == z->p->p->left)
        {
            Node *y = z->p->p->right;
            if (y->color == RED)
            {
                z->p->color = BLACK;
                y->color = BLACK;
                z->p->p->color = RED;
                z = z->p->p;
            }
            else if (z == z->p->right)
            {
                z = z->p;
                left_rotate(T, z);
            }
            else
            {
                z->p->color = BLACK;
                z->p->p->color = RED;
                right_rotate(T, z->p->p);
            }
        }
        else
        {
            Node *y = z->p->p->left;
            if (y->color == RED)
            {
                z->p->color = BLACK;
                y->color = BLACK;
                z->p->p->color = RED;
                z = z->p->p;
            }
            else if (z == z->p->left)
            {
                z = z->p;
                right_rotate(T, z);
            }
            else
            {
                z->p->color = BLACK;
                z->p->p->color = RED;
                left_rotate(T, z->p->p);
            }
        }
    }
    T->root->color = BLACK;
}

void rb_insert(RBTree *T, Node *z)
{
    Node *y = T->nil;
    Node *x = T->root;

    while (x != T->nil)
    {
        y = x;
        if (z->key < x->key)
            x = x->left;
        else
            x = x->right;
    }
    z->p = y;
    if (y == T->nil)
        T->root = z;
    else if (z->key < y->key)
        y->left = z;
    else
        y->right = z;

    z->left = T->nil;
    z->right = T->nil;
    z->color = RED;
    rb_insert_fixup(T, z);
}

void rb_transplant(RBTree *T, Node *u, Node *v)
{
    if (u->p == T->nil)
        T->root = v;
    else if (u == u->p->left)
        u->p->left = v;
    else
        u->p->right = v;
    v->p = u->p;
}

void rb_delete_fixup(RBTree *T, Node *x)
{
    while (x != T->root && x->color == BLACK)
    {
        if (x == x->p->left)
        {
            Node *w = x->p->right;
            if (w->color == RED)
            {
                w->color = BLACK;
                x->p->color = RED;
                left_rotate(T, x->p);
                w = x->p->right;
            }
            if (w->left->color == BLACK && w->right->color == BLACK)
            {
                w->color = RED;
                x = x->p;
            }
            else if (w->right->color == BLACK)
            {
                w->left->color = BLACK;
                w->color = RED;
                right_rotate(T, w);
                w = x->p->right;
            }
            else
            {
                w->color = x->p->color;
                x->p->color = BLACK;
                w->right->color = BLACK;
                left_rotate(T, x->p);
                x = T->root;
            }
        }
        else
        {
            Node *w = x->p->left;
            if (w->color == RED)
            {
                w->color = BLACK;
                x->p->color = RED;
                right_rotate(T, x->p);
                w = x->p->left;
            }
            if (w->right->color == BLACK && w->left->color == BLACK)
            {
                w->color = RED;
                x = x->p;
            }
            else if (w->left->color == BLACK)
            {
                w->right->color = BLACK;
                w->color = RED;
                left_rotate(T, w);
                w = x->p->left;
            }
            else
            {
                w->color = x->p->color;
                x->p->color = BLACK;
                w->left->color = BLACK;
                right_rotate(T, x->p);
                x = T->root;
            }
        }
    }
    x->color = BLACK;
}

void rb_delete(RBTree *T, Node *z)
{
    Node *y = z;
    Node *x;
    int y_original_color = y->color;
    if (z->left == T->nil)
    {
        x = z->right;
        rb_transplant(T, z, z->right);
    }
    else if (z->right == T->nil)
    {
        x = z->left;
        rb_transplant(T, z, z->left);
    }
    else
    {
        y = tree_minimum(T, z->right);
        y_original_color = y->color;
        x = y->right;
        if (y->p == z)
            x->p = y;
        else
        {
            rb_transplant(T, y, y->right);
            y->right = z->right;
            y->right->p = y;
        }
        rb_transplant(T, z, y);
        y->left = z->left;
        y->left->p = y;
        y->color = z->color;
    }
    if (y_original_color == BLACK)
        rb_delete_fixup(T, x);
}

void inorder(RBTree *T, Node *root)
{
    // 노드 n이 트리의 NIL이 아니면 n의 왼쪽 자식 노드를 출력 후 오른쪽 자식 노드를 출력
    if (root != T->nil)
    {
        inorder(T, root->left);
        printf("%d ", root->key);
        inorder(T, root->right);
    }
}

void print_RBTree(RBTree *T, Node *root, int depth)
{
    if (root == T->nil)
        return;

    print_RBTree(T, root->right, depth + 1);
    printf("\n");
    if (root == T->root)
    {
        printf("Root: ");
    }
    else
    {
        for (int i = 0; i < depth; i++)
            printf("    ");
    }

    printf("%d", root->key);
    if (root->color == RED)
        printf("(R)");
    else
        printf("(B)");
    print_RBTree(T, root->left, depth + 1);
}

int main()
{
    RBTree tree;
    init_RBTree(&tree);
    Node *a, *b, *c, *d, *e, *f, *g, *h, *i, *j, *k, *l, *m;
    a = new_node(13);
    b = new_node(8);
    c = new_node(17);
    d = new_node(1);
    e = new_node(11);
    f = new_node(15);
    g = new_node(25);
    h = new_node(6);
    i = new_node(22);
    j = new_node(27);
    rb_insert(&tree, a);
    rb_insert(&tree, b);
    rb_insert(&tree, c);
    rb_insert(&tree, d);
    rb_insert(&tree, e);
    rb_insert(&tree, f);
    rb_insert(&tree, g);
    rb_insert(&tree, h);
    rb_insert(&tree, i);
    rb_insert(&tree, j);

    print_RBTree(&tree, tree.root, 1);
    printf("\n\n");
    h = new_node(7);
    rb_insert(&tree, h);
    print_RBTree(&tree, tree.root, 1);
    printf("\n\n");
    return 0;
}
```

## How to Run

gcc version: 11.4.0

### Compile `main.c` and Run `main.out`

```zsh
gcc main.c -Og -o main.out
./main.out
```

### Output

```zsh

                27(R)
            25(B)
                22(R)
        17(R)
            15(B)
Root: 13(B)
            11(B)
        8(R)
                6(R)
            1(B)


                27(R)
            25(B)
                22(R)
        17(R)
            15(B)
Root: 13(B)
            11(B)
        8(R)
                7(R)
            6(B)
                1(R)
```

## Execution Image

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1700506957/image_bq3ruf.png)

## 7이 삽입됐을 때의 과정

CLRS에는 하기 5가지의 속성을 RB Tree 속성으로 규정하고 있다.

> 1. Every node is either red or black.
> 2. The root is black.
> 3. Every leaf (NIL) is black.
> 4. If a node is red, then both its children are black.
> 5. For each node, all simple paths from the node to descendant leaves contain thesame number of black nodes.

하기 대전제들을 지키며 삽입이 이뤄진다.

1. 삽입 전에는 CLRS에 나온 RB Tree 속성을 모두 만족한다.
2. 삽입 방식은 여느 BST와 동일
3. 삽입 후 RB Tree 속성 위반 여부 확인
4. RB Tree 속성을 위반했다면 재조정
5. 다시 RB Tree 속성을 모두 만족

RB Tree에서 새로운 노드는 항상 RED이다. (RB Tree의 5번 속성을 만족하기 위해서다.)

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1700509418/image_y3bsts.png)

그래서 7을 삽입하게 되면, 위의 그림처럼 된다. (RED 노드가 연속 두개가 있게 되어, 4번 속성을 위반하게 된다.) (세모는 부모가 포함된 sub tree이다.)
그러면 4번 속성을 만족하게 만들면 된다.  
RED 노드들을 퍼지게 만들면 된다.  
즉, 1은 빨강, 6은 검정으로 바꾸면 된다. (하기 그림 처럼럼)
![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1700509770/image_l1kusk.png)

그런데 이러면 하나 부모 sub tree와 4번 속성을 위반할 여지가 생긴다.  
그래서 BST의 속성도 유지하면서, RB Tree의 4번 속성을 유지하려면, 1을 기준으로 left rotate를 해야한다. (하기 그림처럼 변한다.)
![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1700510366/image_t3mt0t.png)

`rb_insert_fixup`의 코드를 살펴 보자.

```c
void rb_insert_fixup(RBTree *T, Node *z)
{
    while (z->p->color == RED)
    {
        if (z->p == z->p->p->left)
        {
            Node *y = z->p->p->right;
            if (y->color == RED)
            {
                z->p->color = BLACK;
                y->color = BLACK;
                z->p->p->color = RED;
                z = z->p->p;
            }
            else if (z == z->p->right)
            {
                z = z->p;
                left_rotate(T, z);
            }
            else
            {
                z->p->color = BLACK;
                z->p->p->color = RED;
                right_rotate(T, z->p->p);
            }
        }
        else
        {
            Node *y = z->p->p->left;
            if (y->color == RED)
            {
                z->p->color = BLACK;
                y->color = BLACK;
                z->p->p->color = RED;
                z = z->p->p;
            }
            else if (z == z->p->left)
            {
                z = z->p;
                right_rotate(T, z);
            }
            else
            {
                z->p->color = BLACK;
                z->p->p->color = RED;
                left_rotate(T, z->p->p);
            }
        }
    }
    T->root->color = BLACK;
}
```

아버지와 할아버지가 좌상단에서 우하단으로 내려오는 대각선 형태를 지녔다.  
그래서 `rb_insert_fixup` 함수에서 상기 코드와 같은 분기로 오게 된다.
`y`는 할아버지의 왼쪽 아들(삼촌)이다.
지금의 경우는 일단 삼촌이 `NIL`이다.(그래서 BLACK)
그리고 `z->p->left` 와 `z`도 같지 않다.(즉, 꺾여 있지 않다.)
그래서 마지막 `else` 분기로 오게 된다.  
말한 대로 아버지를 BLACK으로, 할아버지를 RED로 색칠하고, 할아버지를 기준으로 left_rotate를한다.
