'use client';

import Link from 'next/link';
import { useLocale } from '../hooks/useLocale';
import { COOKIES, LANG } from '@/app/lib/constants';
import { GrLanguage } from 'react-icons/gr';

type LanguageSwitcherProps = {
  closeMenu?: () => void;
  color?: string;
};

const LanguageSwitcher = ({ closeMenu, color = 'white' }: LanguageSwitcherProps) => {
  const { isEnglish } = useLocale();

  const handleLanguageChange = () => {
    const newLang = isEnglish ? LANG.SV : LANG.EN;
    document.cookie = `${COOKIES.PREFERRED_LANG}=${newLang}; path=/; max-age=${60 * 60 * 24 * 365}`;
    closeMenu && closeMenu();
  };

  return (
    <Link
      href={isEnglish ? '/' : '/en'}
      onClick={handleLanguageChange}
      className={`text-${color} text-sm flex items-center gap-2`}
    >
      <GrLanguage />
      {isEnglish ? 'Svenska' : 'English'}
    </Link>
  );
};

export default LanguageSwitcher;
