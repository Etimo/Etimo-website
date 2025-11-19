import { CONTENTFUL_PAGE_IDS } from '@/app/lib/constants';
import { PageRenderer } from '../../components/PageRenderer';
import { Sidemenu } from '../../components/Sidemenu';
import { getSections } from '../../lib/helpers';
import { generateMetadata as generateMeta, pageMetadata } from './../../lib/metadata';
import { getPageById, getLocalizedPageSlugsById } from '@/app/lib/contentful';
import NotFound from '@/app/components/NotFound';

export const generateMetadata = async () => {
  const pageUrls = await getLocalizedPageSlugsById(CONTENTFUL_PAGE_IDS.HOME);
  return generateMeta({
    ...pageMetadata.home.en,
    path: pageUrls.EN,
    localizedPath: pageUrls,
  });
};

export default async function LandingPage() {
  const page = await getPageById(CONTENTFUL_PAGE_IDS.HOME);
  const items = getSections(page);

  return (
    <>
      <Sidemenu items={items} />
      <main>{page ? <PageRenderer page={page} /> : <NotFound />}</main>
    </>
  );
}
