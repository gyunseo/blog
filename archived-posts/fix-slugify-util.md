---
title: Astro Paper의 slugify를 내 입맛에 맞게 수정하다.
pubDatetime: 2023-09-29T01:50:00+09:00
featured: false
draft: false
tags:
  - slug
  - test
  - Astro
description: slugify.ts를 수정하고, 관련된 코드를 수정한 과정을 담았습니다.
---

## Table of contents

## 들어가며

Astro Paper를 사용하면서, 몇 가지 아쉬운 점이 있었다.
그 중 하나는 markdown link syntax와의 호환성이었다.
잉? 그게 무슨 말임? 이라고 할 수 있는데, 한 가지 예를 들어 보겠다.
markdown으로 post를 작성할 때, 이미 작성해 두었던 다른 markdown post를 link하는 경우가 있다.
하기 markdown 문서 예를 보면서 이해해 보자.

```markdown
%% md로 블로그 post 작성 중... %%
[딴 포스트](딴-포스트.md)
```

그러면 `Obsidian`이나 `VSCode`와 같은 markdown editor에서는 `딴 포스트`를 누르면, 해당 markdown 문서로 이동을 하게 된다.
그런데, astro paper에서는 post slug를 markdown의 frontmatter에 딸린 title 값을 slugified한 걸 default로 박아 두어서, `/posts/딴-포스트` url로 redirect되지 않는다. (여기서 의문이 들 수도 있다. 엥? 님이 url로 쓴 거는 `딴-포스트.md` 아님? `.md`는 어디다 팔아 먹고 오셨죠? 이에 대한 대답은 [markdown AST node url 값 변경하기](../src/data/blog/update-markdown-ast-node-url-value.md)에 있다.)
그래서 astro paper를 살짝 마개조(?)하는 느낌으로 해서, default post slug를 markdown filename이 slugified된 걸로 바꿔 보려 한다.

## `/src/utils/slugify.ts` 코드 수정하기

## 관련된 코드 모두 수정하기

## 참고 문서
