---
title: NestJS Prisma Deep Dive
author: Gyunseo Lee
pubDatetime: 2023-12-24T01:51:00+09:00
modDatetime: 2024-01-21T23:45:00+09:00
featured: true
draft: false
tags:
  - NestJS
  - TypeScript
  - Prisma
  - JavaScript
  - Web
  - Backend
description: NestJS + Prisma로 Web Backend API 서버 개발하기...
---

## Table of contents

## 들어가며

- <https://www.youtube.com/watch?v=skQXoZ8chxk>

nestjs를 공부하면서 노트하는 포스트입니다. 😊

## NestJS 설치

```zsh
# node version: v20.10.0
npm i -g @nestjs/cli@latest
```

저는 미리 `nestjs-prisma-deep-dive`라는 directory를 만들었습니다 ㅎㅎ

```zsh
cd nestjs-prisma-deep-dive
nest new .
```

package manager로는 `pnpm`을 사용합니다.
