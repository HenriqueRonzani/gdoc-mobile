import { z } from 'zod'
import {
  cnpjField,
  cpfField,
  createPasswordField, dateField,
  emailField,
  obligatoryStringField,
  fullNameField,
  telephoneField
} from  '@/schemas/common.schema'

export const RegisterFormPersonSchema = z.object({
  name: fullNameField,
  email: emailField,
  cellphone: telephoneField,
  cpfCnpj: cpfField,
  gender: obligatoryStringField,
  dateOfBirth: dateField
})

export const RegisterFormOrganizationSchema = z.object({
  name: obligatoryStringField,
  email: emailField,
  cellphone: telephoneField,
  cpfCnpj: cnpjField,
  secondary_name: fullNameField,
  secondary_cpf_cnpj: cnpjField
})

export const RegisterFormAddressSchema = z.object({
  street: obligatoryStringField,
  number: obligatoryStringField,
  neighborhood: obligatoryStringField,
  city: obligatoryStringField,
  state: obligatoryStringField,
  zip: obligatoryStringField,
  complement: z.string(),
  password: createPasswordField,
  confirm_password: z.string().min(8, 'Deve conter menos 8 caracteres')
}).refine(data => data.password === data.confirm_password, {
  message: 'Senhas devem ser iguais',
  path: ['confirm_password']
})

export type RegisterPersonFormData = z.infer<typeof RegisterFormPersonSchema>
export type RegisterOrganizationFormData = z.infer<typeof RegisterFormOrganizationSchema>
export type RegisterFormAddressData = z.infer<typeof RegisterFormAddressSchema>
