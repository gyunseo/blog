---
title: Aqua를 이용해 Ubuntu에 neovim을 설치하자
pubDatetime: 2023-12-17T17:01:00+09:00
featured: false
draft: false
tags:
  - Aqua
  - neovim
  - WSL
  - Ubuntu
description: neovim binary 새 버전이 release 되면 제때 업데이트 해주는 aqua를 이용하자
---

## Table of contents

## 들어가며

[Ubuntu Linux에 neovim appimage 설치하기](install-neovim-appimage-on-ubuntu.md)에서 appimage를 다운 받아서, neovim을 설치를 했었다.  
하지만 그러면 neovim이 새로 나오면, 업데이트를 직접해 줘야 한다.  
그래서 비록 programming language runtime version manager로 써먹을 수는 없는, `aqua`이지만, cli program version manager로 요긴하게 써먹어 볼 생각이다.  
programming language runtime version manager로 써먹을 수 없는 이유는 [Aqua를 이용하여 rutnime version을 관리하자](manage-cli-program-version-using-aqua-proj-on-windows.md) post를 읽어 보자.

## `aqua` 설치

```zsh
curl -sSfL -O https://raw.githubusercontent.com/aquaproj/aqua-installer/v3.0.1/aqua-installer
echo "fb4b3b7d026e5aba1fc478c268e8fbd653e01404c8a8c6284fdba88ae62eda6a  aqua-installer" | sha256sum -c
chmod +x aqua-installer
./aqua-installer
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702800323/image_etncon.png)

`aqua` binary 경로를 `PATH` 환경 변수에 추가해 달라니 추가해 주자.

```zsh
vi ~/.zshrc
```

하기 명령어를 `~/.zshrc` 끝에 추가

```zsh
export PATH=${AQUA_ROOT_DIR:-${XDG_DATA_HOME:-$HOME/.local/share}/aquaproj-aqua}/bin:$PATH
```

```zsh
source ~/.zshrc
```

## Install tools globally

```zsh
mkdir -p "${XDG_CONFIG_HOME:-$HOME/.config}/aquaproj-aqua"
vi "${XDG_CONFIG_HOME:-$HOME/.config}/aquaproj-aqua/aqua.yaml"
export AQUA_GLOBAL_CONFIG=${AQUA_GLOBAL_CONFIG:-}:${XDG_CONFIG_HOME:-$HOME/.config}/aquaproj-aqua/aqua.yaml
```

그러면
`~/.config/aquaproj-aqua/aqua.yaml` file을 수정하는 vi 창이 뜰 것이다.  
![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702800454/image_vuvrvy.png)

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
  - name: neovim/neovim@stable
```

상기와 같이 작성해 주자.
그리고 `cd ~`를 하여 `$HOME`으로 돌아와, `aqua i -a`를 하여, global로 neovim을 install하자.
그리고
`export AQUA_GLOBAL_CONFIG=${AQUA_GLOBAL_CONFIG:-}:${XDG_CONFIG_HOME:-$HOME/.config}/aquaproj-aqua/aqua.yaml` 명령어가 shell에 영구히 적용이 안됐으므로, `~/.zshrc` 에 적용을 해준다.

```zsh
vi ~/.zshrc
```

```zsh
export AQUA_GLOBAL_CONFIG=${AQUA_GLOBAL_CONFIG:-}:${XDG_CONFIG_HOME:-$HOME/.config}/aquaproj-aqua/aqua.yaml
```

상기 명령어를 `~/.zshrc` 맨 마지막에 추가한다.

## `nvim` command 실행 오류

띠요옹~ 그런데 `nvim` command가 먹지를 않는다.  
![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702800998/image_xae4fs.png)
갑자기 왜 Windows `nvim`을 찾는 거지?  
혹시나 싶어서, WSL `$PATH`를 봤더니, 아니나 다를까 역시...

```zsh
:/mnt/c/Users/rbstj/AppData/Local/aquaproj-aqua/bat:/mnt/c/Users/rbstj/AppData/Local/aquaproj-aqua/bin
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702801045/image_vrysie.png)
그래서 `:/mnt/c/Users/rbstj/AppData/Local/aquaproj-aqua/bat:/mnt/c/Users/rbstj/AppData/Local/aquaproj-aqua/bin`를 삭제해 줘야 한다.

```
export PATH=$(REMOVE_PART="/mnt/c/Users/rbstj/AppData/Local/aquaproj-aqua/bat:/mnt/c/Users/rbstj/AppData/Local/aquaproj-aqua/bin" sh -c 'echo ":$PATH:" | sed "s@:$REMOVE_PART:@:@g;s@^:\(.*\):\$@\1@"')
```

상기 스크립트로 Windows `aqua` 경로를 삭제해 주자.  
그리고 해당 스크립트를 `~/.zshrc`에 마지막에 추가해 주자.  
그리고 이것 때문에 뭔가 꼬인 것 같으니, `aqua` binary가 있는 aqua root direcotyr와 `.config/aquaproj-aqua` directory를 모두 삭제해주자.  
그리고 상기 과정을 다시 해주면 잘 실행이 된다.

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1702802717/image_df0jfu.png)

## `registries`와 `package` update

```zsh
cd ~/.config/aquaproj-aqua/
aqua update
```

그러면 하기와 같은 로그가 뜨면서 update가 된다.

```zsh
INFO[0000] updating a package                            aqua_version=2.21.3 env=linux/amd64 new_version=v0.9.4 old_version=stable package_name=neovim/neovim program=aqua
INFO[0000] updating a registry                           aqua_version=2.21.3 env=linux/amd64 new_version=v4.110.0 old_version=v4.104.0 program=aqua registry_name=standard
```

## 참고 문서

- <https://aquaproj.github.io/docs/products/aqua-installer#shell-script>
- <https://aquaproj.github.io/docs/tutorial/global-config>
- <https://aquaproj.github.io/docs/reference/uninstall>
