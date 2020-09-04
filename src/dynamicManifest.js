import axios from 'axios';

import getStoreName from 'utils/getStoreName';

const { REACT_APP_MAIN_API, REACT_APP_IMG_API } = process.env;
const storeName = getStoreName();
const pathURL = store => `${REACT_APP_MAIN_API}/v1/loja/${store}`;
const baseUrl = url => `${url.protocol}//${url.host}${url.pathname}`;

const getIconPath = (props) => {
  const { codigo, atualizacao } = props;
  return `${REACT_APP_IMG_API}/store/${codigo}?lastUpdate=${atualizacao}`;
};

const generateManifestURL = (manifest) => {
  const stringManifest = JSON.stringify(manifest);
  const blob = new window.Blob([stringManifest], { type: 'application/json' });
  return URL.createObjectURL(blob);
};

const setHrefInElement = (element, value) => document.querySelector(element).setAttribute('href', value);

const generateManifest = (response) => {
  const iconPath = getIconPath(response.data);
  const manifest = {
    name: storeName,
    short_name: storeName,
    description: storeName,
    start_url: baseUrl(window.location),
    background_color: '#ffffff',
    display: 'standalone',
    theme_color: '#0f4a73',
    icons: [{
      src: iconPath,
      sizes: '123x123',
      type: 'image/png',
    }],
  };

  setHrefInElement('#manifest', generateManifestURL(manifest));
  setHrefInElement('#icon', iconPath);
};

const requestStoreAndCreateManifest = () => {
  axios.get(pathURL(storeName)).then(generateManifest);
};

export default requestStoreAndCreateManifest;
