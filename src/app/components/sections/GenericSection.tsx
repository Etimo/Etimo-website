import React from 'react';
import { RichText } from '../ui/RichText';
import { SectionLabel } from '../ui/SectionLabel';
import { SectionTitle } from '../ui/SectionTitle';
import { SECTION_LAYOUT_VARIANTS, SectionVariant } from '@/app/lib/constants';
import { GenericSection as GenericSectionType } from '@/app/lib/types';
import { filterValidImages } from '@/app/lib/helpers';
import Image from 'next/image';
import SectionLink from '../ui/SectionLink';
import StaggeredImages from '../animations/StaggeredImages';
import FadeIn from '../animations/FadeIn';

export const GenericSection = ({ section }: { section: GenericSectionType }) => {
  const images = section.imagesCollection?.items ?? [];
  const hasImages = images.length > 0;

  const sectionVariant: SectionVariant = hasImages
    ? (section.variant as SectionVariant) || SECTION_LAYOUT_VARIANTS.IMAGE_TOP
    : SECTION_LAYOUT_VARIANTS.TEXT_ONLY;

  const renderImages = () => {
    const validImages = filterValidImages(images);

    if (images.length === 1) {
      const image = validImages[0];
      if (validImages.length === 0) return null;
      return (
        <div className="mb-8 flex justify-center">
          <div className="relative overflow-hidden rounded-lg shadow-lg lg:max-w-md w-full">
            <FadeIn direction="up">
              <div className="relative w-full h-56 md:h-72 lg:h-80">
                <Image
                  src={image.url}
                  alt={image.title || image.description || ''}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  loading="lazy"
                  fill
                  sizes="(max-width: 1024px) 100vw, 448px"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      );
    }

    const cols = Math.min(images.length, 3);
    const gridColsClass = `md:grid-cols-${cols}`;

    return (
      <div
        className={`mb-8 max-w-4xl 2xl:max-w-5xl mx-auto grid grid-cols-1 gap-6 ${gridColsClass}`}
      >
        <StaggeredImages>
          {validImages.map((img, idx) => (
            <div key={idx} className="w-full relative overflow-hidden rounded-lg shadow-lg">
              <div className="relative w-full h-56 md:h-72 lg:h-80">
                <Image
                  src={img.url}
                  alt={img.title || img.description || ''}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  loading="lazy"
                  fill
                  sizes="(max-width: 1024px) 100vw, 448px"
                />
              </div>
            </div>
          ))}
        </StaggeredImages>
      </div>
    );
  };

  const renderContent = () => {
    if (!hasImages) {
      return section.text && <RichText doc={section.text} />;
    }

    switch (sectionVariant) {
      case SECTION_LAYOUT_VARIANTS.IMAGE_TOP:
        return (
          <>
            {renderImages()}
            {section.text && <RichText doc={section.text} />}
          </>
        );

      case SECTION_LAYOUT_VARIANTS.IMAGE_BOTTOM:
        return (
          <>
            {section.text && <RichText doc={section.text} />}
            {renderImages()}
          </>
        );

      case SECTION_LAYOUT_VARIANTS.TEXT_LEFT:
        return (
          <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
            {section.text && (
              <div className="md:w-1/2 text-center md:text-left">
                <RichText doc={section.text} />
              </div>
            )}
            <div className="md:w-1/2">{renderImages()}</div>
          </div>
        );

      case SECTION_LAYOUT_VARIANTS.IMAGE_LEFT:
        return (
          <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
            <div className="md:w-1/2">{renderImages()}</div>
            {section.text && (
              <div className="md:w-1/2 text-center md:text-left">
                <RichText doc={section.text} />
              </div>
            )}
          </div>
        );

      default:
        return section.text && <RichText doc={section.text} />;
    }
  };

  return (
    <section className="section-wrapper">
      <div className="w-full max-w-4xl 2xl:max-w-5xl mx-auto text-center space-y-8">
        <SectionLabel label={section.label} />
        <SectionTitle title={section.title} />

        {renderContent()}

        {section.link && <SectionLink link={section.link} linkText={section.linkText} />}
      </div>
    </section>
  );
};
