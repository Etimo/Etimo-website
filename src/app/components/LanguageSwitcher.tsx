'use client';

    import Link from 'next/link';
import { useLocale } from '../hooks/useLocale';
import { COOKIES, LANG } from '@/app/lib/constants';

  type LanguageSwitcherProps = {
  closeMenu?: () => void;
  size?: 'sm' | 'xl';
};

const LanguageSwitcher = ({ closeMenu, size }: LanguageSwitcherProps) => {
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
      className={`text-white ${size === 'xl' ? 'text-[32px]' : 'text-2xl'} `}
    >
      {isEnglish ? '🇸🇪' : '🇬🇧'}
    </Link>
  );
};

export default LanguageSwitcher;
