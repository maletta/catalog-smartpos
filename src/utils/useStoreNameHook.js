import { useRouter } from 'next/router';
import getStoreNameFromServer from 'utils/getStoreNameFromServer';

const useStoreNameHook = () => {
  const router = useRouter();
  const { storeCode } = router.query;

  const storeNameFromUrl = window ? getStoreNameFromServer(window.location.hostname) : null;

  const storeName = storeNameFromUrl || storeCode;

  return storeName;
};

export default useStoreNameHook;
