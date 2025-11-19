'use client';

import React, { useEffect, useState } from 'react';
import FadeIn from './animations/FadeIn';

export type SideMenuItem = { id: string; text?: string | null };

export const Sidemenu = ({ items }: { items: SideMenuItem[] }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -50% 0px',
        threshold: 0.1,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      className="z-50 fixed top-1/2 left-0 -translate-y-1/2 max-w-100 hidden xl:block"
      suppressHydrationWarning
      aria-label="Section navigation"
    >
      <FadeIn>
        <ul className="list-none p-0 ml-8">
          {items.map((it) => (
            <li key={it.id} className="m-0">
              <a
                href={`#${it.id}`}
                className={` 
                font-quest block px-2 py-1 rounded-md text-[11px] mb-3
                ${activeId === it.id ? 'text-cyan scale-120 origin-left' : 'text-[#888888]'}
              `}
              >
                {it.text}
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>
    </nav>
  );
};
