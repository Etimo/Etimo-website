import { MetadataRoute } from 'next';

/**
 * Robots.txt generator
 *
 * This file is automatically recognized by Next.js and generates a robots.txt file.
 *
 * - Next.js automatically converts this function's output to robots.txt format
 * - The file is generated at build time and served at /robots.txt
 * - When deployed, visit https://etimo.se/robots.txt to see the result
 *
 * Purpose:
 * - Tells search engine crawlers which pages they can/cannot access
 * - Points crawlers to the sitemap location
 * - Helps with SEO by preventing indexing of internal routes
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // Applies to all search engine bots
      allow: '/', // Allow crawling of all pages
      disallow: ['/api/', '/_next/'], // Block internal Next.js routes
    },
    sitemap: 'https://etimo.se/sitemap.xml', // Point to sitemap location
  };
}
