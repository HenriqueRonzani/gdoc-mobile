
export const validateCPF = (cpfString: string): boolean => {
  const cpfDigits = cpfString.replace(/[^0-9]/g, '').split('').map(Number).filter(n => !isNaN(n))
  if (cpfDigits.length !== 11) {
    return false
  }

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += cpfDigits[i] * (10 - i)
  }

  let firstRemainder = 11 - (sum % 11)
  firstRemainder = firstRemainder >= 10 ? 0 : firstRemainder

  if (firstRemainder !== cpfDigits[9]) {
    return false
  }

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += cpfDigits[i] * (11 - i)
  }

  let secondRemainder = 11 - (sum % 11)
  secondRemainder = secondRemainder >= 10 ? 0 : secondRemainder

  return secondRemainder === cpfDigits[10]
}

export const validateCNPJ = (cnpjString: string): boolean => {
  const cnpjChars = cnpjString.replace(/[^a-zA-Z0-9]/g, '').split('').map(n => n.charCodeAt(0) - 48).filter(n => !isNaN(n))
  if (cnpjChars.length != 14) {
    return false
  }

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  let sum = 0
  for (let i = 0; i < weights1.length; i++) {
    sum += cnpjChars[i] * weights1[i]
  }

  const firstRemainder = sum % 11
  const firstVerifier = firstRemainder < 2 ? 0 : 11 - firstRemainder

  if (firstVerifier != cnpjChars[12]) {
    return false
  }

  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  sum = 0
  for (let i = 0; i < weights2.length; i++) {
    sum += cnpjChars[i] * weights2[i]
  }

  const secondRemainder = sum % 11
  const secondVerifier = secondRemainder < 2 ? 0 : 11 - secondRemainder

  return secondVerifier === cnpjChars[13]
}

export const validateCPFCNPJ = (cpfCnpj: string): boolean => {
  const onlyChars = cpfCnpj.replace(/[^a-zA-Z0-9]/g, '')
  if (onlyChars.length === 14) {
    console.log('cpf')
    return validateCNPJ(cpfCnpj)
  }
  if (onlyChars.length == 11) {
    return validateCPF(cpfCnpj)
  }
  return false
}
