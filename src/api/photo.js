import axios from 'axios';

const listPhotos = (tenant, product) => (
  axios.get(`${process.env.NEXT_PUBLIC_PHOTO_SERVICE}list/`,
    {
      params: {
        tenant_id: tenant,
        id: product,
      },
    })
);
export default listPhotos;
