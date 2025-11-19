'use client';

import React from 'react';
import HoverEffect from '../animations/HoverEffect';

type SectionLinkProps = {
  link?: { slug?: string | null };
  linkText?: string | null;
};

const SectionLink = ({ link, linkText }: SectionLinkProps) => {
  if (!link?.slug) return null;

  return (
    <div className="pt-4">
      <HoverEffect>
        <a href={link.slug} className="relative z-10 text-sm 2xl:text-base p-5">
          {linkText}
        </a>
      </HoverEffect>
    </div>
  );
};

export default SectionLink;
