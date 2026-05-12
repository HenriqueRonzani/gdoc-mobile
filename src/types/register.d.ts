export type RegisterForm = {
  contactOrganization: string | null
  'g-recaptcha-response': string
  icp_hash: string
  icp_issuer_display_name: ''
  login_type: 6
  origin: 'external'
  person: Person
  provider: Provider
  password: string
  type: string | 'Pessoa física' | 'Pessoa jurídica'
}

export type Person = {
  address: Address
  cellphone: string
  cpfCnpj: string
  dateOfBirth: string
  email: string
  gender: string
  name: string
  secondaryCpfCnpj: string
  textualSignature: string | null
}

export type Address = {
  city: string
  complement: string
  neighborhood: string
  number: string
  state: string
  street: string
  zip: string
}

export type Provider = {
  avatar: string | null
  id: string | null
  name: string | null
}
