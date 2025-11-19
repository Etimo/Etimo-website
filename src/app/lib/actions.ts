'use server';

import { getNavLinks } from './contentful';
import { buildRouteMap } from './navigation';
import { LANG } from './constants';

/**
 * Server actions for navigation
 *
 * - These actions run on the server so sensitive data are not exposed to the client.
 * - Next.js automatically handles calling server actions from client components, so you don’t have to write a separate API route.
 * - The same action can be called from server components or asynchronously from client components (like NavbarClient) without duplicating logic.
 */

export async function getNavLinksAction(locale: string) {
  const navLocale = locale === 'en' ? LANG.EN : LANG.SV;
  return await getNavLinks(navLocale);
}

export async function buildRouteMapAction() {
  return await buildRouteMap();
}
