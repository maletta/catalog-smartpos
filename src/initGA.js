import ReactGA from 'react-ga';

const initGA = () => {
  if (window.location.hostname !== 'localhost') {
    ReactGA.initialize(process.env.REACT_APP_GA);
    ReactGA.set({ page: window.location.hostname });
    ReactGA.pageview(`${window.location.hostname}${window.location.search}`);
  }
};

export default initGA;
