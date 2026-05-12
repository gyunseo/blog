---
author: Gyunseo Lee
title: Hammerspoon을 이용하여, Neovim Normal Mode 진입 시, 영문 키보드로 전환하기
pubDatetime: 2024-01-27T18:14:00+09:00
modDatetime: 2024-01-27T18:14:00+09:00
featured: false
draft: false
tags:
  - neovim
  - MacOS
description: Hammerspoon이라는 프로그램을 처음 알았다 😮
---

## Table of contents

## 들어가며

이 포스트는 MacOS 기준으로 설명합니다.  
Windows나 Linux는 딴 방법을 이용해야 될 거예요...😅

## `Hammerspoon` program 설치하기

```zsh
brew install hammerspoon --cask
```

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1706347258/image_cgvtys.png)

## config file을 수정하기

`Hammerspoon`의 기본 config file은 `~/.hammerspoon/init.lua`에 위치합니다.  
terminal에서 `mkdir ~/.hammerspoon && touch init.lua && nvim init.lua`를 해서 설정 파일을 만들고, 수정할 수 있지만요.  
너무 번거롭기 때문에, MacOS 우측 상단의 메뉴 막대에서 망치 모양의 아이콘을 찾아서, 누른 다음에 나오는 dropdown에서 Open Config를 누르면, MacOS 기본 에디터로 설정 파일을 만들어서 편집을 할 수 있게 열어 줍니다.(저의 경우는 vscode입니다.)
![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1706348415/image_ol1bkx.png)

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1706348402/image_lpyoxj.png)

## 하기 코드를 `~/.hammerspoon/init.lua` 파일에 붙여 넣기

```lua
-- key mapping for vim
-- Convert input soruce as English and sends 'escape' if inputSource is not English.
-- Sends 'escape' if inputSource is English.
-- key bindding reference --> https://www.hammerspoon.org/docs/hs.hotkey.html
local inputEnglish = "com.apple.keylayout.ABC"
local esc_bind

function convert_to_eng_with_esc()
	local inputSource = hs.keycodes.currentSourceID()
	if not (inputSource == inputEnglish) then
		hs.eventtap.keyStroke({}, 'right')
		hs.keycodes.currentSourceID(inputEnglish)
	end
	esc_bind:disable()
	hs.eventtap.keyStroke({}, 'escape')
	esc_bind:enable()
end

esc_bind = hs.hotkey.new({}, 'escape', convert_to_eng_with_esc):enable()
```

상기 소스 코드는 <https://humblego.tistory.com/10> 블로그 포스트에서 가져왔습니다.(감사합니다 🙏)

## Dropdown에서 Reload Config 클릭

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1706348402/image_lpyoxj.png)
Reload Config를 누르고, config file 내용이 잘 적용됐는지 확인해 보시면 됩니다. 🙂

## 마치며

![](https://res.cloudinary.com/gyunseo-blog/image/upload/f_auto/v1706350178/screen_record_xvdwnq.gif)

상기 gif처럼, 처음에 한글 자판으로 세팅이 돼 있어도 `escape`(`esc`)를 누르면 알아서, 영문 자판으로 바뀌어서, 영문 입력이 잘 되는 것을 볼 수 있습니다. 😄

## 참고 문서

- <https://humblego.tistory.com/10>
