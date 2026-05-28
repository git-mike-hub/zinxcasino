import { absoluteUrl, buildBreadcrumbList, buildSchemaGraph, buildWebPage } from '../seo';

type PageSchemaOptions = {
  name: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function buildPageSchema({
  name,
  description,
  path,
  keywords,
}: PageSchemaOptions) {
  const url = absoluteUrl(path);

  return buildSchemaGraph(
    buildWebPage({
      name,
      description,
      url,
      keywords,
    }),
    buildBreadcrumbList([
      { name: 'Acasă', path: '/' },
      { name, path },
    ]),
  );
}
