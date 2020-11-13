import { useRouter } from 'next/router';
import getStoreNameFromServer from 'utils/getStoreNameFromServer';

const useStoreNameHook = () => {
  const router = useRouter();
  const { storeCode } = router.query;
  const hasDomainName = process.env.NEXT_PUBLIC_GET_NAME_DOMAIN === 'true';

  const storeName = hasDomainName ? getStoreNameFromServer(router.pathname) : storeCode;

  return storeName;
};

export default useStoreNameHook;
