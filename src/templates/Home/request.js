import {
  searchStore as searchStoreSSR,
  getDomain as getDomainSSR,
  getFavIcon as getFavIconSSR,
} from 'api/ssrRequest';

export async function searchStore(storeFromUrl) {
  return searchStoreSSR(storeFromUrl);
}


export function getDomain(req, store, product) {
  return getDomainSSR(req, store, product);
}

export async function getFavIcon(store) {
  return getFavIconSSR(store);
}
