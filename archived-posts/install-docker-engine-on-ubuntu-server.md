---
title: Ubuntu Server에 Docker Engine 설치하기.
pubDatetime: 2023-10-09T18:00:00+09:00
featured: false
draft: false
tags:
  - Docker
  - Ubuntu
  - Linux
description: Docker Desktop이 아닌...
---

## Table of contents

## 들어가며

최근에 집에 안 쓰는 Desktop에 Windows를 밀고, Ubuntu Desktop을 설치했다.  
그래서 거기는 SSH로 접속해서 작업을 하려고 한다.  
그러면 Docker Desktop은 필요가 없으니, Docker Engine을 설치해야 한다.

## Uninstall Old Versions

```zsh
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

## Install Using the Apt Repository

```zsh
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

```zsh
# install the latest version
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

```zsh
# hello-world image pull하고, container로 띄우기
sudo docker run hello-world
```

참고로 docker engine을 upgrade하려면
하기 과정을 다시 입력하면 된다.

```zsh
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

## 참고 문서

<https://docs.docker.com/engine/install/ubuntu/>
