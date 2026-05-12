---
pubDatetime: 2023-09-18T03:11:00+09:00
title: OSTEP 31 Semaphores
postSlug: ostep-31-semaphores
featured: false
draft: false
tags:
  - Computer-Science
  - OS
  - OSTEP
  - Concurrency
  - Semaphores
description: OS:TEP 31장 공부한 거 정리
---

## Table of contents

## 들어가며

병행성 문제 해결을 위해서는 lock과 condition variables가 모두 필요하다.
암튼 이 사실을 처음 인지한 양반이 다익스트라 알고리즘으로 유명한, 다익스트라라는 양반인데, 그 양반이 semaphore라는 동기화 기법도 개발했다.
이번 장은 이걸 공부한다.

## 세마포어: 정의

세마포어는 정수 값을 갖는 객체로서 두 개의 루틴으로 조작할 수 있다.
POSIX 표준에서 이 두 루틴은 `sem_wait()`와 `sem_post()`이다.
세마포어는 초기값에 의해 동작이 결정되기 때문에, 사용하기 전 **제일 먼저** 값을 초기화해야 한다.
하기 코드가 그 과정을 나타낸다.

```c
#include <semaphore.h>
sem_t s;
sem_init(&s, 0, 1);
```

상기 코드에서 세마포어 `s`를 선언 후, 3번째 인자로 1을 전달해 세마포어 값을 1로 초기화하낟.
`sem_init()`의 두 번째 인자는 모든 예제에서 0이다.
이 값은 같은 process 내의 thread 간 semaphore를 공유한다는 것을 의미한다.
초기화된 후에는 `sem_wait()`, 또는 `sem_post()`라는 함수를 호출해, semaphore를 다룬다.
두 함수의 동작은 하기 그림에 나온다.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/ostep-31-semaphores-1694974842445.jpeg)
이 루틴들은 다수 threads에 의해 동시에 호출되는 것을 가정한다.
임계 영역은 적절히 보호돼야 한다.
일단 임계 영역 보호에 대한 고민은 잠깐 뒤로 보류한다.
핵심적인 성질을 논의해 보자.
첫 번째로, `sem_wait()` 함수는 즉시 return하거나 (세마포어의 값이 1이상이면), 아니면 해당 세마포어의 값이 1이상 될 때까지 호출자를 대기시킨다.
다수의 threads들이 `sem_wait()`를 호출할 수 있기 때문에, 대기 queue에는 다수의 threads가 존재할 수 있다.
대기하는 법에는 spin과 sleep 두 가지가 있다는 것을 상기하자.
두 번째, `sem_wait()` 함수와 달리 `sem_post()` 함수는 대기하지 않는다. 세마포어의 값을 증가시키고, 대기 중인 thread 하나를 깨운다.
세 번째로, 세마포어가 음수라면 그 값은 현재 대기 중인 threads의 개수와 같다.
일반적으로 세마포어 사용자는 이 값을 알 수 없다. 하지만, 이런 성질을 알고 있는 게 세마포어 작동을 이해하는 데에 도움이 된다.
이 두 개의 함수는 atomic하게 실행된다고 가정한다.
세마포어 루틴 내에서 race condition이 발생할 수 있다는 사실은 아직은 걱정하지 말자.
이를 해결하가 위해 곧 lock과 condition variables를 사용한다.

## 이전 세마포어(락)

![aa](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/ostep-31-semaphores-1695006397149.jpeg)

상기 그림을 보자.
`sem_wait()`와 `sem_post()`가 쌍으로 임계 영역을 둘러싼 것을 볼 수 있다.
이것이 동작하기 위한 핵심은 세마포어 `m`의 초기값이다.
