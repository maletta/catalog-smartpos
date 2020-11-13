import ReactGA from 'react-ga';

const trackPageView = (url) => {
  const pathname = url.split('?').shift();
  ReactGA.set({ page: pathname });
  ReactGA.pageview(`${window.location.hostname}${url}`);
};

const initGA = () => {
  if (process.env.NEXT_PUBLIC_ENV === 'production') {
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA);
    return trackPageView;
  }
  return () => {};
};

export default initGA;
