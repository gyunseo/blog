---
title: vscode에 neovim extension 설치하기
postSlug: install-neovim-extension-on-vscode
pubDatetime: 2023-09-28T01:15:00+09:00
modDatetime: 2024-02-08T10:40:00+09:00
featured: false
draft: false
tags:
  - vscode
  - neovim
  - vim
  - extension
description: vscode에 neovim extension 설치 과정을 담았습니다. 🧑🏻‍💻
---

## 들어가며

이전에 vscode에 vim extension을 깔아서 잠깐 사용했었던 적이 있었습니다.
하지만 한글 입력가 문제가 생각보다 불편했어서, 금방 삭제했던 기억이 있습니다.
그런데 웹서핑을 좀 해보니, vscode에 neovim extension을 붙여서 쓰면 생각보다 쓸 만하다고 하네요😅.
그리고 Chrome에서도 extension으로 vimium을 써보니 편하기도 했고, 코딩할 때 마우스에 손을 갖다 대지 않고, 키보드로만 코딩을 한다면 조금 더 딴 짓을 안 하고 코딩에 집중할 수 있지 않을까라는 막연한(?) 기대감이 있기도 합니다.
그래서 그 과정을 담은 포스트를 작성하려고 합니다.
Windows와 MacOS 둘 다 과정이 포함돼 있습니다.

## Windows에 neovim 설치

```powershell
winget install Neovim.Neovim
```

Powershell Core에서 상기 커맨드를 입력해 `winget`으로 neovim을 설치해 줍니다.

## `nvim` binary 환경변수에 등록

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-neovim-extension-on-vscode-1695832925388.jpeg)

상기 이미지와 같이 환경 변수를 클릭합니다.

시스템 변수 `PATH`에 `nvim` binary가 위치한 directory path를 추가합니다.
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-neovim-extension-on-vscode-1695833078369.jpeg)
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-neovim-extension-on-vscode-1695833307604.jpeg)
상기 이미지와 같이 하면 됩니다.

## vscode에서 neovim executable paths 등록

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-neovim-extension-on-vscode-1695833833572.jpeg)

vscode settings에서 상기 그림과 같이 neovim executable paths를 등록합니다.

Windows의 경우: `C:\Program Files\Neovim\bin\nvim.exe`
Linux의 경우: `/usr/bin/nvim (apt package manager로 설치했을 경우, 필자는 직접 다운 받아서 경로가 다름)` (WSL의 경우, 마지막 Use WSL을 체크해 주면 됩니다.)

## `init.vim` 설정하기

neovim `init.vim`이라는 설정 파일을 사용합니다.
`nvim.exe`를 실행하고, `:echo stdpath("config")`를 입력하여, Windows에서 `init.vim` path를 확인합니다.

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-neovim-extension-on-vscode-1695877500411.jpeg)
![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-neovim-extension-on-vscode-1695877517915.jpeg)

`C:\Users\[사용자 이름]\AppData\Local\nvim`으로 나오는 것을 볼 수 있습니다.
해당 directory에 `init.vim` 파일을 만들고, 하기와 같이 작성합니다.

```vim
if exists('g:vscode')
    " VSCode extension
else
    " ordinary Neovim
endif
```

위와 같이 하는 이유는 VIM 플러그인들이 VSCode에서 문제를 일으킬 수 있기 때문에, 조건부로 Plugin을 활성화하려고 하는 것입니다.

## `im-select` 설치 및 `init.vim` 설정

Shell에서 input method를 바꿔주는 [im-select](https://github.com/daipeihust/im-select)라는 프로그램이 있습니다.
이를 이용해서, insert mode를 떠날 때, `im-select 1033` 명령어를 실행하게 하여 normal mode에서는 Windows 상에서 Locale 번호가 1033인 US Keyboard를 사용하게 하도록합니다.
`im-select.exe` windows binary를 다운 받고, `C:\im-select\im-select.exe`에 저장합니다.
그리고 `init.vim`을 하기와 같이 편집합니다.

```vim
autocmd InsertLeave * : silent !C:\\im-select\\im-select.exe 1033
if exists('g:vscode')
    " VSCode extension

else
    " ordinary Neovim
endif
```

## vscode settings에서 `init.vim` path 설정

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/install-neovim-extension-on-vscode-1695879355411.jpeg)
vscode에서 상기 이미지와 같이 `init.vim` path를 설정합니다.

## MacOS에서 `neovim` 설치하기

MacOS의 유명한 package manager인 Homebrew를 이용해, `neovim`을 설치해 줍시다.

```zsh
brew install neovim
```

## `nvim` 실행 경로 확인하기

```zsh
which nvim
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1706372513/image_ghvtdt.png)
그러면 위의 이미지처럼 `nvim` 커맨드의 실행 경로가 나옵니다.

## vscode에서 neovim executable paths 등록

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1706372746/image_nm9rry.png)

위 그림처럼 `nvim` 커맨드의 경로를 설정해주면 됩니다.

## `init.lua` 설정

```zsh
if vim.g.vscode then

  -- https://github.com/vscode-neovim/vscode-neovim/issues/298
  vim.opt.clipboard:append("unnamedplus")
end
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", -- latest stable release
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

require("vim-options")
require("lazy").setup("plugins")


```

vscode neovim extension setting에서 하기와 같이 경로를 설정정합니다.  
`~/.config/nvim/init.lua`가 neovim configure file의 entry file이므로, 경로 설정을 다음과 같이 하면 됩니다.  
![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1706380752/image_jh72tf.png)
`:set clipboard?`로 잘 설정이 됐는지 확인해 볼 수 있습니다.  
![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1706380708/image_mcfgnk.png)
![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1706380719/image_c7rszu.png)

## 마치며

MacOS에서는 `h`, `j`, `k`, `l` 이동 키가 계속 눌릴 때는 반복되지 않을 수 있습니다.  
이 문제를 해결하려면 터미널을 열고 `defaults write com.microsoft.vscode applepressandholdenabled -bool false` 명령을 실행해야 합다.  
![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1706375235/image_oxhhlw.png)

## 참고 문서

<https://github.com/vscode-neovim/vscode-neovim/issues/68>
