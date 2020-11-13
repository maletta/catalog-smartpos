import { useRouter } from 'next/router';
import { useGlobalContext } from 'contexts/GlobalContext/context/hooks';

const useRouterHook = () => {
  const router = useRouter();
  const { globalContext } = useGlobalContext();

  const push = (url, as, options) => {
    let newUrl = url;
    const hasDomainName = process.env.NEXT_PUBLIC_GET_NAME_DOMAIN === 'true';

    if (!hasDomainName) {
      newUrl = {
        pathname: url,
        query: {
          storeCode: globalContext.storeContext.storeName,
        },
      };

      if (typeof url === 'object') {
        newUrl = {
          pathname: url.pathname,
          query: {
            ...url.query,
            storeCode: globalContext.storeContext.storeName,
          },
        };
      }
    }

    router.push(
      newUrl,
      as,
      options,
    );
  };

  return {
    ...router,
    push,
  };
};

export default useRouterHook;
