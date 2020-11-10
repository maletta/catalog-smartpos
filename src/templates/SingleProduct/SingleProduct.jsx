import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import SingleProductTemplate from 'containers/SingleProduct';
import Head from 'components/Head';
import slug from 'utils/slug';
import getImageDimensions from 'utils/imageDimensions';
import getStoreNameFromServer from 'utils/getStoreNameFromServer';

async function searchStore(storeFromUrl) {
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

async function searchProduct(productId, store) {
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

function getDomain(req, store, product) {
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

async function getImageProperties(product) {
  const imageUrl = product.code
    ? `${process.env.NEXT_PUBLIC_IMG_API}product/${product.code}?lastUpdate=${product.update}`
    : `${process.env.NEXT_PUBLIC_MAIN_API}/images/catalogo-share.jpg`;

  // console.log('image url ', imageUrl);
  return getImageDimensions(imageUrl).then(r => r);
}

export async function getServerSideProps(context) {
  const { req, query } = context;
  // console.log('compartilhando produto');
  // console.log('query ', query);

  const { id, storeCode } = query;

  const storeFromUrl = getStoreNameFromServer(req.headers.host) || storeCode;

  const store = await searchStore(storeFromUrl);

  const product = await searchProduct(id, store);

  const domain = getDomain(req, store, product);

  const imageProperties = await getImageProperties(product);

  const headProps = {
    description: product.description,
    imageAlt: 'uma imagem do produto compartilhado',
    imageHeight: imageProperties.dimensions.height,
    imageUrl: imageProperties.url,
    imageWidth: imageProperties.dimensions.width,
    siteName: domain.name,
    siteUrl: domain.hostDomain,
    title: store.fantasy,
  };

  // console.log('-------------------');
  // console.log('props ', headProps);
  // console.log('-------------------');
  // console.log(
  //   'redirecionar para produto ',
  //   `${domain.url}${domain.parameters}`,
  // );

  return {
    props: { headProps, domain },
  };
}


const SingleProduct = ({ headProps }) => (
  <>
    <Head {...headProps} />
    <SingleProductTemplate />
  </>
);


SingleProduct.propTypes = {
  headProps: PropTypes.shape({
    description: PropTypes.string.isRequired,
    imageWidth: PropTypes.number.isRequired,
    imageHeight: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    siteName: PropTypes.string.isRequired,
    siteUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default SingleProduct;
