import { VideoSection as VideoSectionType } from '@/app/lib/types';
import { RichText } from '../ui/RichText';
import { SectionLabel } from '../ui/SectionLabel';
import { SectionTitle } from '../ui/SectionTitle';
import SectionLink from '../ui/SectionLink';

export const VideoSection = ({ section }: { section: VideoSectionType }) => {
  const video = section.video;
  const videoLink = section.videoLink;

  return (
    <section className="section-wrapper">
      <div className="w-full max-w-4xl mx-auto text-center space-y-8">
        {section.label && <SectionLabel label={section.label} />}
        {section.title && <SectionTitle title={section.title} />}

        {/* Uploaded video from CMS */}
        {video?.url && !videoLink && (
          <div className="mb-8 flex justify-center">
            <div className="relative overflow-hidden rounded-lg shadow-lg w-120">
              <video
                src={video.url}
                controls
                playsInline
                preload="metadata"
                className="w-full h-auto rounded-lg"
                poster={video.thumbnail?.url || undefined}
              >
                Sorry, your browser does not support embedded videos.
              </video>
            </div>
          </div>
        )}

        {/* YouTube embed */}
        {videoLink && (
          <div className="mb-8 flex justify-center w-full max-w-4xl">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={videoLink}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {section.text && <RichText doc={section.text} />}

        {section.linkSlug && (
          <SectionLink link={{ slug: section.linkSlug }} linkText={section.linkText} />
        )}
      </div>
    </section>
  );
};
