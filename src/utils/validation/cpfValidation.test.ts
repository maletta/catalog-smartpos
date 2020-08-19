import isValidCPF, {
  convertTextToArrayOfNumbers,
  calculateCPFSum,
} from './cpfValidation'

test('Retorna verdadeiro com cpf válido', () => {
  expect(isValidCPF('21506422047')).toBe(true)
  expect(isValidCPF('63145490001')).toBe(true)
  expect(isValidCPF('93125537045')).toBe(true)
})

test('Retorna falso com cpf inválido', () => {
  expect(isValidCPF('21506422011')).toBe(false)
  expect(isValidCPF('63145490022')).toBe(false)
  expect(isValidCPF('93125537044')).toBe(false)
})

test('Retorna falso se o cpf for menor que 11 dígitos', () => {
  expect(isValidCPF('1234')).toBe(false)
})

test('Retorna falso se o cpf for apenas zeros', () => {
  expect(isValidCPF('00000000000')).toBe(false)
})

test('Converte texto de números para um array de números', () => {
  const result = convertTextToArrayOfNumbers('123')
  expect(result[0]).toBe(1)
  expect(result[1]).toBe(2)
  expect(result[2]).toBe(3)
})

test('Soma os dígitos do cpf de acordo com a fórmula', () => {
  const result = calculateCPFSum([9, 3, 1, 2, 5, 5, 3, 7, 0])
  expect(result).toBe(227)
})
