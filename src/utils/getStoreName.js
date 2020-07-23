export const hasDomainName = process.env.REACT_APP_GET_NAME_DOMAIN === 'true';
export const getSubDomain = url => url.hostname.split('.')[0];
export const getStoreNameFromURL = url => url.pathname.split('/')[1];

export const getStoreName = () => {
  const fn = hasDomainName ? getSubDomain : getStoreNameFromURL;
  return fn(window.location);
};

export const getBaseName = () => {
  const result = hasDomainName ? '' : getStoreNameFromURL(window.location);
  return `/${result}`;
};

export default getStoreName;
