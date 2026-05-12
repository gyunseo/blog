---
title: Neovim 설정하기
author: Gyunseo Lee
pubDatetime: 2024-01-23T22:33:00+09:00
modDatetime: 2024-01-23T22:33:00+09:00
featured: false
draft: false
tags:
  - neovim
  - zsh
  - MacOS
description: 조금 복잡하지만 하고 나면 뭔가 뿌듯...?!
---

## Table of contents

## 들어가며

최근에 맥북 프로 💻🍎를 구입했습니다. 😀(행복)
그래서 이것 저것 세팅을 했는데요.  
아무래도 Windows랑 달리, MacOS는 UNIX이고, 또 기본 터미널이 Zsh이기도 하여서, 이참에 Neovim으로 개발환경 설정을 하면 좋을 것 같아서 설정을 하려고 합니다.
참고로, Windows에서도 WSL2 Linux를 이용하면, 거의 비슷한 과정으로 neovim 설정이 가능합니다!

## `neovim` 설치하기

MacOS의 대표적인 Package Manager인 Homebrew 🍺를 이용해, `neovim`을 설치해 줍시다.

```zsh
brew install neovim
```

그러면 이제 터미널에서 `nvim` command를 통해, neovim 프로그램 실행이 가능해 집니다.(하기 이미지 참고)

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1706017235/image_i80h4j.png)
![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1706017251/image_ffdkeq.png)

## `init.lua` file 만들기

Neovim은 구성 파일로 `init.vim` 또는 `init.lua`를 사용 지원을 하지만, 동시에 두 가지를 모두 지원하지는 않습니다.  
이는 일반적으로 Linux, BSD, macOS 및 Windows용 구성 디렉터리에 있어야 합니다.  
`init.vim`에서 Lua를 사용할 수 있고, 반대로 `init.lua`에서는 Vimscript를 사용할 수 있습니다.

- Linux, BSD, MacOS의 구성 directory: `~/.config/nvim`
- Windows의 구성 directory: `~/AppData/Local/nvim/`
- configuration file 이름: `init.vim` 혹은 `init.lua`

저희는 여기서 `~/.config/nvim`를 configuration directory로, `init.lua`를 configuration file로 사용할 겁니다.  
그러면 configuration directory와 configuration file이 있는지를 먼저 확인해야 겠죠?✅  
하기 명령어를 입력해 봅시다.

```zsh
ls ~/.config/nvim/init.lua
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1706019638/image_v2edi3.png)
위 이미지처럼 구성 디렉터리와 구성 파일이 잘 있는 것이 확인이 됐다면, `nvim ~/.config/nvim/init.lua` 커맨드로 구성 파일을 편집해 줍시다. 📝  
(구성 디렉터리와 구성 파일이 없다면, `mkdir`과 `touch` 커맨드로 적당히 만들면 되겠죠? `mkdir ~/.config/nvim && touch ~/.config/nvim/init.lua`)

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1706020493/image_fmr7cd.png)
![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1706020540/image_yjsj9x.png)
위의 이미지처럼 `init.lua`를 편집해 줍시다. 📝

```lua
vim.cmd("set expandtab")
vim.cmd("set tabstop=2")
vim.cmd("set softtabstop=2")
vim.cmd("set shiftwidth=2")
vim.api.nvim_set_option("clipboard","unnamed")
```

`:source %` 커맨드를 실행하여, 편집 중인 `init.lua` script를 실행해주면 됩니다.  
(참고로, `vim.api.nvim_set_option("clipboard","unnamed")` 는 OS의 Clipboard를 사용하기 위해 넣은 것입니다.)

## `lazy.vim`을 package manager로 설치하기

```lua
vim.cmd("set expandtab")
vim.cmd("set tabstop=2")
vim.cmd("set softtabstop=2")
vim.cmd("set shiftwidth=2")
vim.api.nvim_set_option("clipboard","unnamed")
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
local plugins = {}
local opts = {}
require("lazy").setup(plugins, opts)
```

`:source %`, `:Lazy`
![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1706022623/image_ojfqlx.png)

## `telescope` 설치하기

dependency 설치:

```zsh
brew install ripgrep
```

neovim에 `telescope` package를 설치하기 전에, 일단 MacOS에 `ripgrep`이라는 프로그램을 설치 합시다.(이게 없으면 livegrep이 안돼요...😨)

- <https://neovim.io/doc/user/lua-guide.html#lua-guide-config>
- <https://github.com/folke/lazy.nvim?tab=readme-ov-file#-installation>
- <https://www.reddit.com/r/neovim/comments/3fricd/comment/i1mnu1a/?utm_source=share&utm_medium=web2x&context=3>
