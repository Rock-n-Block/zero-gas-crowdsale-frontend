import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

interface UseAnchorLinkArgs {
  scrollToTopOnEmpty?: boolean;
  behavior?: ScrollBehavior;
  offset?: number;
}

const defaultConfig: Required<UseAnchorLinkArgs> = {
  scrollToTopOnEmpty: true,
  behavior: 'smooth',
  offset: 0,
};

function useAnchorLink(): void;
function useAnchorLink(props: UseAnchorLinkArgs): void;
/**
 * @description allow to scroll to anchors on the different pages, find elements by `name` property, if it hasn't found, searches by `id` property
 * @param {boolean} [scrollToTopOnEmpty] - flag which allow to scroll page to the top if hash is empty
 * @param {ScrollBehavior} [behavior] - set scroll behavior
 */
function useAnchorLink(props?: UseAnchorLinkArgs) {
  const config = useMemo<Required<UseAnchorLinkArgs>>(
    () => ({
      scrollToTopOnEmpty: props?.scrollToTopOnEmpty || defaultConfig.scrollToTopOnEmpty,
      behavior: props?.behavior || defaultConfig.behavior,
      offset: props?.offset || defaultConfig.offset,
    }),
    [props?.behavior, props?.offset, props?.scrollToTopOnEmpty],
  );
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    const { scrollToTopOnEmpty, behavior } = config;
    // if not a hash link, scroll to top
    if (hash === '' && scrollToTopOnEmpty) {
      window.scrollTo(0, 0);
    }
    // else scroll to id
    else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.querySelector(`[name=${id}]`) || document.querySelector(`#${id}`);
        if (element) {
          element.scrollIntoView({
            behavior,
          });
        }
      }, 0);
    }
  }, [pathname, hash, key, config]); // do this on route change
}

export default useAnchorLink;
