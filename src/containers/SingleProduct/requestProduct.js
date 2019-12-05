import axios from 'axios';

import getVariantsOfProduct from 'api/variantsRequests';
import getModifiersOfProduct from 'api/modifiersRequests';
import getProduct from 'api/productRequests';
import getDescription from 'api/productDescription';

const getInfoProduct = async (tenant, product) => {
  const additionalInfo = await axios.all([
    getProduct(tenant, product),
    getVariantsOfProduct(tenant, product),
    getModifiersOfProduct(tenant, product),
    getDescription(tenant, product),
  ]);

  return {
    ...additionalInfo[0].data,
    variants: additionalInfo[1].data,
    modifiers: additionalInfo[2].data,
    longDescription: additionalInfo[3],
  };
};

export default getInfoProduct;
