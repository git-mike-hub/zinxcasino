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
  if (parsed.pathname !== '/' && parsed.pathname.endsWith('/')) {
    parsed.pathname = parsed.pathname.slice(0, -1);
  }
  return parsed.href;
}

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        return { ...item, url: toCanonicalSiteUrl(item.url) };
      },
    }),
  ],
  output: 'static',
});
