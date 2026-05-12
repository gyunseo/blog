---
title: Ubuntu Server에 Docker Compose 설치하기
pubDatetime: 2023-10-09T18:28:00+09:00
featured: false
draft: false
tags:
  - Ubuntu
  - Linux
  - Docker
  - Docker-Compose
description: docker compose plugin 설치하기...
---

## Table of contents

## 들어가며

[Ubuntu Server에 Docker Engine 설치하기.](install-docker-engine-on-ubuntu-server.md)에서 Ubuntu Server에 Docker Engine을 설치했다.  
이제 Docker Compose를 설치하자.

## `zsh` 명령어

```zsh
# apt repository update
sudo apt-get update -y
# donwload and install
sudo apt-get install -y docker-compose-plugin
# verify the package
docker compose version
# outputs: Docker Compose version v2.21.0
```

## `$USER` docker group에 추가 (vscode devconatiner 사용을 하기 위해)

하기 명령어를 입력하면, 이제 `sudo`를 붙이지 않아도 docker 명령어를 사용할 수 있다.

```zsh
sudo usermod -aG docker $USER
```

## 참고 문서

- <https://docs.docker.com/compose/install/linux/#install-using-the-repository>
- <https://code.visualstudio.com/docs/devcontainers/containers>
