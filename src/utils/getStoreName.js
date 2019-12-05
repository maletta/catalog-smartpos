const getStoreName = () => {
  if (process.env.REACT_APP_GET_NAME_DOMAIN === 'true') {
    const parts = window.location.hostname.split('.');
    const subdomain = parts.shift();
    return subdomain;
  }
  return window.location.pathname.split('/').slice(-1)[0];
};

const getBaseName = () => {
  if (process.env.REACT_APP_GET_NAME_DOMAIN === 'true') {
    return '/';
  }
  return `/${getStoreName()}`;
};

export {
  getStoreName as default,
  getBaseName,
};
