import React from 'react';
import type { Page } from '../lib/types';
import { notNull } from '../lib/helpers';
import { SectionSwitch } from './SectionSwitch';

type Props = { page: Page | null | undefined };

export const PageRenderer = ({ page }: Props) => {
  const sections = page?.sectionsCollection?.items?.filter(notNull) ?? [];

  return (
    <>
      {sections.map((section, idx) => {
        const bgClass = idx % 2 === 0 ? 'bg-gray-100' : 'bg-white';
        const firstSectionClass = idx === 0 ? 'pt-10 min-h-screen md:h-auto xl:pt-0' : ''; // first section should span the entire viewport on small devices

        return (
          <section id={`s${idx}`} key={`s${idx}`} className={`${bgClass} ${firstSectionClass}`}>
            <SectionSwitch section={section} />
          </section>
        );
      })}
    </>
  );
};
