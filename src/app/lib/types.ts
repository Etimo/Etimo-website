import { CallerySectionVisualVariant, LANG, SectionVariant } from './constants';
import type { Document } from '@contentful/rich-text-types';
import { SECTION_TYPE_VARIANTS } from './constants';

export type Page = {
  sys: { id: string };
  title?: string | null;
  slug?: NavigationLink;
  sectionsCollection?: SectionsCollection | null;
};

export type PageWithUrl = {
  page: Page | null;
  pageUrl: string | null;
};

export type SectionsCollection = {
  items: Array<
    GenericSection | ImageGallerySection | ConsultantSection | VideoSection | Hero | null
  >;
};

export interface ContentfulEntry<TFields = Record<string, unknown>> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    revision: number;
    contentType: {
      sys: {
        type: string;
        linkType: string;
        id: string;
      };
    };
  };
  fields: TFields;
}

export interface ContentfulAsset {
  sys: { id: string };
  fields: {
    file: { url: string };
    title?: string;
    description?: string;
  };
}

export interface ContentfulResponse<TFields = Record<string, unknown>> {
  items: ContentfulEntry<TFields>[];
  includes?: {
    Asset: ContentfulAsset[];
  };
}

export interface ContentfulAssetResult {
  url: string;
  alt: string;
}

export type CfAsset = {
  url: string;
  title?: string | null;
  description?: string | null;
};

export type CfImagesCollection = {
  items: Array<CfAsset | null>;
};

export type CfRichText = {
  json: Document;
};

export type CfConsultant = {
  name: string;
  role?: string | null;
  image: CfAsset;
  linkedIn?: string | null;
  github?: string | null;
};

type CfLink = {
  slug: string;
};

type CfConsultantsCollection = {
  items: Array<CfConsultant | null>;
};

type BaseSectionFields = {
  sys: { id: string };
  label?: string | null;
  title?: string | null;
  linkText?: string | null;
  link?: Record<string, string>;
  text?: CfRichText | null;
  sideMenuTitle?: string;
};

export type GenericSection = BaseSectionFields & {
  __typename: typeof SECTION_TYPE_VARIANTS.GENERIC;
  variant?: SectionVariant;
  linkSlug?: string | null;
  imagesCollection?: CfImagesCollection | null;
};

export type ImageGallerySection = BaseSectionFields & {
  __typename: typeof SECTION_TYPE_VARIANTS.IMAGE_GALLERY;
  linkSlug?: string | null;
  imagesCollection?: CfImagesCollection | null;
  variant: CallerySectionVisualVariant;
};

export type ConsultantSection = BaseSectionFields & {
  __typename: typeof SECTION_TYPE_VARIANTS.CONSULTANT;
  link?: CfLink | null;
  consultantsCollection?: CfConsultantsCollection | null;
};

export type VideoSection = BaseSectionFields & {
  __typename: typeof SECTION_TYPE_VARIANTS.VIDEO;
  linkSlug?: string | null;
  video?: Video;
  videoLink?: string;
};

export type Hero = {
  __typename: typeof SECTION_TYPE_VARIANTS.HERO;
  label: string;
  firstRowTitle: string;
  secondRowTitle: string;
  text?: CfRichText | null;
  sideMenuTitle?: string;
};

type Video = {
  url?: string;
  thumbnail?: Record<string, string>;
};

export type NavigationLink = {
  sys: { id: string };
  title: string;
  slug: string;
  isExternal: boolean;
};

export type GetPageByIdData = {
  page: Page | null;
};

export type GetNavLinksData = {
  navigationLinkCollection: {
    items: NavigationLink[];
  };
};

export type GetNavLinksVars = {
  locale?: string;
};

export type FormattedLinks = {
  href: string;
  label: string;
  isExternal?: boolean;
};

export type PageSlug = { slug: string };

export type PageData = { page: { slug?: PageSlug } | null };

export type PageSlugResult = {
  [key in keyof typeof LANG]: string;
};

export type LocalizedPath = Record<keyof typeof LANG, string>;
