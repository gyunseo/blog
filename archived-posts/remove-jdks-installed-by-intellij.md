---
title: IntelliJ가 설치한 JDK 삭제하기
pubDatetime: 2023-10-22T15:41:00+09:00
featured: false
draft: false
tags:
  - IntelliJ
  - JDK
  - Windows
description: 흐음....
---

## Table of contents

## 들어가며

Windows IntelliJ를 쓰면 편하다.  
알아서 JDK도 설치해주고, Project에 쓰일 JDK도 마우스 딸깍 딸깍 몇 번이면, 알아서 다 잡아 준다.  
그런데 필자는 앞으로 Windows에서 JDK Version Manager로 [jabba](https://github.com/shyiko/jabba)를 쓸 것이기 때문에,~~powershell script를 이용하여 JDK Version Management를 할 것이기 때문에~~ IntelliJ에서 설치해준 JDK들을 다 삭제하려고 한다.

## `%USERPROFILE%\.jdks`에 설치된 `JDK` 삭제

`%USERPROFILE%\.jdks`에 있는 `JDK`들을 모두 삭제해 주자.

## `%APPDATA%\JetBrains\IntelliJIdea[version]\options\jdk.table.xml` 수정

`%APPDATA%\JetBrains\IntelliJIdea[version]\options\jdk.table.xml`를 수정하자.  
여기서 `%USERPROFILE%\.jdks`에서 삭제했던 `JDK`의 이름이나 경로가 남아 있다면 수정하자.

## 참고 문서

- <https://intellij-support.jetbrains.com/hc/en-us/community/posts/360010672100-Cannot-remove-configured-SDKs>
