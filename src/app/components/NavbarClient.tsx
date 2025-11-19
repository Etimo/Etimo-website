'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { getNavLinksAction } from '../lib/actions';
import { FormattedLinks } from '../lib/types';

type NavLink = {
  href: string;
  label: string;
  isExternal?: boolean;
};

export const NavbarClient = () => {
  const pathname = usePathname();
  const locale = pathname.startsWith('/en') ? 'en' : 'sv';
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const links = await getNavLinksAction(locale);

      const formattedLinks: FormattedLinks[] = links.map((link) => ({
        href: link.slug,
        label: link.title,
        isExternal: link.isExternal,
      }));

      setNavLinks(formattedLinks);
      setLoading(false);
    };

    fetchData();
  }, [locale]);

  return <Navbar links={navLinks} isLoading={loading} />;
};
