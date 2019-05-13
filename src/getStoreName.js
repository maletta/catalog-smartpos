const getStoreName = () => {
  if (process.env.REACT_APP_ENV === 'production') {
    const parts = window.location.hostname.split('.');
    const subdomain = parts.shift();
    return subdomain;
  }
  return window.location.pathname.split('/').slice(-1)[0];
};

export default getStoreName;
