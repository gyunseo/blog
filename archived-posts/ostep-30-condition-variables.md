---
pubDatetime: 2023-09-18T01:39:00+09:00
title: OSTEP 30 Condition Variables
postSlug: ostep-30-condition-variables
featured: false
draft: false
tags:
  - Computer-Science
  - OS
  - OSTEP
  - Concurrency
  - Condition-Variables
description: OS:TEP 30장 공부한 거 정리
---

## Table of contents

## 들어가며

지금까지 `lock`의 개념을 학습하면서, hardware와 OS의 지원을 통해 제대로 된 `lock`을 만드는 법을 살펴봤다.
그러나, `lock`만으로는 제대로된 병행 program을 작성할 수 없다.
`thread`가 계속 진행하기 전에 어떤 조건이 참인지 검사해야 하는 경우가 많이 있다.
예를 들어 부모 `thread`가 작업을 시작하기 전에 자식 `thread`가 작업을 끝냈는지 검사하기를 원할 수 있다. (이 과정을 보통 `join()`이라 한다.)
그런 대기문을 어떻게 구현해야 할까?

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/ostep-30-condition-variables-1694969269278.jpeg)
우리는 하기와 같은 output을 원한다.

```bash
parent: begin
child
parent: end
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/ostep-30-condition-variables-1694969372752.jpeg)
상기 그림처럼 공유 변수를 사용해도 된다. 제대로 동작은 하지만은, 부모 `thread`가 회전을 하면서 CPU 시간을 낭비하기 때문에 비효율적이다.
대신, 부모 `thread`가 특정 조건이 참이 될 때 (ex: 자식 `thread`가 실행이 종료되는 것)까지 잠자면서 기다리는 방법이 더 좋다.

## 정의와 루틴들

상기에서 언급한 **조건**이 참이 될 때까지 기다리기 위해 `condition variable`을 활용할 수 있다.
`condition variable`은 일종의 queue data structure라서, 어떤 실행 상태 (또는 어떤 조건)가 원하는 것과 다를 때 조건이 참이 되기를 기다리며, `thread`가 대기할 수 있는 queue이다.
다른 `thread`가 상태를 변경시켰을 때, 대기 중이던 `thread` (하나 이상의 `thread`가 깨어날 수도 있다.)를 깨우고(조건에 따라 시그널을 보내서), 계속 진행할 수 있도록 한다.
`pthread_cond_t c;`라고 써, `c`가 컨디션 변수가 되도록 선언한다. (초기화 과정이 필요하다.)
`condition variable`에는 `wait()`와 `signal()`이라는 두 개의 연산이 있다.
`wait()`는 쓰레드 스스로가 잠자기 위해서 호출되는 것.
`signal()`은 쓰레드가 무엇인가 변경했기 때문에, 조건이 참이 되기를 기다리며 잠자고 있던 쓰레드를 깨울 때 호출되는 것.
POSIX의 사용례는 하기와 같다.

```c
pthread_cond_wait(pthread_cond_t *c, pthread_mutex_t *m);
pthread_cond_signal(pthread_cond_t *c);
```

각각을 간단히 `wait()`와 `signal()`이라 하자.
`wait()`에서 유념할 것은 `mutex`를 매개변수로 사용한다는 것이다.

> `wait()`가 호출될 때, `mutex`는 잠겨있었다 가정한다. `wait()`의 역할은 lock을 해제하고 호출한 thread를 재우는 것이다. 어떤 딴 thread가 signal을 보내, thread가 깨어나면, `wait()`에서 return하기 전에 lock을 재획득해야 한다.

그러니, 조건이 만족돼 잠에서 깨어났더라도 lock을 획득 못하면 다시 sleep 상태로 돌아간다.
이렇게 복잡한 이유는 thread 스스로를 재우려 할 때, race condition의 발생을 막기 위해서이다.
이해를 위해 하기 그림에 나타난 join 문제의 해법을 보자.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/ostep-30-condition-variables-1694972374585.jpeg)
두 가지 경우가 있다.

1. 부모 thread가 자식 thread를 생성하고, 계속 실행해 `thr_join()`을 호출하고 자식 thread가 끝나기를 기다리는 경우. 이 경우에는 부모 thread가 lock을 획득하고, 자식이 끝났는지 검사한 후에 (`done`이 1이 됐는지) 자식이 끝나지 않았으므로, `wait()`를 호출해 스스로를 재운다. (이때 lock을 해제) 자식 thread가 추후에 실행돼, `"child"`라는 msg를 print하고, `thr_exit()`을 호출해 부모 thread를 깨울 것이다. 이 코드는 lock을 획득한 후에, `done`을 1로 설정하고, 부모 thread에 signal을 보내 부모가 일어나도록 한다. (이때까지는 아직 부모 thread는 lock이 없겠죠? ㅎㅎ) 그 다음 마지막으로, 호출되었던 `wait()`에서 자식 thread에서 놓아준 lock을 획득하고, 그 상태로 return하여 부모 thread가 마저 실행될 것이고, 다시 또 lock을 해제하고 `"parent: end"` msg를 print할 것이다.

2. 자식 thread가 생성되면서 즉시 실행되고, `done`을 1로 설정한다. 그리고 자고 있는 thread를 깨우기 위해 signal을 보낸다. 하지만 이때 자고 있는 thread가 없기 때문에, 단순히 return한다. (한 마디로 헛수고한 셈이다.) 이후에 부모 thread가 실행되고, `thr_join()`을 호출하고, `done`이 1인 걸 알게 된다. `done`이 1이므로 `while`이 실행되지 않고, 대기 없이 바로 return한다.

매우 중요한 사실이 있다.
부모 thread가 조건을 검사할 때 (`done`을 검사할 때) `if`가 아니라 `while`을 사용한다는 것이다. 그리고 `done`이라는 상태 변수가 꼭 필요하다.
왜 그래야 하는지 하기 그림을 통해 이해하자.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/ostep-30-condition-variables-1694973358249.jpeg)
여기서 자식 thread가 생성된 즉시 실행되어, `thr_exit()`가 호출되는 경우를 상정해 보자. 자식 thread -(signal)-> no one answers. then, 부모 thread (sleeps) -(forever) -> no one wakes it up. 이런 형국이 된다.
이 예제를 통해 왜 `done`과 같은 상태 변수가 필요한지 알게 됐다.
잠자고, 깨우고, 락을 설정하는 것이 `done`이라는 상태 변수를 중심으로 구현됐다.
또 다른 안 좋은 예시가 있다.
signal을 주거나 대기할 때 lock을 획득할 필요가 없다고 가정해 보자.
하기 그림을 보며 어떤 문제가 생길지 생각해 보자.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/ostep-30-condition-variables-1694973636035.jpeg)
여기서는 race condition이 발생한다. 만약 부모 thread가 `done`이 0인 걸 확인하고, 잠을 자려한다. `wait()`를 호출하기 직전에 interrupt가 걸려서, 자식 thread가 실행되고, 자식 thread는 `done`을 1로 바꾸고, signal을 보낸다. 하지만, 깨워야 할 thread가 없어서 별 다른 짓을 안 하고 return하게 된다. 부모 thread로 다시 돌아 와서, `wait()`를 호출하고 영원히 잠자게 된다.
상기의 간단한 두 예제를 통해, 컨디션 변수를 제대로 사용하기 위한 기본적인 요건들을 이해했기를 바란다.

## 생산자/소비자 (유한 버퍼) 문제

다익스트라 양반이 제시한 producer/consumer 문제를 보자.
유한 버퍼 (bounded buffer) 문제로도 알려져 있다.
세마포어를 발명한 이유도 이 문제때문이다.
여러 개의 생산자 쓰레드와 소비자 쓰레드가 있다고 하자.
생산자는 데이터를 만들어 버퍼에 넣고, 소비자는 버퍼에서 데이터를 꺼내 쓴다.
이런 관계는 실제 시스템에서 자주 일어난다. (ex: 멀티 쓰레드 web server의 경우 생산자는 HTTP 요청을 작업 큐 (유한 버퍼)에 넣고, 소비자 쓰레드는 이 큐에서 요청을 꺼내어 처리한다. ~~**ㄷㄷ 이거 김승일이 말한 거 아님?**~~)
`grep foo file.txt | wc -l`과 같은 문장처럼 pipe 명령으로 한 program의 결과를 다른 program에게 전달할 때도 유한 버퍼를 사용한다.
이 예제는 두 개의 프로세스가 병행 실행된다. `grep` 명령어는 `file.txt`에서 `foo`라는 문자열이 포함된 줄만 찾아 stdout에 쓴다. unix shell은 출력 결과를 unix pipe (시스템 콜인 pipe에 의해 생성)라는 곳으로 redirect한다.
파이프의 한쪽 끝에는 `wc` 프로세스의 stdin과 연결돼 있다.
`grep` process = producer, `wc` process = consumer.
두 process 간에는 kernel 내부의 유한 버퍼가 있다.
유한 버퍼는 공유 자원이다.
그래서, race condition 방지를 위해 동기화가 필요하다.
하기 그림을 보면서 이해해 보자.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/ostep-30-condition-variables-1695000070208.jpeg)
`put()` 루틴은 buffer가 비었다고 가정하고, 값을 buffer에 넣고 `count`를 1로 set하여 가득찼다고 표시한다.
`get()`은 그 반대로 동작한다.
버퍼가 찼는지 확인하고, 값을 꺼낸 버퍼가 비었다고 설정한다.
읽은 값은 return.

> 중요한 점: 버퍼에 뭐가 없을 때 버퍼에 값을 넣고, 버퍼에 가득찼을 때 버퍼에서 값을 읽고 비운다.

이제 이 작업은 두 threads에 의해 수행된다.
하나는 producer thread고, 다른 하나는 consumer thread이다.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/ostep-30-condition-variables-1695000430496.jpeg)
하지만 이 코드가 제대로 동작하지 않는다는 것쯤은 잘 알 것이다. (~~난 모르겠음.~~)

### 불완전한 해답

생산자와 소비자가 하나씩 있다고 가정한다.
`put()`과 `get()` 루틴에는 임계 영역이 있으며, `put()`은 버퍼를 갱신하고, `get()`은 버퍼에 읽는다.
lock만 있다고 제대로 동작하는 게 아니다.
컨디션 변수가 더 필요하다.
하기 그림을 보며 이해해 보자.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/ostep-30-condition-variables-1695000654755.jpeg)
생산자는 버퍼가 빌 때까지 기다리고, 소비자는 찰 때까지 기다린다.
위 코드는 생산자 쓰레드와 소비자 쓰레드가 각각 하나씩 있으면 동작한다.
두 개 이상이 되면 안된다.
그 이유를 살펴 보자.
첫 번째 문제점은 `if`문이다.
`Tc1`과 `Tc2`라는 두 개의 소비자가 있고, `Tp`라는 생산자 하나가 있다고 하자.
`Tc1`이 먼저 실행되고, lock(상기 코드의 c1 부분)을 획득하고, 버퍼를 소비할 수 있는지 검사한다.
비어있음을 확인하고, 대기하며 lock을 해제한다.
그리고 생산자가 실행된다.
lock을 획득하고, 버퍼가 비었는지 확인한다.
비어있음을 확인하고, 버퍼를 채운다.
생산자는 버퍼가 가득차있다고 시그널을 보낸다.
대기 중인 `Tc1`은 깨어나서 ready queue에 들어간다.
`Tc1`은 이제 실행될 수 있는 상태이지만, 아직 실행 상태는 아니다.
생산자는 실행을 계속하고, 버퍼가 가득 차 있으므로 대기 상태로 전이한다.
여기에서 문제점이 발생한다.
딴 소비자 `Tc2`가 끼어 들어 실행하면서 버퍼 값을 소비한다.
`Tc1`이 실행된다고 해 보자.
대기에서 return하기 전에 락을 획득한다.
그리고 `get()`을 호출하지만, 버퍼는 비었다.
코드는 의도한 대로 동작하지 못했다.
하기 그림을 보며 더 자세히 이해해 보자.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/ostep-30-condition-variables-1695001454877.jpeg)
시그널은 쓰레드를 깨우기만 한다.
일종의 힌트에 불과하다.
이런 식으로 시그널을 정의하는 것을 Mesa semantic이라고 하고, 깨어난 즉시 쓰레드가 실행되는 것을 보장하는 걸 Hoare semantic이라고 한다.
대부분의 시스템은 Mesa semantic을 채용한다.

### 개선된, 하지만 아직도 불완전한: `if`문 대신 `while`문

이 문제는 쉽게 해결될 수 있다.
하기 그림을 보며 이해해 보자.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/ostep-30-condition-variables-1695001770681.jpeg)
`if`문을 `while`문으로 변경하면 된다.
`Tc1`이 일어나서 (lock을 획득한 상태), 즉시 공유 변수의 상태를 재확인하기 때문에, 버퍼가 비어있다면, 소비자는 다시 대기 상태로 돌아간다.
Mesa semantic에서는 언제나 `while`문을 이용하면 된다.
하지만 아직도 코드에는 버그가 있다.
컨디션 변수가 하나뿐이라는 것과 관계가 있다.
하기 그림에 그 과정이 나와 있다.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/ostep-30-condition-variables-1695002361454.jpeg)
그리고 이 과정은 글로 쓰기 귀찮으니, 교재 캡처본으로 설명을 대체한다.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/ostep-30-condition-variables-1695002400634.jpeg)
암튼 세 쓰레드 모두 대기 상태로 돌입할 수 있는 대참사가 날 수 있다는 것이다.

### 단일 버퍼 생산자/소비자 해법

두 개의 컨디션 변수 `empty`와 `fill`을 사용한다.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/ostep-30-condition-variables-1695002665298.jpeg)

### 최종적인 생산자/소비자 해법

마지막 변경으로 병행성을 증대시키자.
버퍼 공간을 추가하여 대기 상태에 들어가기 전에 여러 값들이 생산될 수 있도록 하는 것, 그리고 마찬가지로 여러 개의 값이 대기 상태 전에 소비될 수 있도록 하는 것이다.
하나의 생산자와 소비자의 경우에서는 버퍼가 커지면 쓰레드 간의 문맥 교환이 줄어들기 때문에 더 효율적이 된다.
멀티 생산자의 경우 또는 멀티 소비자의 경우 (또는 둘 다인 경우) 가 되면 생산과
소비가 병행이 될 수 있기 때문에 병행성이 좋아진다.
현재 해법에서 조금만 변경하면 된다.
하기 그림에서처럼 버퍼 구조와 `put()`과 `get()`을 변경하는 것이다.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/ostep-30-condition-variables-1695004571959.jpeg)

## 컨디션 변수 사용 시 주의점

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/ostep-30-condition-variables-1695004704430.jpeg)

상기 그림과 같이 메모리 할당의 경우, `allocate(100)`와 `allocate(10)`이 된 상태에서 `free(50)` 요청이 들어 오면, 전자를 깨우면 안된다.
후자를 깨워야 한다.
그래서 이런 경우에는 `pthread_cond_signal()` 대신 대기 중인 모든 threads를 깨우는 `pthread_cond_broadcast()`로 바꿔서 사용한다.
아직 깨어날 때가 아닌데 깨어난 threads들은 조건 재검사하고, 다시 대기 상태로 돌아간다.
이런 경우를 covering condition이라고 하고, context switch overhead가 크다.
