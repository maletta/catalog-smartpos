const getStoreNameFromServer = (url) => {
  if (process.env.NEXT_PUBLIC_GET_NAME_DOMAIN === 'true') {
    const subdomain = url.split('.').shift();
    return subdomain;
  }
  return null;
};

const getStoreNameFromBrowser = () => getStoreNameFromServer(window.location.hostname);

export { getStoreNameFromServer as default, getStoreNameFromBrowser };
