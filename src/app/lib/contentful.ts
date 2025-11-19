import { LANG } from './constants';
import { QUERY_NAV_LINKS, QUERY_PAGE_BY_ID, QUERY_PAGE_SLUG } from './queries';
import type {
  GetNavLinksData,
  GetNavLinksVars,
  GetPageByIdData,
  NavigationLink,
  Page,
  PageSlugResult,
} from './types';

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || 'master';
const CDA_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN!;
export const CF_GQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`;

export const cfFetch = async <TData, TVars extends object = Record<string, unknown>>(
  query: string,
  variables?: TVars,
  fallback: TData | null = null
): Promise<TData | null> => {
  try {
    const res = await fetch(CF_GQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CDA_TOKEN}`,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`Contentful GQL error (${res.status}): ${text}`);
      return fallback;
    }

    const json = (await res.json()) as { data: TData; errors?: Array<{ message: string }> };

    if (json.errors?.length) {
      console.error('Contentful GQL errors:', json.errors.map((e) => e.message).join('; '));
      return fallback;
    }

    return json.data;
  } catch (err) {
    console.error('Failed to fetch from Contentful:', err);
    return fallback;
  }
};

export const getNavLinks = async (locale?: string): Promise<NavigationLink[]> => {
  const variables: GetNavLinksVars = { locale };
  const data = await cfFetch<GetNavLinksData, GetNavLinksVars>(QUERY_NAV_LINKS, variables, {
    navigationLinkCollection: { items: [] },
  });
  return data?.navigationLinkCollection.items ?? [];
};

export const getPageById = async (id: string, locale?: string): Promise<Page | null> => {
  const variables: { id: string; locale?: string } = { id };
  if (locale) variables.locale = locale;

  const data = await cfFetch<GetPageByIdData, typeof variables>(QUERY_PAGE_BY_ID, variables, {
    page: null,
  });
  return data?.page ?? null;
};

export const getLocalizedPageSlugsById = async (id: string): Promise<PageSlugResult> => {
  const results = await Promise.all(
    Object.entries(LANG).map(async ([key, locale]) => {
      const data = await cfFetch<
        { page: { slug?: { slug: string } } | null },
        { id: string; locale: string }
      >(QUERY_PAGE_SLUG, { id, locale }, { page: { slug: { slug: '/' } } });
      return [key, data?.page?.slug?.slug ?? '/'] as const;
    })
  );

  return Object.fromEntries(results) as PageSlugResult;
};
