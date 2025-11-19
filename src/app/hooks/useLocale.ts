'use client';

import { usePathname } from 'next/navigation';

export const useLocale = () => {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith('/en');

  return {
    isEnglish,
    locale: isEnglish ? 'en' : 'sv',
  };
};
