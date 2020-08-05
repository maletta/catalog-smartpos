import { getSubDomain, hasDomainName, getStoreNameFromURL } from 'utils/getStoreName';

test('Retorna subdomínio', () => {
  const url = { hostname: 'sub.domain.com' };
  const result = getSubDomain(url);
  expect(result).toBe('sub');
});

test('Retorna caminho URL', () => {
  const url = { pathname: 'sub/domain/com' };
  const result = getStoreNameFromURL(url);
  expect(result).toBe('domain');
});

test('Não tem nome do domínio', () => {
  const result = hasDomainName;
  expect(result).toBe(false);
});
