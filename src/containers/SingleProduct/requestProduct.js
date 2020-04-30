import axios from 'axios';

import getVariantsOfProduct from 'api/variantsRequests';
import getModifiersOfProduct from 'api/modifiersRequests';
import getProduct from 'api/productRequests';
import getDescription from 'api/productDescription';

const listPhotos = (tenant, product) => (
  axios.get('https://slip.qa.smartpos.net.br/photo-service/v1/list',
    {
      params: {
        tenant_id: tenant,
        id: product,
      },
    })
);

const getInfoProduct = async (tenant, product) => {
  const additionalInfo = await axios.all([
    getProduct(tenant, product),
    getVariantsOfProduct(tenant, product),
    getModifiersOfProduct(tenant, product),
    getDescription(tenant, product),
    (process.env.REACT_APP_ENV !== 'production')
    && (listPhotos(tenant, product) && listPhotos(tenant, product)),
  ]);

  return {
    images: additionalInfo[4].data && additionalInfo[4].data,
    ...additionalInfo[0].data,
    variants: additionalInfo[1].data,
    modifiers: additionalInfo[2].data,
    longDescription: additionalInfo[3],
  };
};

export {
  listPhotos,
  getInfoProduct as default,
};
