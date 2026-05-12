import { defineConfig, envField, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
  site: "https://gyunseo.com", // replace this with your deployed domain
  integrations: [
    sitemap({
      filter: page => SITE.showArchives || !page.endsWith("/archives"),
    }),
  ],
  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkToc,
      // to support a math syntax in markdown
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    // to render math in HTML with KaTex
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    // eslint-disable-next-line
    // @ts-ignore
    // This will be fixed in Astro 6 with Vite 7 support
    // See: https://github.com/withastro/astro/issues/14030
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  experimental: {
    preserveScriptOrder: true,
    fonts: [
      {
        name: "Google Sans Code",
        cssVariable: "--font-google-sans-code",
        provider: "local",
        fallbacks: ["monospace"],
        variants: [
          {
            src: ["./src/assets/fonts/google-sans-code-v17-latin-300.woff2"],
            weight: 300,
            style: "normal",
            unicodeRange: ["U+0020-007E", "U+00A0-00FF"],
          },
          {
            src: [
              "./src/assets/fonts/google-sans-code-v17-latin-300italic.woff2",
            ],
            weight: 300,
            style: "italic",
            unicodeRange: ["U+0020-007E", "U+00A0-00FF"],
          },
          {
            src: [
              "./src/assets/fonts/google-sans-code-v17-latin-regular.woff2",
            ],
            weight: 400,
            style: "normal",
            unicodeRange: ["U+0020-007E", "U+00A0-00FF"],
          },
          {
            src: ["./src/assets/fonts/google-sans-code-v17-latin-italic.woff2"],
            weight: 400,
            style: "italic",
            unicodeRange: ["U+0020-007E", "U+00A0-00FF"],
          },
          {
            src: ["./src/assets/fonts/google-sans-code-v17-latin-500.woff2"],
            weight: 500,
            style: "normal",
            unicodeRange: ["U+0020-007E", "U+00A0-00FF"],
          },
          {
            src: [
              "./src/assets/fonts/google-sans-code-v17-latin-500italic.woff2",
            ],
            weight: 500,
            style: "italic",
            unicodeRange: ["U+0020-007E", "U+00A0-00FF"],
          },
          {
            src: ["./src/assets/fonts/google-sans-code-v17-latin-600.woff2"],
            weight: 600,
            style: "normal",
            unicodeRange: ["U+0020-007E", "U+00A0-00FF"],
          },
          {
            src: [
              "./src/assets/fonts/google-sans-code-v17-latin-600italic.woff2",
            ],
            weight: 600,
            style: "italic",
            unicodeRange: ["U+0020-007E", "U+00A0-00FF"],
          },
          {
            src: ["./src/assets/fonts/google-sans-code-v17-latin-700.woff2"],
            weight: 700,
            style: "normal",
            unicodeRange: ["U+0020-007E", "U+00A0-00FF"],
          },
          {
            src: [
              "./src/assets/fonts/google-sans-code-v17-latin-700italic.woff2",
            ],
            weight: 700,
            style: "italic",
            unicodeRange: ["U+0020-007E", "U+00A0-00FF"],
          },
        ],
      },
      {
        name: "IBM Plex Sans KR",
        cssVariable: "--font-ibm-plex-sans-kr",
        provider: fontProviders.google(),
        fallbacks: ["sans-serif"],
        weights: [300, 400, 500, 600, 700],
        styles: ["normal"],
      },
      {
        name: "Nanum Gothic Coding",
        cssVariable: "--font-nanum-gothic-coding",
        provider: "local",
        fallbacks: ["monospace"],
        variants: [
          {
            src: [
              "./src/assets/fonts/nanum-gothic-coding-v27-korean_latin-regular.woff2",
            ],
            weight: 400,
            style: "normal",
            unicodeRange: [
              "U+AC00-D7AF",
              "U+1100-11FF",
              "U+3130-318F",
              "U+3000-303F",
              "U+FF00-FFEF",
            ],
          },
          {
            src: [
              "./src/assets/fonts/nanum-gothic-coding-v27-korean_latin-700.woff2",
            ],
            weight: 700,
            style: "normal",
            unicodeRange: [
              "U+AC00-D7AF",
              "U+1100-11FF",
              "U+3130-318F",
              "U+3000-303F",
              "U+FF00-FFEF",
            ],
          },
        ],
      },
    ],
  },
});
