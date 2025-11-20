'use client';

import { useFocusTrap } from '../hooks/useFocusTrap';
import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Contact } from './Contact';
import LanguageSwitcher from './LanguageSwitcher';
import { IoCloseSharp } from 'react-icons/io5';
import HoverEffect from './animations/HoverEffect';
import { HamburgerButton } from './ui/HamburgerButton';
import { FormattedLinks } from '../lib/types';

export const Navbar = ({
  links,
  isLoading = false,
}: {
  links: FormattedLinks[];
  isLoading?: boolean;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const drawerRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = () => {
    if (!isLoading) {
      setMenuOpen((v) => !v);
    }
  };

  useFocusTrap(drawerRef, menuOpen);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY === 0);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = 'hidden';
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [menuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto px-4 flex items-center justify-between h-16 py-12 xl:py-16">
        <div
          className={`flex items-center space-x-2 transition-opacity duration-300 ${
            atTop ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src="/etimo_logo_transparent.png"
            alt="Etimo logo"
            className="w-[110px] xl:w-[150px] h-auto"
          />
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden md:block">
            <LanguageSwitcher size="xl" />
          </div>
          <HamburgerButton menuOpen={menuOpen} isLoading={isLoading} onClick={toggleMenu} />
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          menuOpen ? 'bg-black/20 opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeMenu}
        aria-hidden={!menuOpen}
      />

      <aside
        ref={drawerRef}
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        className={`fixed right-0 top-0 bottom-0 z-50 w-110 max-w-[105vw]
          bg-brown/95 backdrop-blur-md shadow-xl
          flex flex-col justify-between
          transition-transform duration-300
          ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <section>
          <div className="h-16 flex justify-end items-center px-5 mt-4">
            <button
              onClick={closeMenu}
              aria-label="Close menu"
              className="p-2 rounded text-white text-4xl 
               transform transition-transform duration-300 
               hover:rotate-90 hover:text-cyan"
            >
              <IoCloseSharp />
            </button>
          </div>

          <nav className="px-14 pt-4 pb-10">
            <ul className="flex flex-col gap-4">
              {links.map((link) => (
                <li key={link.href}>
                  {link.isExternal ? (
                    <HoverEffect underlineSpacing={0}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                        className="block text-white text-base 2xl:text-xl mb-3 2xl:mb-8 font-quest"
                      >
                        {link.label}
                      </a>
                    </HoverEffect>
                  ) : (
                    <HoverEffect underlineSpacing={0}>
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className="block text-white text-base 2xl:text-md pb-3 2xl:pb-5 font-quest"
                      >
                        {link.label}
                      </Link>
                    </HoverEffect>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </section>

        <section>
          <div className="px-14 mb-6">
            <LanguageSwitcher closeMenu={closeMenu} size="xl" />
          </div>
          <Contact />
        </section>
      </aside>
    </nav>
  );
};
