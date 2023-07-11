/// <reference types="vitest" />
import { sveltekit } from '@sveltejs/kit/vite';
import unocss from '@unocss/vite';
import nested from 'postcss-nested';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [unocss(), sveltekit(), imagetools()],
  test: {
    environment: 'jsdom',
  },
  css: {
    postcss: {
      plugins: [nested()],
    },
  },
});
