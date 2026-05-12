---
title: pyenv-win을 이용해 Windows에서 Python Runtime Version 관리하기
pubDatetime: 2023-10-22T17:26:00+09:00
featured: false
draft: false
tags:
  - Python
  - Windows
description: windows에서 python runtime version을 manage하자...
---

## Table of contents

## 들어가며

windows local에서 python을 돌릴 때 주로 WSL2를 쓰긴하지만, 혹시 몰라서 설정을 해둔다.

## Installation

```powershell
Invoke-WebRequest -UseBasicParsing -Uri "https://raw.githubusercontent.com/pyenv-win/pyenv-win/master/pyenv-win/install-pyenv-win.ps1" -OutFile "./install-pyenv-win.ps1"; &"./install-pyenv-win.ps1"
```

Powershell 종료 후, 다시 Powershell 열기.  
하기 명령어로 `pyenv-win`이 제대로 설치됐는지 확인하자.

```powershell
pyenv --version
# outputs: pyenv 3.1.1
```

## Python Runtime Versions 확인하기

하기 명령어로 python runtime version들을 확인하자.

```powershell
pyenv install -l
```

## Python Runtime Version Install

하기 명령어로 원하는 python runtime versione들을 install하자.

```powershell
pyenv install 3.12.0
pyenv install 3.11.6
```

하기 명령어로 제대로 python runtime version들이 설치됐는지 확인하자.

```powershell
pyenv versions
# outputs:
# 3.11.6
# 3.12.0
```

## 설치된 Python Runtime Version을 Global Runtime Version으로 설정하기

```powershell
pyenv global 3.12.0
python3 --version
# outputs: Python 3.12.0
```

## 설치된 Python Rutime Version을 Local Runtime Version으로 설정하기

```powershell
pyenv local 3.11.6
```

## 참고 문서

- <https://github.com/pyenv-win/pyenv-win>
