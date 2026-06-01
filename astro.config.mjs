// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './site-url.mjs';

// Hosting often sets SITE without www; force the canonical origin for builds.
process.env.SITE = SITE_URL;

function toCanonicalSiteUrl(url) {
  const parsed = new URL(url);
  parsed.protocol = 'https:';
  parsed.hostname = 'www.zinxcasino.ro';
  return parsed.href;
}

export default defineConfig({
  site: SITE_URL,
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      serialize(item) {
        return { ...item, url: toCanonicalSiteUrl(item.url) };
      },
    }),
  ],
  output: 'static',
});
