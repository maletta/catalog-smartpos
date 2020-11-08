import ReactGA from 'react-ga';

const trackPageView = (location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(`${window.location.hostname}${location.pathname}${location.search}`);
};

const initGA = (history) => {
  if (process.env.NEXT_PUBLIC_ENV === 'production') {
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA);
    trackPageView(history.location);
    // history.listen(trackPageView);
  }
};

export default initGA;
