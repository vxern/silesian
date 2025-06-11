import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit as svelteKit } from '@sveltejs/kit/vite';
import icons from 'unplugin-icons/vite'
import tailwindCss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import packageJson from './package.json';

export default defineConfig({
  plugins: [
    enhancedImages(),
    svelteKit(),
    tailwindCss(),
    paraglideVitePlugin({
      project: './project.inlang',
      outdir: './src/lib/paraglide'
    }),
    icons({ compiler: "svelte" }),
  ],
  define: {
    "import.meta.env.PACKAGE_VERSION": JSON.stringify(packageJson.version),
  },
});
