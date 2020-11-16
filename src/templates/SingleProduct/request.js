import {
  searchStore as searchStoreSSR,
  searchProduct as searchProductSSR,
  getDomain as getDomainSSR,
  getImageProperties as getImagePropertiesSSR,
  getFavIcon as getFavIconSSR,
} from 'api/ssrRequest';


export async function searchStore(storeFromUrl) {
  return searchStoreSSR(storeFromUrl);
}

export async function searchProduct(productId, store) {
  return searchProductSSR(productId, store);
}

export function getDomain(req, store, product) {
  return getDomainSSR(req, store, product);
}

export async function getImageProperties(product) {
  return getImagePropertiesSSR(product);
}

export async function getFavIcon(store) {
  return getFavIconSSR(store);
}
