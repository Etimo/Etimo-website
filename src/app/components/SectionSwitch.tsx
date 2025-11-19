import React from 'react';
import type {
  ConsultantSection,
  ImageGallerySection,
  GenericSection as GenericSectionType,
  VideoSection as VideoSectionType,
  Hero as HeroSectionType,
} from '../lib/types';
import { GenericSection } from './sections/GenericSection';
import { GallerySection } from './sections/GallerySection';
import { ConsultantImageSection } from './sections/ConsultantSection';
import { VideoSection } from './sections/VideoSection';
import { Hero } from './Hero';
import { SECTION_TYPE_VARIANTS } from '@/app/lib/constants';

export const SectionSwitch = ({
  section,
}: {
  section:
    | GenericSectionType
    | ImageGallerySection
    | ConsultantSection
    | VideoSectionType
    | HeroSectionType;
}) => {
  switch (section.__typename) {
    case SECTION_TYPE_VARIANTS.CONSULTANT:
      return <ConsultantImageSection section={section} />;

    case SECTION_TYPE_VARIANTS.IMAGE_GALLERY:
      return <GallerySection section={section} />;

    case SECTION_TYPE_VARIANTS.VIDEO:
      return <VideoSection section={section} />;

    case SECTION_TYPE_VARIANTS.HERO:
      return <Hero section={section} />;

    default:
      return <GenericSection section={section} />;
  }
};
