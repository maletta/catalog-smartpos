
import getStoreNameFromServer from 'utils/getStoreNameFromServer';
import {
  getDomain, getImageProperties, getFavIcon, searchProduct, searchStore,
} from './request';

export { default } from 'containers/SingleProduct';


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

  const favIcon = await getFavIcon(store);

  const headProps = {
    description: product.description,
    imageAlt: 'uma imagem do produto compartilhado',
    imageHeight: imageProperties.dimensions.height,
    imageUrl: imageProperties.url,
    imageWidth: imageProperties.dimensions.width,
    favIcon,
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
