import slug from 'utils/slug';

test('Retorna um texto vazio ao receber um text vazio', () => {
  const result = slug('');
  expect(result).toBe('');
});

test('Retorna um texto vazio ao não receber um texto', () => {
  const result = slug();
  expect(result).toBe('');
});

test('Substitui caracteres (A) não compatíveis com uma URL', () => {
  const result = slug('àÀáÁâÂãäÄÅåª');
  expect(result).toBe('a');
});

test('Substitui caracteres (E) não compatíveis com uma URL', () => {
  const result = slug('èÈéÉêÊëË');
  expect(result).toBe('e');
});

test('Substitui caracteres (I) não compatíveis com uma URL', () => {
  const result = slug('aÎbïcÏd');
  expect(result).toBe('aibicid');
});

test('Substitui caracteres (O) não compatíveis com uma URL', () => {
  const result = slug('òÒóÓôÔõÕöÖº');
  expect(result).toBe('o');
});

test('Substitui caracteres (U) não compatíveis com uma URL', () => {
  const result = slug('ùÙúÚûÛüÜ');
  expect(result).toBe('u');
});

test('Substitui caracteres (%) não compatíveis com uma URL', () => {
  const result = slug('%');
  expect(result).toBe('pct');
});

test('Retorna um texto ao receber um número', () => {
  const result = slug(123);
  expect(result).toBe('123');
});

test('Retorna um texto ao receber um número com casas decimais', () => {
  const result = slug(123.12);
  expect(result).toBe('12312');
});
