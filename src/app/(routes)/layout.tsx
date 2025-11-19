import type { Metadata } from 'next';
import '../globals.css';
import { Footer } from '../components/Footer';
import { NavbarClient } from '../components/NavbarClient';
import CookieBanner from '../components/CookieBanner';

export const metadata: Metadata = {
  title: 'Etimo',
  description: 'Official website of Etimo',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth">
      <body>
        <CookieBanner />
        <NavbarClient />
        {children}
        <Footer />
      </body>
    </html>
  );
}
