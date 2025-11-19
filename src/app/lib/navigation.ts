import { LANG } from './constants';
import { getNavLinks } from './contentful';

export const buildRouteMap = async (): Promise<Record<string, string>> => {
  const [svLinks, enLinks] = await Promise.all([getNavLinks(), getNavLinks(LANG.EN)]);
  const routeMap: Record<string, string> = {};

  svLinks.forEach((svLink) => {
    const enLink = enLinks.find((en) => en.sys.id === svLink.sys.id);
    if (enLink) {
      routeMap[svLink.slug] = enLink.slug;
      routeMap[enLink.slug] = svLink.slug;
    }
  });

  return routeMap;
};
