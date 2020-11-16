
import getImageDimensions from 'utils/imageDimensions';
import getStoreNameFromServer from 'utils/getStoreNameFromServer';
import { getDomain, searchStore, getFavIcon } from './request';

export { default } from 'containers/GridProducts';


export async function getServerSideProps(context) {
  const { req, query } = context;
  const hasDomain = process.env.NEXT_PUBLIC_GET_NAME_DOMAIN;
  const test = {
    host: req.headers.host,
    hasDomain: hasDomain === 'true',
    envValue: process.env.NEXT_PUBLIC_GET_NAME_DOMAIN,
  };

  const { storeCode } = query;

  const categoryCode = query.categoria || '';

  const categoryName = query.nome || '';

  const storeFromUrl = getStoreNameFromServer(req.headers.host) || storeCode;

  const store = await searchStore(storeFromUrl);

  const category = {
    code: categoryCode,
    name: categoryName,
  };

  const domain = getDomain(req, store, category);

  const imageProperties = await getImageDimensions(
    `${process.env.NEXT_PUBLIC_IMG_API}/category/${categoryCode}`,
  );

  const favIcon = await getFavIcon(store);

  const headProps = {
    description: category.name,
    imageAlt: 'uma imagem genérica que representa uma categoria de produtos',
    imageHeight: imageProperties.dimensions.height,
    imageUrl: imageProperties.url,
    imageWidth: imageProperties.dimensions.width,
    favIcon,
    siteName: domain.name,
    siteUrl: domain.hostDomain,
    title: store.fantasy,
  };

  // console.log('head props ', headProps);
  // console.log(
  //   'redirecionar para categoria ',
  //   `${domain.url}${domain.parameters}`,
  // );

  return {
    props: {
      domain,
      headProps,
      context: test,
    },
  };
}
