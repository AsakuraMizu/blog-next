import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { h } from 'hastscript';
import { mdsvex } from 'mdsvex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import remarkGemoji from 'remark-gemoji';
import remarkMath from 'remark-math';
import remarkToc from 'remark-toc';
import { getHighlighter } from 'shiki';
import { importAssets } from 'svelte-preprocess-import-assets';

/** @type{import('shiki').IThemeRegistration}  */
const shikiThemeLight = 'vitesse-light';
/** @type{import('shiki').IThemeRegistration}  */
const shikiThemeDark = 'vitesse-dark';
const highlighter = await getHighlighter({
  themes: [shikiThemeLight, shikiThemeDark],
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  extensions: ['.svelte', '.svx'],
  preprocess: [
    mdsvex({
      remarkPlugins: [remarkGemoji, [remarkToc, { tight: true }], remarkMath],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'append', content: h(null, ['#']) }],
        rehypeExternalLinks,
        rehypeKatex,
      ],
      highlight: {
        highlighter(code, lang) {
          const light = highlighter
            .codeToHtml(code, { lang, theme: shikiThemeLight })
            .replace('<pre class="shiki ', '<pre class="shiki shiki-light ');
          const dark = highlighter
            .codeToHtml(code, { lang, theme: shikiThemeDark })
            .replace('<pre class="shiki ', '<pre class="shiki shiki-dark ');
          return `<div class="shiki-container language-${lang}">${dark}${light}</div>`.replace(
            /[{}]/g,
            (c) => ({ '{': '&#123;', '}': '&#125;' })[c],
          );
        },
      },
    }),
    vitePreprocess(),
    importAssets(),
  ],

  onwarn: (warning, handler) => {
    if (warning.code.startsWith('a11y-')) {
      return;
    }
    handler(warning);
  },
  kit: {
    adapter: adapter(),
  },
};

export default config;
