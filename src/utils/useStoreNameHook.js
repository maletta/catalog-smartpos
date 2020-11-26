// import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import getStoreNameFromServer from 'utils/getStoreNameFromServer';

const useStoreNameHook = () => {
  // const router = useRouter();
  // const { storeCode } = router.query;
  // const aux = typeof window  === 'object'
  // ? getStoreNameFromServer(window.location.hostname) : null;
  // const [storeName, setStoreName] = useState(aux || storeCode);


  // useEffect( () => {
  //   console.log('stoerNameHook ', storeCode, router)
  //   const aux = window ? getStoreNameFromServer(window.location.hostname) : null;
  //   setStoreName(aux || storeCode)
  // },[router.query]);

  // return storeName;

  const router = useRouter();
  const { storeCode } = router.query;

  const storeNameFromUrl = typeof window === 'object' ? getStoreNameFromServer(window.location.hostname) : null;

  const storeName = storeNameFromUrl || storeCode;

  return storeName;
};

export default useStoreNameHook;
