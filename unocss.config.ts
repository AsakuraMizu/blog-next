import extractorSvelte from '@unocss/extractor-svelte';
import presetAttributify from '@unocss/preset-attributify';
import presetIcons from '@unocss/preset-icons';
import presetUno from '@unocss/preset-uno';
import transformerDirectives from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import { defineConfig } from '@unocss/vite';

export default defineConfig({
  content: {
    pipeline: {
      include: [/\.(vue|svelte|svx|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/],
    },
  },
  extractors: [extractorSvelte],
  presets: [
    presetUno({ dark: 'media' }),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        height: '1.2em',
        width: '1.2em',
        'vertical-align': 'text-bottom',
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
