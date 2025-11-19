import { PageRenderer } from '../../components/PageRenderer';
import { CONTENTFUL_PAGE_IDS, LANG } from '@/app/lib/constants';
import { getSections } from '../../lib/helpers';
import { Sidemenu } from '../../components/Sidemenu';
import { generateMetadata as generateMeta, pageMetadata } from '../../lib/metadata';
import { getPageById, getLocalizedPageSlugsById } from '@/app/lib/contentful';
import NotFound from '@/app/components/NotFound';

export const generateMetadata = async () => {
  const pageUrls = await getLocalizedPageSlugsById(CONTENTFUL_PAGE_IDS.SERVICES);
  return generateMeta({
    ...pageMetadata.services.sv,
    path: pageUrls.SV,
    localizedPath: pageUrls,
  });
};

const ServicePage = async () => {
  const page = await getPageById(CONTENTFUL_PAGE_IDS.SERVICES, LANG.SV);
  const items = getSections(page);

  return (
    <>
      <Sidemenu items={items} />
      <main>{page ? <PageRenderer page={page} /> : <NotFound />}</main>
    </>
  );
};

export default ServicePage;
