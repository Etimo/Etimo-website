'use client';

import { useLocale } from '../hooks/useLocale';

const drawerLabelCls =
  'uppercase text-gray-300 font-normal tracking-[0.3em] leading-[2] text-[10px] 2xl:text-[11px] mb-1 --font-quest';

export const Contact = ({ showAddress }: { showAddress?: boolean }) => {
  const { isEnglish } = useLocale();

  return (
    <div className="px-14 pb-10 2xl:pb-5">
      <p className={drawerLabelCls}>{isEnglish ? 'Phone' : 'Telefon'}:</p>
      <a href="tel:+46760213150" className="block text-white text-sm 2xl:text-base mb-4">
        076&nbsp;-&nbsp;021&nbsp;31&nbsp;50
      </a>

      <p className={drawerLabelCls}>{isEnglish ? 'E-mail' : 'E-post'}:</p>
      <a
        href="mailto:kontakt@etimo.se"
        className="block text-white text-sm 2xl:text-base mb-6 break-all"
      >
        kontakt@etimo.se
      </a>

      {showAddress && (
        <>
          <p className={drawerLabelCls}>{isEnglish ? 'Address' : 'Adress'}:</p>
          <p className="text-sm 2xl:text-base">Dalagatan 7, 111 23 Stockholm</p>
        </>
      )}
    </div>
  );
};
