import axios from 'axios';
import slug from 'utils/slug';
import getImageDimensions from 'utils/imageDimensions';


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
      update: response.data.atualizacao,
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
      update: null,

    };
  }
  // console.log(store);
  return store;
}


export async function searchProduct(productId, store) {
  const url = `${process.env.NEXT_PUBLIC_MAIN_API}/v1/loja/${store.tenantId}/produtos/${productId}`;
  // console.log('-------------------');
  // console.log('procurando produto');
  return axios
    .get(url)
    .then((response) => {
      const productFetched = response.data;
      const product = {
        code: productFetched.codigo,
        description: productFetched.descricao,
        observation: productFetched.observacao,
        tenantId: productFetched.tenant_id,
        update: productFetched.atualizacao,
      };
      // console.log(product);
      return product;
    })
    .catch(() => {
      const product = {
        code: null,
        description: 'Não encontrado',
        observation: 'Não encontrado',
        tenantId: null,
        update: null,
      };
      // console.log(product);
      return product;
    });
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

export async function getImageProperties(product) {
  const imageUrl = product.code
    ? `${process.env.NEXT_PUBLIC_IMG_API}product/${product.code}?lastUpdate=${product.update}`
    : `${process.env.NEXT_PUBLIC_MAIN_API}/images/catalogo-share.jpg`;

  return getImageDimensions(imageUrl).then(r => r);
}

export async function getFavIcon(store) {
  if (store.code) {
    return `${process.env.NEXT_PUBLIC_IMG_API}store/${store.code}?lastUpdate=${store.update}`;
  }
  return '/favicon.png';
}
