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
        remotePatterns: [{
          "protocol": "https",
          "hostname": "fg2wsnyw74j1a78y.public.blob.vercel-storage.com",
        }],
        sizes: [640, 828, 1200, 1920, 3840],
        minimumCacheTTL: 300,
        domains: ["hochzeit-jp.vercel.app"],
        formats: ["image/avif", "image/webp"]
      }
    })
  }
};

export default config;
