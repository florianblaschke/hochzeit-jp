import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      images: {
        sizes: [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        minimumCacheTTL: 60,
        domains: ["https://fg2wsnyw74j1a78y.public.blob.vercel-storage.com"],
        formats: ["image/avif", "image/webp"]
      }
    })
  }
};

export default config;
