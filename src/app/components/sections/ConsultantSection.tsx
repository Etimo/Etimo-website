import { CfConsultant, ConsultantSection } from '@/app/lib/types';
import { SectionLabel } from '../ui/SectionLabel';
import { SectionTitle } from '../ui/SectionTitle';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SocialLink } from '../ui/SocialLink';
import Image from 'next/image';
import StaggeredImages from '../animations/StaggeredImages';
import SectionLink from '../ui/SectionLink';

const ConsultantCard = ({ consultant }: { consultant: CfConsultant | null }) => {
  if (!consultant) return;
  const hasSocialLinks = consultant.linkedIn || consultant.github;

  return (
    <div className="group relative w-full overflow-hidden rounded-lg shadow-lg">
      <div className="relative w-full aspect-[2/3]">
        <Image
          src={consultant.image.url}
          alt={consultant.name}
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-400 group-hover:scale-105"
          loading="lazy"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        <div className="absolute inset-0 bg-cyan/70 invisible group-hover:visible transition-all flex items-center justify-center">
          <div className="text-black text-center space-y-2 px-4">
            <h3 className="text-2xl 2xl:text-3xl font-bold">{consultant.name}</h3>
            {consultant.role && (
              <p className="text-sm 2xl:text-xl font-medium">{consultant.role}</p>
            )}

            {hasSocialLinks && (
              <div className="flex items-center justify-center gap-4 mt-10">
                {consultant.linkedIn && (
                  <SocialLink
                    href={consultant.linkedIn}
                    icon={FaLinkedin}
                    label={`${consultant.name} on LinkedIn`}
                  />
                )}
                {consultant.github && (
                  <SocialLink
                    href={consultant.github}
                    icon={FaGithub}
                    label={`${consultant.name} on GitHub`}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ConsultantImageSection = ({ section }: { section: ConsultantSection }) => {
  const consultants = section.consultantsCollection?.items ?? [];
  const isLargeGrid = consultants.length > 9;
  return (
    <section className={`section-wrapper ${isLargeGrid ? 'min-h-[130vh]' : ''}`}>
      <div className="w-full max-w-4xl 2xl:max-w-6xl mx-auto text-center space-y-8">
        {section.label && <SectionLabel label={section.label} />}
        {section.title && <SectionTitle title={section.title} />}

        {consultants.length > 0 && (
          <div className="mb-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <StaggeredImages>
              {consultants.map((consultant, idx) => (
                <ConsultantCard key={consultant?.name || idx} consultant={consultant} />
              ))}
            </StaggeredImages>
          </div>
        )}

        {section.link && <SectionLink link={section.link} linkText={section.linkText} />}
      </div>
    </section>
  );
};
