
import getStoreName from 'getStoreName';
import axios from 'axios';

const ManifestJson = () => {
  axios.get(`${process.env.REACT_APP_MAIN_API}/v1/loja/${getStoreName()}`)
    .then((response) => {
      const baseUrl = [window.location.protocol, '//', window.location.host, window.location.pathname].join('');
      const myDynamicManifest = {
        name: getStoreName(),
        short_name: getStoreName(),
        description: getStoreName(),
        start_url: baseUrl,
        background_color: '#ffffff',
        display: 'standalone',
        theme_color: '#0f4a73',
        icons: [{
          src: `${process.env.REACT_APP_IMG_API}store/${response.data.codigo}`,
          sizes: '256x256',
          type: 'image/png',
        }],
      };
      const stringManifest = JSON.stringify(myDynamicManifest);
      const blob = new window.Blob([stringManifest], { type: 'application/json' });
      const manifestURL = URL.createObjectURL(blob);
      document.querySelector('#manifest').setAttribute('href', manifestURL);
      document.querySelector('#icon').setAttribute('href', `${process.env.REACT_APP_IMG_API}store/${response.data.codigo}`);
    });
};

export default ManifestJson;
