import {
  ORGANIZATION_ID,
  WEBSITE_ID,
  absoluteUrl,
  buildBreadcrumbList,
  buildSchemaGraph,
  buildWebPage,
} from '../seo';

type ArticleAuthor = {
  name: string;
  url: string;
  image?: string;
};

type ArticleSchemaOptions = {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  author: ArticleAuthor;
  image: string;
  keywords?: string[];
  breadcrumbItems?: { name: string; path: string }[];
};

export function buildArticleSchema({
  headline,
  description,
  path,
  datePublished,
  dateModified,
  author,
  image,
  keywords,
  breadcrumbItems,
}: ArticleSchemaOptions) {
  const url = absoluteUrl(path);
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image);
  const pageId = `${url}#webpage`;
  const articleId = `${url}#article`;

  const webPage = {
    ...buildWebPage({ name: headline, description, url, keywords }),
    '@id': pageId,
    mainEntity: { '@id': articleId },
  };

  const article = {
    '@type': 'Article',
    '@id': articleId,
    headline,
    description,
    url,
    inLanguage: 'ro-RO',
    datePublished,
    dateModified,
    image: imageUrl,
    author: {
      '@type': 'Person',
      name: author.name,
      url: author.url,
      ...(author.image ? { image: absoluteUrl(author.image) } : {}),
    },
    publisher: { '@id': ORGANIZATION_ID },
    isPartOf: { '@id': WEBSITE_ID },
    mainEntityOfPage: { '@id': pageId },
  };

  const breadcrumbs = breadcrumbItems ?? [
    { name: 'Acasă', path: '/' },
    { name: headline, path },
  ];

  return buildSchemaGraph(webPage, article, buildBreadcrumbList(breadcrumbs));
}
