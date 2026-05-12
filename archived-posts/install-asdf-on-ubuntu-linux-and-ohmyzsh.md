---
title: Ubuntu Linux에 asdf를 설치하고, ohmyzsh에 asdf plugin을 추가하자.
pubDatetime: 2023-10-08T20:30:00+09:00
featured: false
draft: false
tags:
  - Ubuntu
  - Linux
  - ohmyzh
  - asdf
description: zsh의 framework의 세계는 엄청나다.
---

## Table of contents

## 들어가며

`node.js`, `python`, `jdk` 버전을 편하게 통합으로 관리할 수 있는 `asdf`를 Ubuntu Linux에 설치하려고 한다.  
[zsh에 ohmyzsh을 설치하자.](install-ohmyzsh-on-zsh.md)에서 `ohmyzsh` framework에 Theme와 Plugin을 추가했다.  
`asdf`도 `ohmyzsh`에 통합을 할 수 있다고 한다.  
그래서 그 방법을 소개하려고 한다.

## `asdf`를 git clone으로 download하기

```zsh
git clone https://github.com/asdf-vm/asdf.git ~/.asdf
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-asdf-on-ubuntu-linux-and-ohmyzsh-1696765333415.jpeg)

## `asdf` 활성화하기

`~/.zshrc`의 `plugins` 정의에 `asdf`를 추가해, `asdf`를 활성화한다.

```zsh
nvim ~/.zshrc
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-asdf-on-ubuntu-linux-and-ohmyzsh-1696765514519.jpeg)
상기 이미지처럼
`plugins=(asdf)`를 추가한다.
그러면 `asdf`가 `ohmyzsh` framework에 통합이 되어, `asdf`를 사용할 수 있게 된다.

```zsh
asdf --version
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-asdf-on-ubuntu-linux-and-ohmyzsh-1696765667860.jpeg)

## Plugin Dependencies 설치

```zsh
sudo apt-get install -y dirmngr gpg curl gawk
```

본격적으로 `asdf` plugin을 설치하기 전에, plugin 의존성 패키지들을 설치한다.

## `Nodejs` Plugin 설치

하기 명령어로 `nodejs` plugin을 설치한다.

```zsh
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
```

## `Nodejs` Version 설치

하기 명령어로 모든 `node.js` runtime version을 볼 수 있다.

```zsh
asdf list all nodejs
```

원하는 경우 하기 명령어로 특정 version의 subset을 볼 수도 있다.

```zsh
asdf list all nodejs 18
```

필자는 `node.js` lts 버전을 설치할 것이다.
그전에 하기 명령어를 통해, 현재 시점에서 `nodejs` lts version을 확인하자.

```zsh
# Before checking for aliases, update nodebuild to check for newly releasead versions
asdf nodejs update-nodebuild

asdf nodejs resolve lts
# outputs: 18

# Outputs the latest version available for download which is a LTS
asdf nodejs resolve lts --latest-available
# outputs: 18.18.0
```

하기 명령어로 현재 시점에서의 lts version인 18.18.0 version을 설치한다.

```zsh
asdf install nodejs 18.18.0
```

설치가 완료되면 하기 명령어로 `nodejs` runtime version의 list를 확인할 수 있다.

```zsh
asdf list nodejs
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-asdf-on-ubuntu-linux-and-ohmyzsh-1696766814971.jpeg)

## `nodejs` Version 설정하기

`asdf`는 현재 작업 디렉터리부터 `$HOME` 디렉터리까지 모든 `.tool-versions` 파일에서 tool의 버전 조회를 수행합니다.  
`asdf`가 관리하는 tool을 실행할 때, version lookup이 발생합니다.

## `nodejs` Global Version 설정하기

```zsh
asdf global nodejs 18.18.0
```

상기 명령어로 global version을 설정한다.
global defaults는 `$HOME/.tool-versions`에서 관리된다.
그러면 하기 명령어로 global version이 제대로 설정됐는지 확인할 수 있다.

```zsh
cat $HOME/.tool-versions
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-asdf-on-ubuntu-linux-and-ohmyzsh-1696767200085.jpeg)

## `nodejs` Local version 설정하기

18.17.1 version을 설치하고, `gyunseo.github.io` 디렉터리에서 local version으로 18.17.1 version을 설정하자.

```zsh
asdf install nodejs 18.17.1
asdf local nodejs 18.17.1
cat $PWD/.tool-versions
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-asdf-on-ubuntu-linux-and-ohmyzsh-1696767644582.jpeg)

## `python` Plugin 설치

```zsh
asdf plugin-add python
```

## `python` Latest Version 확인

```zsh
asdf latest python
# outputs: 3.12.0
```

## `python` Version 설치

```zsh
# Python version build envrionment를 위한, system dependencies 설치
sudo apt update -y; sudo apt install -y build-essential libssl-dev zlib1g-dev \
libbz2-dev libreadline-dev libsqlite3-dev curl \
libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev
# python version 설치
asdf install python 3.12.0
```

## `python` Global Version 설정

```zsh
asdf global python 3.12.0
cat $HOME/.tool-versions
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-asdf-on-ubuntu-linux-and-ohmyzsh-1696769147862.jpeg)

하기 명령어를 입력하자.

```zsh
python3 --version
# outputs: Python 3.10.12
```

버전이 `asdf` plugin에서 설치했던 것과 다르게 나온다.  
현재 shell session에서 logout했다가, 다시 shell session login하면 된다.

```zsh
python3 -V
# outputs: Python 3.12.0
```

## `python` Local Version 설정

하기 명령어를 입력하자.

```zsh
asdf install python 3.11.6
asdf local python 3.11.6
cat $PWD/.tool-versions
# outputs: python 3.11.6
```

## `java` Plugin 설치

하기 명령어를 입력하여 `java` plugin을 설치하자.

```zsh
asdf plugin-add java https://github.com/halcyon/asdf-java.git
```

하기 명령어로 `java` plugin이 잘 설치됐는지 확인하자.

```zsh
asdf plugin list
# outputs:
# java
# nodejs
```

## `OpenJDK` Vendor 및 Version 확인

필자는 jdk로 ADOPTIUM의 `temurin-17` version을 이용할 것이므로 하기와 같이 명령어를 입력하여 확인한다.

```zsh
asdf list-all java | grep temurin-17
```

그러면 하기와 같은 output이 나온다.

```zsh
temurin-17.0.0+35
temurin-17.0.1+12
temurin-17.0.2+8
temurin-17.0.3+7
temurin-17.0.4+8
temurin-17.0.4+101
temurin-17.0.5+8
temurin-17.0.6+10
temurin-17.0.7+7
temurin-17.0.8+7
temurin-17.0.8+101
temurin-17.0.9+9
```

필자는 여기서 Linux에서 `17 - LTS Version`에 해당하는 `17.09+9`을 설치할 것이다. (하기 링크 참조)  
<https://adoptium.net/temurin/releases/?os=linux&arch=x64&package=jdk&version=17>
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-asdf-on-ubuntu-linux-and-ohmyzsh-1697887610416.jpeg)

## `temurin-17.0.9+9` `JDK` 설치하기

하기 명령어로 `temurin-17.0.9+9` JDK를 설치하자.

```zsh
asdf install java temurin-17.0.9+9
```

하기 명령어로 제대로 설치가 됐는지 확인하자.

```zsh
asdf list java
# outputs: temurin-17.0.9+9
```

## `JDK` Global Version 설정하기

일단은 설치한 `temurin-17.0.9+9`을 메인 `JDK`로 사용할 것이다.  
그래서 `temurin-17.0.9+9` version의 `JDK`를 global로 설정하자.  
하기 명령어를 통해 해당 버전의 `JDK` global `JDK`로 설정하자.

```zsh
asdf global java temurin-17.0.9+9
```

하기 명령어로 해당 버전의 `JDK`가 global로 설정됐는지 확인할 수 있다.

```zsh
cat $HOME/.tool-versions
# outputs:
# nodejs 18.18.2
# java temurin-17.0.9+9
```

## `JDK` Local Version 설정하기

하기 명령어로 `temurin-11`의 latest version을 설치하자.

```zsh
asdf install java latest:temurin-11
```

하기 명령어로 잘 설치가 됐는지 확인하자.

```zsh
asdf list java
```

하기와 같이 output이 나오면 잘 된 것이다.

```zsh
  temurin-11.0.21+9
 *temurin-17.0.9+9
```

하기 명령어로 원하는 directory에서 local `JDK`를 `temurin-11.0.21+9`으로 설정하자.

```zsh
mkdir asdf-java-local-test
cd asdf-java-local-test
asdf local java temurin-11.0.21+9
```

하기 명령어로 제대로 설정이 됐는지 확인하자.

```zsh
cat .tool-versions
# outputs: java temurin-11.0.21+9
java --version
# outputs:
# openjdk 11.0.21 2023-10-17
# OpenJDK Runtime Environment Temurin-11.0.21+9 (build 11.0.21+9)
# OpenJDK 64-Bit Server VM Temurin-11.0.21+9 (build 11.0.21+9, mixed mode)
```

## `JAVA_HOME` 설정

`JAVA_HOME`을 `zsh` initialization에서 설정하려면, 하기 명령어를 `~/.zshrc`에 추가하자.

```zsh
nvim ~/.zshrc
```

하기 명령어를 `~/.zshrc`에 추가하자.

```zsh
. ~/.asdf/plugins/java/set-java-home.zsh
```

`~/.zshrc` 변경 사항을 하기 명령어를 통해 현재 shell session에서 바로 반영하자.

```zsh
source ~/.zshrc
```

하기 명령어로 `JAVA_HOME`이 제대로 설정됐는지 확인하자.
(global `JDK`가 제대로 설정된 것을 확인할 수 있다.)

```zsh
echo $JAVA_HOME
# outputs: /home/gyunseo/.asdf/installs/java/temurin-17.0.9+9
```

그렇다면, 앞에서 만들었던 `asdf-java-local-test`에서 `JAVA_HOME`을 확인해 보자.

```zsh
cd asdf-java-local-test
echo $JAVA_HOME
# outputs: /home/gyunseo/.asdf/installs/java/temurin-11.0.21+9
```

local `JDK`가 `temurin-11.0.21+9`로 잘 설정되었음을 확인할 수 있다.

## macOS `JAVA_HOME` Integration

macOS의 일부 응용 프로그램은 `/usr/libexec/java_home`을 java home 설정에 사용한다.  
`.asdfrc`에서 `java_macos_integration_enable`을 yes로 설정하면 이 통합이 가능해진다.  
`$HOME/.asdfrc`:

```zsh
java_macos_integration_enable=yes
```

## `reshim`

이거는 좀 더 공부해서 적을 예정

## 참고 문서

- <https://asdf-vm.com/guide/getting-started.html>
- <https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/asdf>
- <https://github.com/asdf-vm/asdf-nodejs>
- <https://github.com/asdf-community/asdf-python>
- <https://github.com/halcyon/asdf-java>
- <https://adoptium.net/temurin/releases/?os=linux&arch=x64&package=jdk&version=17>
