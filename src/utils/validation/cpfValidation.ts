function isValidCPF(cpf: string): boolean {
  if (cpf.length !== 11 || cpf === '00000000000')
    return false;

  const firstDigits = convertTextToArrayOfNumbers(cpf.slice(0, 9));
  const sum = calculateCPFSum(firstDigits);
  const remainder = calculateRemainder(sum);

  const firstVerifierDigit = Number(cpf.slice(9, 10));
  if (remainder !== firstVerifierDigit)
    return false;

  const secondSum = calculateCPFSum([...firstDigits, firstVerifierDigit]);
  const secondRemainder = calculateRemainder(secondSum);

  const lastVerifierDigit = Number(cpf.slice(10, 11));
  if (secondRemainder !== lastVerifierDigit)
    return false;

  return true;
}

export default isValidCPF;

function calculateRemainder(sum: number): number {
  const remainder = (sum * 10) % 11;
  return [10, 11].includes(remainder) ? 0 : remainder;
}

export function convertTextToArrayOfNumbers(text: string): number[] {
  return text.split('').map(Number);
}

export function calculateCPFSum(digits: number[]): number {
  const length = digits.length + 1;
  return digits.reduce((total, current, index) => {
    return current * (length - index) + total;
  }, 0);
}
