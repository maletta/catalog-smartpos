export const hasDomainName = process.env.NEXT_PUBLIC_GET_NAME_DOMAIN === 'true';
export const getSubDomain = url => url.hostname.split('.')[0];
export const getStoreNameFromURL = url => url.pathname.split('/')[1];

const getStoreName = () => {
  const fn = hasDomainName ? getSubDomain : getStoreNameFromURL;
  const location = { pathname: '/smartposbr' };// window.location
  return fn(location);
};

export const getBaseName = () => {
  const result = hasDomainName ? '' : getStoreNameFromURL({ pathname: '/smartposbr' });// window.location
  return `/${result}`;
};

export default getStoreName;
