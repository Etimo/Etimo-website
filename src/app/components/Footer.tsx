import React from 'react';
import { Contact } from './Contact';
import { SocialLinks } from './ui/SocialIcons';

export const Footer = () => {
  return (
    <section className="py-20 w-full flex justify-center text-center bg-brown">
      <div className="mx-auto xl:px-32 text-white">
        <div className="flex flex-col items-center text-center">
          <Contact showAddress />
          <SocialLinks />
        </div>

        <p className="text-gray-500 pt-6 text-center pb-2 2xl:pb-10 text-xs 2xl:text-sm pointer-events-none">
          © Etimo 2025
        </p>

        <div className="flex justify-center py-5 saturate-[0.75]">
          <img
            src="/doctors-without-borders-supporter.png"
            alt="Läkare utan gränsers logga"
            height={100}
            width={300}
          />
        </div>
      </div>
    </section>
  );
};
