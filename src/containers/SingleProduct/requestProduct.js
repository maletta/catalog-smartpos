import axios from 'axios';

import getVariantsOfProduct from 'api/variantsRequests';
import getModifiersOfProduct from 'api/modifiersRequests';
import getProduct from 'api/productRequests';

const getInfoProduct = async (tenant, product) => {

  const additionalInfo = await axios.all([
    getProduct(tenant, product),
    getVariantsOfProduct(tenant, product),
    getModifiersOfProduct(tenant, product),
  ]);

  return {
    ...additionalInfo[0].data,
    variants: additionalInfo[1].data,
    modifiers: additionalInfo[2].data,
  };

};

export default getInfoProduct;
