import { getPageById, getLocalizedPageSlugsById } from '@/app/lib/contentful';
import { PageRenderer } from '../../../components/PageRenderer';
import { Sidemenu } from '../../../components/Sidemenu';
import { CONTENTFUL_PAGE_IDS } from '../../../lib/constants';
import { getSections } from '../../../lib/helpers';
import { generateMetadata as generateMeta, pageMetadata } from '../../../lib/metadata';
import NotFound from '@/app/components/NotFound';

export const generateMetadata = async () => {
  const pageUrls = await getLocalizedPageSlugsById(CONTENTFUL_PAGE_IDS.INVESTMENTSTRATEGY);
  return generateMeta({
    ...pageMetadata.etimo_ventures.en,
    path: pageUrls.EN,
    localizedPath: pageUrls,
  });
};

const EtimoVenturesPage = async () => {
  const page = await getPageById(CONTENTFUL_PAGE_IDS.INVESTMENTSTRATEGY);
  const items = getSections(page);

  return (
    <>
      <Sidemenu items={items} />
      <main>{page ? <PageRenderer page={page} /> : <NotFound />}</main>
    </>
  );
};

export default EtimoVenturesPage;
