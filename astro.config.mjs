// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import terser from '@rollup/plugin-terser';

export default defineConfig({
  integrations: [svelte()],
  vite: {
    build: {
      rollupOptions: {
        plugins: [terser({ compress: { drop_console: true, drop_debugger: true } })]
      }
    }
  }
});
