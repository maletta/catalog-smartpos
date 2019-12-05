import axios from 'axios';

const getDescription = async (tenant, product) => {
  try {
    const description = await axios.get(`${process.env.REACT_APP_MAIN_API}/v1/loja/${tenant}/produtos/${product}/observacao/`);
    return description.data.longDescription;
  } catch (e) {
    return null;
  }
};

export default getDescription;
