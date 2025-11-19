import React from 'react';
import { RichText } from './ui/RichText';
import { SectionLabel } from './ui/SectionLabel';
import { Hero as HeroType } from '../lib/types';
import FadeIn from './animations/FadeIn';

export const Hero = ({ section }: { section: HeroType }) => {
  return (
    <section className="section-wrapper mt-12 lg:mt-0">
      <div className="flex my-auto flex-col mx-4 max-w-[700px] text-center">
        {section.label && (
          <FadeIn direction="up">
            <SectionLabel label={section.label} />
          </FadeIn>
        )}

        <FadeIn direction="left">
          <h1 className="text-4xl lg:text-5xl text-dark-blue">{section.firstRowTitle}</h1>
          <h1 className="text-4xl lg:text-5xl mt-2 text-cyan">{section.secondRowTitle}</h1>
        </FadeIn>
        {section.text && (
          <FadeIn direction="right">
            <div className="mt-6">
              <RichText doc={section.text} />
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
};
