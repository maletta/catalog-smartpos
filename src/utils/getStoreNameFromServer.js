const getStoreNameFromServer = (url) => {
  const hasDomain = process.env.NEXT_PUBLIC_GET_NAME_DOMAIN;

  if (hasDomain === 'true') {
    const subdomain = url.split('.').shift();
    return subdomain;
  }
  return null;
};


export { getStoreNameFromServer as default };
