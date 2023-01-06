import {useRoute, useRouter} from 'vue-router';
import {computed} from 'vue';

export const useBreadCrumbs = () => {
  const router = useRouter();
  const routeActive = useRoute();

  const getLink = (path, params) => {
    const paramsKeys = Object.keys(params);
    let linkForBreadCrumbs = path;
    paramsKeys.forEach((key) => {
      const indexParams = linkForBreadCrumbs.indexOf(`:${key}`);
      if (indexParams !== -1) {
        linkForBreadCrumbs = linkForBreadCrumbs.split('');
        linkForBreadCrumbs.splice(indexParams, key.length + 1, params[key]);
        linkForBreadCrumbs = linkForBreadCrumbs.join('');
      }
    });
    return linkForBreadCrumbs;
  };

  const breadCrumbs = computed(() => router.options.routes.reduce((links, route, index, routes) => {
    const linkForBreadCrumbs = getLink(route.path, router.currentRoute.value.params);
    if (routeActive.fullPath.includes(linkForBreadCrumbs)) {
      links.push({
        path: linkForBreadCrumbs,
        title: route.meta.titleShort,
        disabled: false,
      });
    }
    if (index === routes.length - 1) {
      links[links.length - 1].disabled = true;
    }
    return links;
  }, []));

  return {
    breadCrumbs,
  };
};
