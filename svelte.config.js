import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { h } from 'hastscript';
import { mdsvex } from 'mdsvex';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import remarkEmoji from 'remark-emoji';
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
      remarkPlugins: [[remarkToc, { tight: true }], remarkEmoji],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'append', content: h(null, ['#']) }],
        rehypeExternalLinks,
      ],
      highlight: {
        highlighter(code, lang) {
          const light = highlighter
            .codeToHtml(code, { lang, theme: shikiThemeLight })
            .replace('<pre class="shiki ', '<pre class="shiki shiki-light ')
            .replace(/[{}]/g, (c) => ({ '{': '&#123;', '}': '&#125;' }[c]));
          const dark = highlighter
            .codeToHtml(code, { lang, theme: shikiThemeDark })
            .replace('<pre class="shiki ', '<pre class="shiki shiki-dark ')
            .replace(/[{}]/g, (c) => ({ '{': '&#123;', '}': '&#125;' }[c]));
          return `<div class="shiki-container language-${lang}">${dark}${light}</div>`;
        },
      },
    }),
    vitePreprocess(),
    importAssets(),
  ],

  kit: {
    adapter: adapter(),
  },
};

export default config;
