import { Metadata } from 'next';
import { LANG } from './constants';
import { LocalizedPath } from './types';

type MetadataParams = {
  title: string;
  description: string;
  path?: string;
  localizedPath: LocalizedPath;
  image?: string;
  noIndex?: boolean;
};

export function generateMetadata({
  title,
  description,
  path = '',
  image = '/og-image.jpg',
  noIndex = false,
  localizedPath,
}: MetadataParams): Metadata {
  const baseUrl = 'https://etimo.se';
  const localeKey = path.startsWith('/en/') ? LANG.EN : LANG.SV;
  const url = localeKey === LANG.SV ? `${baseUrl}/${path}` : `${baseUrl}${path}`;
  const fullTitle = path ? `${title} | Etimo` : title;

  return {
    title: fullTitle,
    description,

    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        Object.entries(LANG).map(([key, lang]) => [
          lang,
          localizedPath[key as keyof typeof LANG] ?? '/',
        ])
      ),
    },

    openGraph: {
      type: 'website',
      locale: localeKey === LANG.SV ? 'sv_SE' : 'en_US',
      alternateLocale: localeKey === LANG.SV ? ['en_US'] : ['sv_SE'],
      url,
      title: fullTitle,
      description,
      siteName: 'Etimo',
      images: [
        {
          url: `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}
// Page-specific metadata configurations
export const pageMetadata = {
  home: {
    sv: {
      title: 'Etimo - Din IT-partner inom digital utveckling',
      description:
        'Etimo är ett IT-konsultbolag som levererar expertkonsulter inom systemutveckling, webbutveckling, molntjänster och AI.',
    },
    en: {
      title: 'Etimo - Your partner in digital development',
      description:
        'Etimo is an IT consulting company delivering expert consultants in system development, web development, cloud services and AI.',
    },
  },
  services: {
    sv: {
      title: 'Vårt erbjudande',
      description:
        'Upptäck Etimos tjänster inom IT-konsulting, systemutveckling, molntjänster och AI. Vi hjälper er att bygga framtidens digitala lösningar.',
    },
    en: {
      title: 'Our Services',
      description:
        "Discover Etimo's services in IT consulting, system development, cloud services and AI. We help you build tomorrow's digital solutions.",
    },
  },
  about: {
    sv: {
      title: 'Om oss',
      description:
        'Lär känna oss - ett IT-konsultbolag drivet av passion för teknologi och innovation. Möt vårt team av erfarna IT-konsulter.',
    },
    en: {
      title: 'About Etimo',
      description:
        'Get to know us - an IT consulting company driven by passion for technology and innovation. Meet our team of experienced IT consultants.',
    },
  },
  career: {
    sv: {
      title: 'Karriär på Etimo',
      description:
        'Vi söker passionerade IT-konsulter som vill utvecklas i en innovativ och kollaborativ miljö. Läs mer om oss.',
    },
    en: {
      title: 'Career at Etimo',
      description:
        "Work at Etimo! We're looking for passionate IT consultants who want to grow in an innovative and collaborative environment. Read more about us.",
    },
  },
  customers: {
    sv: {
      title: 'Våra kunder',
      description:
        'Se hur Etimo har hjälpt företag att lyckas med digital transformation, systemutveckling och agila arbetsmetoder.',
    },
    en: {
      title: 'Our Customers',
      description:
        'See how Etimo has helped companies succeed with digital transformation, system development and agile methodologies.',
    },
  },
  etimo_ventures: {
    sv: {
      title: 'Investeringsstrategi',
      description:
        'Etimos investeringsstrategi och vårt åtagande för hållbar tillväxt och innovation inom IT-konsulting.',
    },
    en: {
      title: 'Investment Strategy',
      description:
        "Etimo's investment strategy and our commitment to sustainable growth and innovation in IT consulting.",
    },
  },
} as const;
