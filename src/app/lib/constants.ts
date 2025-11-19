export const COOKIES = {
  PREFERRED_LANG: 'preferred-language',
};

export const LOCAL_STORAGE = {
  COOKIE_CONSENT: 'cookie-consent',
};

export const LANG = {
  SV: 'sv',
  EN: 'en-US',
};

/**
 * Contentful entry IDs for pages. Find them in Contentful: select the page → click "Info" in the right menu → copy "Entry ID".
 * Note: These IDs are not secrets; they are essentially public identifiers.
 */
export const CONTENTFUL_PAGE_IDS = {
  HOME: '3g6FpqgVdYQ8alJ0mqSI1h',
  SERVICES: '7lZImVCm0ETL3OuLf4gV7W',
  INVESTMENTSTRATEGY: '1Fz1jKd1KC9yozUofJtCUS',
  ABOUT: '6LyfRznAO8jDIWZQ1Fpyij',
  CAREER: '7nFML4JcVv0Vg9roLVCC5J',
  CUSTOMERS: '5VzOmylxpPqsmgkunRregb',
} as const;
export type PageKey = keyof typeof CONTENTFUL_PAGE_IDS;

/**
 * Section type identifiers from Contentful (__typename values). These must match the defined values exactly.
 */
export const SECTION_TYPE_VARIANTS = {
  CONSULTANT: 'ConsultantSection',
  IMAGE_GALLERY: 'GenericImageGridSection',
  VIDEO: 'VideoSection',
  HERO: 'Hero',
  GENERIC: 'GenericSection',
} as const;
export type SectionTypeVariant = (typeof SECTION_TYPE_VARIANTS)[keyof typeof SECTION_TYPE_VARIANTS];

/**
 * Section layout variants. These must match the labels defined in Contentful.
 */
export const SECTION_LAYOUT_VARIANTS = {
  IMAGE_TOP: 'Image top, text below',
  IMAGE_BOTTOM: 'Text top, image below',
  TEXT_LEFT: 'Text left, image right',
  IMAGE_LEFT: 'Image left, text right',
  TEXT_ONLY: 'Text only',
} as const;
export type SectionVariant = (typeof SECTION_LAYOUT_VARIANTS)[keyof typeof SECTION_LAYOUT_VARIANTS];

/**
 * Gallery section visual variants. Controls the visual style of image galleries. These must match the labels defined in Contentful.
 */
export const GALLERY_SECTION_VARIANTS = {
  GENERIC: 'Generic',
  BW: 'Black and white',
  BW_SMALL: 'Black and white (small)',
} as const;
export type CallerySectionVisualVariant =
  (typeof GALLERY_SECTION_VARIANTS)[keyof typeof GALLERY_SECTION_VARIANTS];
