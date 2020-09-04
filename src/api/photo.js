import axios from 'axios';

const { REACT_APP_PHOTO_SERVICE } = process.env;
const listPhotos = (tenant, product) => (
  axios.get(`${REACT_APP_PHOTO_SERVICE}/list/`,
    {
      params: {
        tenant_id: tenant,
        id: product,
      },
    })
);
export default listPhotos;
