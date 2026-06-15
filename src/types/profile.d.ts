import type { GENDER_ENUM } from '@/enum/gender.enum'

export type ProfileType = {
  //id: integer
  person: {
    name: string
    cpfCnpj: string
    dateOfBirth: string
    gender: keyof typeof GENDER_ENUM
    email: string
    cellphone: string
    address: {
        zip: string | null
        city: string | null
        state: string | null
        street: string | null
        number: string | null
    }
  }
}
