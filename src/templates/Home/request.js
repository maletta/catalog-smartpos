
import axios from 'axios';
import slug from 'utils/slug';

export async function searchStore(storeFromUrl) {
  const url = `${process.env.NEXT_PUBLIC_MAIN_API}/v1/loja/${storeFromUrl}`;
  // console.log('-------------------');
  // console.log('procurando loja');
  let store = null;
  try {
    store = await axios.get(url).then(response => ({
      tenantId: response.data.id,
      code: response.data.codigo,
      user: response.data.usuario,
      fantasy: response.data.fantasia,
    }));
  } catch (err) {
    // const {
    //   response: { statusText, headers, config },
    // } = err;
    // console.log('erro ao buscar loja ', statusText, headers, config);
    store = {
      tenantId: null,
      code: null,
      user: null,
      fantasy: 'Smartpos',
    };
  }
  // console.log(store);
  return store;
}


export function getDomain(req, store, product) {
  const hostDomain = `https://${req.headers.host}${req.url}`;
  if (store.tenantId && product) {
    return {
      name: store.fantasy,
      url: process.env.NEXT_PUBLIC_MAIN_API.replace('slip', store.user),
      parameters: `/item/${product.code}/${slug(product.description)}`,
      hostDomain,
    };
  }
  return {
    name: 'Smartpos',
    url: 'https://www.smartpos.net.br',
    parameters: '',
    hostDomain,
  };
}
