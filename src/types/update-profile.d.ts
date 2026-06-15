export type AddressForm = {
  zip?: string | null
  state?: string | null
  city?: string | null
  street?: string | null
  number?: string | null
};

export type ContactForm = {
  id?: number
  name?: string | null
  value?: string
  type?: string
  is_verified?: boolean
}

export type UpdateUserProfileType = {
  name?: string
  cpfCnpj?: string
  dateOfBirth?: string
  gender?: string
  nationality?: string
  place_of_birth?: string | null
  mother_name?: string | null

  contacts?: ContactForm[]

  address?: AddressForm
}

