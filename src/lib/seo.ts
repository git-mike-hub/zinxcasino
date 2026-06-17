import { SITE_URL } from '../../site-url.mjs';

export { SITE_URL };
export const SITE_NAME = 'Zinx Casino România';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/zinx-casino-banner-desktop.webp`;
export const ORGANIZATION_URL = 'https://zinx.ro';
export const ORGANIZATION_ID = `${ORGANIZATION_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function normalizePath(path: string): string {
  if (/\.[a-z0-9]+$/i.test(path)) return path;
  const trimmed = path.replace(/\/+$/, '');
  return trimmed || '/';
}

export function absoluteUrl(path: string): string {
  return new URL(normalizePath(path), SITE_URL).href;
}

export function buildOrganization() {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'Zinx Casino',
    alternateName: 'Zinx Casino România',
    url: ORGANIZATION_URL,
    logo: absoluteUrl('/images/logos/zinx-logo.svg'),
    sameAs: [
      'https://www.wikidata.org/wiki/Q140069633',
      'https://www.instagram.com/zinxsocial',
      'https://www.facebook.com/zinxofficial',
      'https://www.youtube.com/@ZinxCasino',
    ],
  };
}

export function buildWebSite() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: 'Zinx Casino',
    alternateName: 'Zinx Casino România',
    inLanguage: 'ro-RO',
    publisher: { '@id': ORGANIZATION_ID },
  };
}

type WebPageOptions = {
  name: string;
  description: string;
  url: string;
  keywords?: string[];
};

export function buildWebPage({ name, description, url, keywords }: WebPageOptions) {
  const pageId = `${url}#webpage`;

  return {
    '@type': 'WebPage',
    '@id': pageId,
    url,
    name,
    description,
    inLanguage: 'ro-RO',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    ...(keywords?.length ? { keywords: keywords.join(', ') } : {}),
  };
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function buildBreadcrumbList(items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildSchemaGraph(...nodes: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [buildOrganization(), buildWebSite(), ...nodes],
  };
}
