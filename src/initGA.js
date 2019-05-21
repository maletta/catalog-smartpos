import ReactGA from 'react-ga';

const initGA = () => {
  if (process.env.REACT_APP_ENV === 'production') {
    ReactGA.initialize(process.env.REACT_APP_GA);
    ReactGA.set({ page: window.location.hostname });
    ReactGA.pageview(`${window.location.hostname}${window.location.search}`);
  }
};

export default initGA;
