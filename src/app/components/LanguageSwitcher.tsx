'use client';

import Link from 'next/link';
import { useLocale } from '../hooks/useLocale';
import { COOKIES, LANG } from '@/app/lib/constants';

type LanguageSwitcherProps = {
  closeMenu: () => void;
};

const LanguageSwitcher = ({ closeMenu }: LanguageSwitcherProps) => {
  const { isEnglish } = useLocale();

  const handleLanguageChange = () => {
    const newLang = isEnglish ? LANG.SV : LANG.EN;
    document.cookie = `${COOKIES.PREFERRED_LANG}=${newLang}; path=/; max-age=${60 * 60 * 24 * 365}`;
    closeMenu();
  };

  return (
    <Link
      href={isEnglish ? '/' : '/en'}
      onClick={handleLanguageChange}
      className="text-white text-2xl"
    >
      {isEnglish ? '🇸🇪' : '🇬🇧'}
    </Link>
  );
};

export default LanguageSwitcher;
