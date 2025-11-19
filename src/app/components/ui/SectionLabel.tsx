import React from 'react';
import FadeIn from '../animations/FadeIn';

export const SectionLabel = ({ label }: { label?: string | null }) => {
  if (!label) return;
  return (
    <label className="block uppercase text-gray-500 font-normal tracking-[0.3em] leading-[2] text-[11px] 2xl:text-[13px] mb-2 2xl:mb-4 font-quest">
      <FadeIn direction="up">{label}</FadeIn>
    </label>
  );
};
