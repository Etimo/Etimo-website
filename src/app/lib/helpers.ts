import { SideMenuItem } from '../components/Sidemenu';
import { Page } from './types';
import type { CfAsset } from './types';

/**
 * Creates navigation items for the side menu.
 * The link text is `sideMenuTitle` if custom, otherwise it defaults as the contents `label`.
 */
export const getSections = (page: Page | null): SideMenuItem[] => {
  if (!page?.sectionsCollection?.items) return [];
  const sections = page.sectionsCollection.items.filter((s) => s !== null);
  return sections.map((section, idx) => ({
    id: `s${idx}`,
    text: section.sideMenuTitle || section.label,
  }));
};

/**
 * Initiates Google Analytics if user accepts.
 */
export const initAnalytics = () => {
  if (typeof window === 'undefined') return;

  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  if (!GA_ID) return;

  if (!document.getElementById('gtag-script')) {
    const script = document.createElement('script');
    script.id = 'gtag-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
  }

  window.dataLayer = window.dataLayer ?? [];
  const gtag = (...args: unknown[]) => window.dataLayer!.push(args);
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_ID, { anonymize_ip: true });
};

export const filterValidImages = (images: (CfAsset | null)[] | undefined): CfAsset[] => {
  if (!images || images.length === 0) return [];
  return images.filter((img): img is CfAsset => img !== null);
};

export const notNull = <T>(x: T | null | undefined): x is T => {
  return x != null;
};
