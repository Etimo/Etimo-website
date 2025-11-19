import { MetadataRoute } from 'next';

/**
 * Sitemap generator
 *
 * This file is automatically recognized by Next.js and generates an XML sitemap.
 *
 * - Next.js automatically converts this function's output to XML format
 * - The sitemap is generated at build time and served at /sitemap.xml
 * - When deployed, visit https://etimo.se/sitemap.xml to see the result
 *
 * When to update:
 * - Add new routes to the 'routes' array below
 * - Update priorities or change frequencies as needed
 * - Rebuild and redeploy for changes to take effect
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://etimo.se';
  const routes = [
    {
      sv: '/',
      en: '/en',
      priority: 1,
      changeFrequency: 'monthly' as const,
    },
    {
      sv: '/erbjudande',
      en: '/en/services',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      sv: '/om-oss',
      en: '/en/about',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      sv: '/karriar',
      en: '/en/career',
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    },
    {
      sv: '/kunder',
      en: '/en/customers',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
    {
      sv: '/etimo-ventures',
      en: '/en/etimo-ventures',
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
  ];

  return routes.flatMap((route) => [
    {
      url: `${baseUrl}${route.sv}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          sv: `${baseUrl}${route.sv}`,
          en: `${baseUrl}${route.en}`,
        },
      },
    },
    {
      url: `${baseUrl}${route.en}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          sv: `${baseUrl}${route.sv}`,
          en: `${baseUrl}${route.en}`,
        },
      },
    },
  ]);
}
