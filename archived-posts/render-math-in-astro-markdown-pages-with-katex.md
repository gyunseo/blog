---
title: KaTex와 remark-math를 이용해 astro markdown page에서 수식을 렌더링하자.
pubDatetime: 2023-10-02T17:14:00+09:00
featured: false
draft: false
tags:
  - remark
  - Math
  - KaTex
  - Astro
  - markdown
description: rehype-katex와 remark-math package를 프로젝트에 추가하고, 적용하는 과정을 담았습니다.
---

## Table of contents

## 들어가며

컴퓨터네트워크 시험 공부를 astro markdown page에 정리하고, 이를 블로그에 배포하면서 하고 있었다.
그런데 배포한 블로그에 들어가서 post를 보니, 수식이 제대로 렌더링이 안 돼 있었다,
그래서 이를 해결하고자 한다.

## package 설치

현재 내 블로그 프로젝트에 npm package로 하기 명령어에 나와 있는 패키지들을 설치한다.
저 두 패키지가 뭐냐하면은...

- [`remark-math`](https://github.com/remarkjs/remark-math/blob/main/packages/remark-math) — remark plugin to support a math syntax in markdown
- [`rehype-katex`](https://github.com/remarkjs/remark-math/blob/main/packages/rehype-katex) — rehype plugin to render math in HTML with [KaTeX](https://github.com/Khan/KaTeX)
  라고 한다.

```bash
npm install remark-math rehype-katex
```

## `astro.config.mjs` 파일 수정

하기와 같이 수정한다.

`remarkPlugins`에 `remarkMath`를 추가하고, `rehypePlugins`에 `rehypeKatex`를 추가하면 되는 간단한 작업이다.

```js
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import {
  updateImageLinkNode,
  updateLinkNode,
} from "./src/utils/updateMarkdownASTNodeURLValue";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
// https://astro.build/config
export default defineConfig({
  site: "https://gyunseo.com", // replace this with your deployed domain
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      // to support a math syntax in markdown
      remarkMath,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
      // update Markdown ImageLink Node URL Value,
      updateImageLinkNode,
      // convert Markdown Link Node URL Value,
      updateLinkNode,
    ],
    // to render math in HTML with KaTex
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
});
```

## `Layout.astro`에 KaTex stylesheet 추가하기

`head` tag 안에 하기 코드를 추가하자.

```html
<head>
  <!-- Katex -->
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"
    integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn"
    crossorigin="anonymous"
  />
</head>
```

## 결과

잘 나온다.

![](https://res.cloudinary.com/gyunseo-blog/image/upload/v1698669625/render-math-in-astro-markdown-pages-with-katex-1696235073061.jpeg)

## 참고 문서

- <https://ileumas.com/writing/2022/03/astro-math-katex/>
- <https://github.com/remarkjs/remark-math>
- <https://katex.org/docs/browser#loading-as-global>
