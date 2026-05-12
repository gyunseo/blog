---
title: Aqua를 이용하여 Windows에서 rutnime version을 관리하자
pubDatetime: 2023-12-16T20:23:00+09:00
featured: false
draft: false
tags:
  - Aqua
  - Version-Manager
  - Windows
  - Linux
  - WSL
  - Ubuntu
description: 아 이거 node, python 지원 안 함 ㅋㅋ
---

## Table of contents

## 들어가며

Windows에는 Linux와 macOS에서 쓰이는 `asdf`라는 runtime version manager를 사용할 수 없다.  
그래서 이것 저것 서칭을 해 보다가.  
어떤 일본 분이 만드신 `aqua`라는 것을 알아 냈다.  
그래서 이걸로 Windows에서 cli program version managing을 해 보려고 한다.  
(~~아 이거 node, python 그리고 ruby 지원을 안 하네 ㅋㅋ~~)

- <https://zenn.dev/shunsuke_suzuki/books/aqua-handbook/viewer/what-aqua#aqua-%E3%81%AF%E5%85%A8%E3%81%A6%E3%82%92%E4%BB%A3%E6%9B%BF%E3%81%A7%E3%81%8D%E3%82%8B%E3%81%AE%E3%81%8B>  
  상기 링크가 개발자 분이 쓴 블로그 포스트인데 하기와 같은 코멘트가 있다.
  > 特に asdf がサポートしている Python や Ruby, Node.js などは aqua はサポートしていません。

번역하면 asdf가 지원하는 python, ruby, node.js는 aqua가 지원하지 않는다는 내용이다.  
그래도 `go`랑 `bun`은 설치가 되고, 뭔가 복잡한 설정을 하면 `jdk`도 설정이 가능하다! (하기 discussion 참고)

- <https://github.com/orgs/aquaproj/discussions/1481>

필자의 생각은 그냥 Windows면, `nvm-windows`, `pyenv-win`, `jabba`를 사용해서 runtime version managing을 하는 게 좋을 것 같다는 생각이 든다.(하기 포스트 참고)

- [Windows에서 NVM으로 Node 버전 관리하기](manage-node-versions-using-nvm-windows.md)
- [jabba를 이용해 Windows에서 JDK 버전 관리하기](manage-jdks-on-windows-using-jabba)
- [pyenv-win을 이용해 Windows에서 Python Runtime Version 관리하기](manage-python-versions-using-pyenv-win)

## `aqua` 설치

### Download prebuilt binaries from GitHub Releases

- <https://github.com/aquaproj/aqua/releases>

상기 URI로 접속하여, Windows Binary를 다운로드 받는다.

## 환경 변수 `AQUA_ROOT_DIR`, `PATH` 설정

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702727066/image_olpj61.png)

상기 이미지처럼 `$env:LOCALAPPDATA\aquaproj-aqua\` 디렉터리에 `bat` 폴더와 `bin` 파일을 만들어 놓는다.  
그리고 하기 사진처럼 `bin\` 디렉터리에 다운로드 받아 놓았던 Windwos `aqua` binary를 복사해 놓는다.  
![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702727443/image_dnl4fw.png)

그리고 `Powershell`에 Administrator 권한 session으로 접속한다.

```powershell
[System.Environment]::SetEnvironmentVariable("AQUA_ROOT_DIR", "$env:LOCALAPPDATA\aquaproj-aqua", [System.EnvironmentVariableTarget]::Machine)
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702727944/image_aawcez.png)

상기 이미지처럼 입력을 한다.  
`PowerToys`에 들어가서 확인하니, 잘 바뀐 것을 알 수 있다.  
![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702727960/image_pezbp6.png)

그 다음 다시 일반 `User` Session으로 `Powershell`에 접속을 하고, 하기 명령어를 입력한다.

```powershell
Set-Item Env:Path "$Env:AQUA_ROOT_DIR\bat;$Env:AQUA_ROOT_DIR\bin;$ENV:Path"
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702728014/image_syi9vb.png)

상기 이미지처럼 잘 환경 변수 `PATH`가 설정된 것을 알 수 있다.  
그런데 이렇게 설정을 하면 Powershell Session이 종료되면, 다시 `$env:PATH` 값은 초기화 된다.  
세션을 종료했다가, 다시 접속하면 하기 이미지처럼 다시 `$env:PATH` 값이 초기화 된 것을 알 수 있다.  
![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702729284/image_losnm8.png)

그래서 초기화 되지 않게 하려면, **Administrator** 권한으로 Powershell에 접속하여, 하기 script를 입력한다.

```powershell
$envPath = [System.Environment]::GetEnvironmentVariable("Path", [System.EnvironmentVariableTarget]::Machine)
$newPath = "$Env:AQUA_ROOT_DIR\bat;$Env:AQUA_ROOT_DIR\bin;$envPath"
[System.Environment]::SetEnvironmentVariable("Path", $newPath, [System.EnvironmentVariableTarget]::Machine)
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702729408/image_gb9qpw.png)
![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702729416/image_idw76o.png)
그러면 상기 이미지 처럼 잘 변한 것을 확인할 수 있다.  
다시 일반 User Session으로 Powershell에 접속하여, `$env:PATH`가 잘 설정됐는지 확인해 보자.

```powershell
echo $env:PATH | findstr aquaproj-aqua
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702729540/image_sfhbto.png)
(잘 나오네 ㅎㅎ)

## 환경 변수 `AQUA_GLOBAL_CONFIG` 설정

하기 이미지처럼 `$HOME` 디렉터리에 `.config` 디렉터리를 생성한다.  
![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702730263/image_bzjsee.png)

그리고 `.config` 디렉터리 안에 `aquaproj-aqua` 디렉터리를 생성하고, `aqua.yml` 파일을 생성한다.  
![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702732298/image_iz9xye.png)

`$env:LOCALAPPDATA\aquaproj-aqua\aqua.yaml`:

```yaml
---
# aqua - Declarative CLI Version Manager
# https://aquaproj.github.io/
# checksum:
#   enabled: true
#   require_checksum: true
#   supported_envs:
#   - all
registries:
  - type: standard
    ref: v4.104.0 # renovate: depName=aquaproj/aqua-registry
packages:
  - name: cli/cli@v2.40.1
```

그리고 User Session을 끊고, **Administrator** Session으로 Powershell에 접속한다.

```powershell
$envAquaGlobalConfig = [System.Environment]::GetEnvironmentVariable("AQUA_GLOBAL_CONFIG", [System.EnvironmentVariableTarget]::Machine)
$newAquaGlobalConfig = "$env:LOCALAPPDATA\aquaproj-aqua\aqua.yaml;$envAquaGlobalConfig"
[System.Environment]::SetEnvironmentVariable("AQUA_GLOBAL_CONFIG", $newAquaGlobalConfig, [System.EnvironmentVariableTarget]::Machine)
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702737133/image_zzbqeu.png)

상기 이미지처럼 환경 변수 `AQUA_GLOBAL_CONFIG`가 잘 설정된 것을 알 수 있다.

Administrator Session을 끊고 나와서, 다시 User Session으로 Powershell에 접속하여
`gh version`을 입력하면 global로 설치가 되어, command가 잘 먹는 것을 알 수 있다.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702737347/image_jrvlx4.png)

## 마치며

[들어가며](#들어가며)에도 써 놨지만, `node.js`, `python3`, `ruby` 와 같은 runtime 지원이 없다.  
그래서 이 글에서 예시로 보여준 `gh` command 말고도, `neovim` version 관리로 쓰고 있다.

## 참고 문서

- <https://aquaproj.github.io/docs/install#download-prebuilt-binaries-from-github-releases>
- <https://aquaproj.github.io/docs/tutorial/global-config>
- <https://zenn.dev/shunsuke_suzuki/books/aqua-handbook/viewer/what-aqua#aqua-%E3%81%AF%E5%85%A8%E3%81%A6%E3%82%92%E4%BB%A3%E6%9B%BF%E3%81%A7%E3%81%8D%E3%82%8B%E3%81%AE%E3%81%8B>
