
import getImageDimensions from 'utils/imageDimensions';
import getStoreNameFromServer from 'utils/getStoreNameFromServer';
import {
  getDomain, searchStore, searchProduct, getFavIcon, getImageProperties,
} from './ssrRequest';


export async function getProductProps(context) {
  const { req, query } = context;
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

  return {
    props: { headProps, domain },
  };
}


export async function getStoreProps(context) {
  const { req, query } = context;
  const { storeCode } = query;

  const categoryCode = query.categoria || '';
  const categoryName = query.nome || '';
  const category = {
    code: categoryCode,
    name: categoryName,
  };
  const hostname = `http://${req.headers.host}`;
  const storeFromUrl = getStoreNameFromServer(req.headers.host) || storeCode;

  const store = await searchStore(storeFromUrl);

  const domain = getDomain(req, store, category);

  const favIcon = await getFavIcon(store, hostname);

  const imageProperties = categoryCode ? await getImageDimensions(
    `${process.env.NEXT_PUBLIC_IMG_API}category/${categoryCode}?lastUpdate=${new Date().toISOString()}`,
  ) : await getImageDimensions(favIcon);

  const headProps = {
    description: category.name || 'Catálogo de produtos',
    imageAlt: 'uma imagem genérica que representa uma categoria de produtos',
    imageHeight: imageProperties.dimensions.height,
    imageUrl: imageProperties.url,
    imageWidth: imageProperties.dimensions.width,
    favIcon,
    siteName: domain.name,
    siteUrl: domain.hostDomain,
    title: store.fantasy,
  };

  return {
    props: {
      domain,
      headProps,
    },
  };
}
