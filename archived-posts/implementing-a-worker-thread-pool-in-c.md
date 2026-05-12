---
author: Gyunseo Lee
title: C언어로 Worker Thread Pool 구현하기
pubDatetime: 2024-06-14T19:45:00+09:00
modDatetime: 2024-06-14T19:45:00+09:00
featured: false
draft: false
tags:
  - Computer-Science
  - Thread
  - System-Programming
description: Multi Threading 머리 아프다...
ogImage: "https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1718367734/Screen_Recording_2024-06-14_at_21.20.01_e54yyc.gif"
---

## Table of contents

## 들어가며

이번 시스템 프로그래밍 실습 강의에서 Worker Thread Pool을 이용해서, 다수의 동시 접속자를 핸들링하는 예약 서버를 만들라는 과제를 받았습니다... 🥲  
어떻게 구현해야할지 감이 안 와서, 일단은 Worker Thread Pool을 만들어 보기로 했습니다!!

## 실습 환경

```zsh
            .-/+oossssoo+/-.
        `:+ssssssssssssssssss+:`
      -+ssssssssssssssssssyyssss+-
    .ossssssssssssssssssdMMMNysssso.
   /ssssssssssshdmmNNmmyNMMMMhssssss/
  +ssssssssshmydMMMMMMMNddddyssssssss+
 /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/
.ssssssssdMMMNhsssssssssshNMMMdssssssss.
+sssshhhyNMMNyssssssssssssyNMMMysssssss+   gyunseo@ubuntu-arm64
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   --------------------
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   OS: Ubuntu 24.04 LTS aarch64
+sssshhhyNMMNyssssssssssssyNMMMysssssss+   Host: VMware20,1 1
.ssssssssdMMMNhsssssssssshNMMMdssssssss.   Kernel: 6.8.0-35-generic
 /sssssssshNMMMyhhyyyyhdNMMMNhssssssss/    Uptime: 7 hours, 41 mins
  +sssssssssdmydMMMMMMMMddddyssssssss+     Packages: 900 (dpkg)
   /ssssssssssshdmNNNNmyNMMMMhssssss/      Shell: zsh 5.9
    .ossssssssssssssssssdMMMNysssso.       Resolution: 1280x800
      -+sssssssssssssssssyyyssss+-         Terminal: node
        `:+ssssssssssssssssss+:`           CPU: (4)
            .-/+oossssoo+/-.               GPU: 00:0f.0 VMware Device 0406
                                           Memory: 1028MiB / 7920MiB
```

`Makefile`:

```plaintext
CC = gcc
TARGET := t1
OUTPUT = $(TARGET).out
CCFLAGS = -Og -Wextra -Werror -Wall
LIBS = -pthread

all: $(OUTPUT)
$(OUTPUT) : $(TARGET).o
	$(CC) $< -o $@ $(LIBS)


$(TARGET).o: $(TARGET).c
	$(CC) $(CCFLAGS) -c $< -o $@ $(LIBS)



.PHONY: clean
clean:
	rm -f $(OUTPUT) $(TARGET).o
```

## Condition Variable이 없으면?

```c
#include <pthread.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#define NUM_THREADS 4
typedef struct task {
  int a, b;
} Task;

Task taskQueue[256];
pthread_mutex_t lockForQueue = PTHREAD_MUTEX_INITIALIZER;
int taskCount = 0;

void enqueueTask(Task task);
void executeTask(Task *task);

void *startThread();

int main() {
  pthread_t threads[NUM_THREADS];
  for (int i = 0; i < NUM_THREADS; i++) {
    if (pthread_create(&threads[i], NULL, startThread, NULL) != 0) {
      perror("pthread_create");
    }
  }
  srand(time(NULL));
  for (int i = 0; i < 100; i++) {
    Task task = {
        .a = rand() % 100,
        .b = rand() % 100,
    };
    enqueueTask(task);
  }

  for (int i = 0; i < NUM_THREADS; i++) {
    if (pthread_join(threads[i], NULL) != 0) {
      perror("pthread_join");
    }
  }
  pthread_mutex_destroy(&lockForQueue);
  return 0;
}
void enqueueTask(Task task) {
  pthread_mutex_lock(&lockForQueue);
  taskQueue[taskCount++] = task;
  pthread_mutex_unlock(&lockForQueue);
}
void executeTask(Task *task) {
  int res = task->a + task->b;
  printf("the sum of %d and %d is %d\n", task->a, task->b, res);
}

void *startThread() {
  while (true) {
    Task task;
    bool found = false;
    pthread_mutex_lock(&lockForQueue);
    if (taskCount > 0) {

      task = taskQueue[0];
      for (int i = 0; i < taskCount - 1; i++) {
        taskQueue[i] = taskQueue[i + 1];
      }
      taskCount--;
      found = true;
    }
    pthread_mutex_unlock(&lockForQueue);
    if (found) {
      executeTask(&task);
    }
  }
}
```

다음과 같이 명령어를 실행하여, 프로그램을 실행해 봅시다!

```zsh
make
./main.out
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1718367734/Screen_Recording_2024-06-14_at_21.20.01_e54yyc.gif)

그러면 위의 GIF처럼, 실행이 되고, 우측에 각 core별로 CPU Usage가 100%로 치솟는 것을 볼 수 있습니다.  
왜 그럴까요?

`startThread` 함수를 봅시다.  
여기서 `taskCount`가 0보다 크면 mutex lock을 들고, critical section에 진입해, 임계 영역내의 공유자원(여기서는 `taskCount`와 `taskQueue`)을 걸어잠그게 됩니다.

```c
void *startThread() {
  while (true) {
    Task task;
    bool found = false;
    pthread_mutex_lock(&lockForQueue);
    if (taskCount > 0) {

      task = taskQueue[0];
      for (int i = 0; i < taskCount - 1; i++) {
        taskQueue[i] = taskQueue[i + 1];
      }
      taskCount--;
      found = true;
    }
    pthread_mutex_unlock(&lockForQueue);
    if (found) {
      executeTask(&task);
    }
  }
}
```

그런데, 한 스레드가 critical section(임계 영역)에 들어가 걸어 잠그게 되면, 딴 스레드는 계속 손가락만 빨고 있게 됩니다.  
linux man page에서의 `phtread_mutex_lock` C library function에 대한 설명에서 발췌해 왔습니다.

> If the mutex is already locked by another thread, the calling thread shall block until the mutex becomes available.

Task Queue에 Task 즉, 작업이 있는 경우에는 임의의 한 스레드에서 락을 얻고 임계영역을 걸어 잠그고 작업을 하면, 딴 스레드들은 block 상태가 됩니다.  
그래서 처음에 작업들을 Execute할 때는 30% 후반대의 CPU Usage를 보여 줍니다.  
그런데 만약에, 큐에 작업이 없다면?  
한 스레드가 mutex lock을 얻지만, 큐 안에 아무것도 없기 때문에 lock을 얻음과 동시에 lock을 반환합니다, 락을 반환하는 순간 딴 스레드도 동시에 같은 작업을 하고요, 이 스레드도 락을 반환하면, 또 다른 스레드도 같은 일을 하게 됩니다. `while(true)`에 의해 해당 작업은 모든 스레드에서 계속 반복이 되고, 결국 CPU Usage는 치솟게 되는 결과가 나옵니다.  
그래서 `htop`으로 각 core를 모니터링했을 때, 모든 코어가 바쁘게 돌아가고 있었던 것입니다.😮

## Condition Variable 도입하기

```c
#include <pthread.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#define NUM_THREADS 4
typedef struct task {
  int a, b;
} Task;

Task taskQueue[256];
pthread_mutex_t lockForQueue = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t condForQueue = PTHREAD_COND_INITIALIZER;
int taskCount = 0;

void enqueueTask(Task task);
void executeTask(Task *task);

void *startThread();

int main() {
  pthread_t threads[NUM_THREADS];
  for (int i = 0; i < NUM_THREADS; i++) {
    if (pthread_create(&threads[i], NULL, startThread, NULL) != 0) {
      perror("pthread_create");
    }
  }
  srand(time(NULL));
  for (int i = 0; i < 100; i++) {
    Task task = {
        .a = rand() % 100,
        .b = rand() % 100,
    };
    enqueueTask(task);
  }

  for (int i = 0; i < NUM_THREADS; i++) {
    if (pthread_join(threads[i], NULL) != 0) {
      perror("pthread_join");
    }
  }
  pthread_mutex_destroy(&lockForQueue);
  pthread_cond_destroy(&condForQueue);
  return 0;
}
void enqueueTask(Task task) {
  pthread_mutex_lock(&lockForQueue);
  taskQueue[taskCount++] = task;
  pthread_mutex_unlock(&lockForQueue);
  pthread_cond_signal(&condForQueue);
}
void executeTask(Task *task) {
  int res = task->a + task->b;
  printf("the sum of %d and %d is %d\n", task->a, task->b, res);
}

void *startThread() {
  while (true) {
    Task task;
    pthread_mutex_lock(&lockForQueue);
    while (taskCount == 0) {
      pthread_cond_wait(&condForQueue, &lockForQueue);
    }

    task = taskQueue[0];
    for (int i = 0; i < taskCount - 1; i++) {
      taskQueue[i] = taskQueue[i + 1];
    }
    taskCount--;

    pthread_mutex_unlock(&lockForQueue);
    executeTask(&task);
  }
}
```
