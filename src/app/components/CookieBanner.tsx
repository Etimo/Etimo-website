'use client';

import { useEffect, useState } from 'react';
import { useLocale } from '../hooks/useLocale';
import { initAnalytics } from '../lib/helpers';
import { LOCAL_STORAGE } from '@/app/lib/constants';

const CookieBanner = () => {
  const [show, setShow] = useState(false);
  const { isEnglish } = useLocale();

  useEffect(() => {
    const consent = localStorage.getItem(LOCAL_STORAGE.COOKIE_CONSENT);
    if (!consent) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem(LOCAL_STORAGE.COOKIE_CONSENT, 'accepted');
    initAnalytics();
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem(LOCAL_STORAGE.COOKIE_CONSENT, 'declined');
    setShow(false);
  };

  return (
    <div
      className={`fixed bottom-0 z-50 w-full bg-dark-blue text-white p-5 transition-all duration-300 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-center md:text-left">
        <div className="flex-1">
          <h3 className="font-semibold text-base uppercase font-quest tracking-[0.3em] leading-[2] text-[11px]">
            Cookies
          </h3>
          <p className="text-[13px] 2xl:text-sm mt-1 font-quest">
            {isEnglish
              ? 'We use cookies to analyze user behavior and improve your experience on our website.'
              : 'Vi använder cookies för att analysera användarbeteenden och förbättra din upplevelse på vår hemsida.'}
          </p>
        </div>

        <div className="flex gap-3 flex-shrink-0 item-center justify-center mt-4 lg:mt-0">
          <button
            onClick={decline}
            className="border border-white px-4 py-2 rounded-md text-sm font-quest"
          >
            {isEnglish ? 'Decline cookies' : 'Avböj cookies'}
          </button>

          <button
            onClick={accept}
            className="bg-cyan text-blue-900 px-4 py-2 rounded-md text-sm font-medium font-quest"
          >
            {isEnglish ? 'Accept cookies' : 'Acceptera cookies'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
