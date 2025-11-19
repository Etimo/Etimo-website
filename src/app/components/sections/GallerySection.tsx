import { GALLERY_SECTION_VARIANTS } from '@/app/lib/constants';
import { RichText } from '../ui/RichText';
import { SectionLabel } from '../ui/SectionLabel';
import { SectionTitle } from '../ui/SectionTitle';
import { CfAsset, ImageGallerySection } from '@/app/lib/types';
import { filterValidImages } from '@/app/lib/helpers';
import Image from 'next/image';
import SectionLink from '../ui/SectionLink';
import StaggeredImages from '../animations/StaggeredImages';

const Gallery = ({
  images,
  variant,
}: {
  images: (CfAsset | null)[];
  variant: (typeof GALLERY_SECTION_VARIANTS)[keyof typeof GALLERY_SECTION_VARIANTS];
}) => {
  const validImages = filterValidImages(images);
  if (validImages.length === 0) return null;

  const gridCols =
    variant === GALLERY_SECTION_VARIANTS.BW_SMALL
      ? 'grid-cols-3 md:grid-cols-4'
      : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

  const aspectRatio =
    variant === GALLERY_SECTION_VARIANTS.BW || variant === GALLERY_SECTION_VARIANTS.BW_SMALL
      ? 'aspect-[4/3]'
      : 'aspect-[2/3]';

  const imageClasses =
    variant === GALLERY_SECTION_VARIANTS.GENERIC
      ? 'absolute inset-0 h-full w-full object-cover object-center rounded-lg'
      : 'absolute inset-0 h-full w-full object-contain object-center grayscale transition-transform duration-300 scale-55 opacity-80';

  const containerClasses =
    variant === GALLERY_SECTION_VARIANTS.BW_SMALL
      ? `mb-8 grid ${gridCols} gap-6 max-w-xl mx-auto`
      : `mb-8 grid ${gridCols} gap-6`;

  return (
    <div className={containerClasses}>
      <StaggeredImages>
        {validImages.map((img, idx) => (
          <div key={idx} className="w-full relative overflow-hidden">
            <div className={`relative w-full ${aspectRatio}`}>
              <Image
                src={img.url}
                alt={img.title || img.description || ''}
                loading="lazy"
                className={imageClasses}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
          </div>
        ))}
      </StaggeredImages>
    </div>
  );
};

export const GallerySection = ({ section }: { section: ImageGallerySection }) => {
  const images = section.imagesCollection?.items ?? [];
  const variant = section.variant;

  return (
    <section className="section-wrapper">
      <div className="w-full max-w-4xl 2xl:max-w-6xl mx-auto text-center space-y-8">
        <SectionLabel label={section.label} />
        <SectionTitle title={section.title} />

        {images.length > 0 && <Gallery images={images} variant={variant} />}

        {section.text && <RichText doc={section.text} />}

        {section.link && <SectionLink link={section.link} linkText={section.linkText} />}
      </div>
    </section>
  );
};
