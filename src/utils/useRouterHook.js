import { useContext } from 'react';
import { useRouter } from 'next/router';
import ShopContext from 'contexts/ShopContext';

const useRouterHook = () => {
  const router = useRouter();
  const { shop } = useContext(ShopContext);

  const push = (url, as, options) => {
    let newUrl = url;
    const hasDomainName = process.env.NEXT_PUBLIC_GET_NAME_DOMAIN === 'true';

    if (!hasDomainName) {
      newUrl = {
        pathname: url,
        query: {
          storeCode: shop.storeName,
        },
      };

      if (typeof url === 'object') {
        newUrl = {
          pathname: url.pathname,
          query: {
            ...url.query,
            storeCode: shop.storeName,
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
