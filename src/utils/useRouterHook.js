import { useRouter } from 'next/router';
import { useGlobalContext } from 'contexts/GlobalContext/context/hooks';

const useRouterHook = () => {
  const router = useRouter();
  const { globalContext } = useGlobalContext();
  const push = (url, as, options) => {
    let newUrl = {
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

    router.push(
      newUrl,
      as,
      options,
    );
  };

  return {
    push,
  };
};

export default useRouterHook;
