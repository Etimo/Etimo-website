import { PageRenderer } from '../../../components/PageRenderer';
import { CONTENTFUL_PAGE_IDS } from '@/app/lib/constants';
import { getSections } from '../../../lib/helpers';
import { generateMetadata as generateMeta, pageMetadata } from '../../../lib/metadata';
import { Sidemenu } from '@/app/components/Sidemenu';
import { getPageById, getLocalizedPageSlugsById } from '@/app/lib/contentful';
import NotFound from '@/app/components/NotFound';

export const generateMetadata = async () => {
  const pageUrls = await getLocalizedPageSlugsById(CONTENTFUL_PAGE_IDS.ABOUT);
  return generateMeta({
    ...pageMetadata.about.en,
    path: pageUrls.EN,
    localizedPath: pageUrls,
  });
};

const AboutPage = async () => {
  const page = await getPageById(CONTENTFUL_PAGE_IDS.ABOUT);
  const items = getSections(page);

  return (
    <>
      <Sidemenu items={items} />
      <main>{page ? <PageRenderer page={page} /> : <NotFound />}</main>
    </>
  );
};

export default AboutPage;
