import { cnpj, cpf } from 'cpf-cnpj-validator'
import { z } from 'zod'
import { fullNameField, telephoneField } from '@/schemas/index'

export const LoginFormSchema = z.object({
  cpf_cnpj: z.string({coerce: true}).min(5, 'Pelo menos 5 caracteres'),
  password: z.string().min(5, 'Pelo menos 5 caracteres')
})

export const RegisterFormPersonSchema = z.object({
  name: fullNameField,
  email: z.string().min(1, 'Campo obrigatório').email('Email inválido'),
  cellphone: telephoneField,
  cpfCnpj: z.string().min(14, 'CPF incompleto').refine((field) => cpf.isValid(field), 'Cpf invalido'),
  gender: z.string().min(1, 'Campo obrigatório'),
  dateOfBirth: z.string().min(10, 'Data incompleta').refine((field) => {
    const [day, month, year] = field.split('/').map(Number)
    const newDate = new Date(year, month - 1, day)
    return year >= 1900 && day == newDate.getDate() && month - 1 == newDate.getMonth() && year == newDate.getFullYear()
  }, 'Data invalída').transform((val) => {
    const [day, month, year] = val.replace(/\//g, '-').split('-')
    return `${year}-${month}-${day}`
  })
})

export const RegisterFormOrganizationSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório'),
  email: z.string().min(1, 'Campo obrigatório').email('Email invalido'),
  cellphone: telephoneField,
  cpfCnpj: z.string().min(18, 'Cnpj incompleto').refine((field) => cnpj.isValid(field), 'Cnpj invalido'),
  secondary_name: fullNameField,
  secondary_cpf_cnpj: z.string().min(14, 'Cpf incompleto').refine((field) => cpf.isValid(field), 'Cpf invalido')
})

export const RegisterFormAddressSchema = z.object({
  street: z.string().min(1, 'Campo obrigatório'),
  number: z.string().min(1, 'Campo obrigatório'),
  neighborhood: z.string().min(1, 'Campo obrigatório'),
  city: z.string().min(1, 'Campo obrigatório'),
  state: z.string().min(1, 'Campo obrigatório'),
  zip: z.string().min(1, 'Campo obrigatório'),
  complement: z.string(),
  password: z.string().min(8, 'Deve conter pelo menos 8 caracteres')
    .regex(/[A-Z]/, 'Deve conter pelo menos uma letra maiúscula')
    .regex(/[0-9]/, 'Deve conter pelo menos um número')
    .regex(/[^A-Za-z0-9]/, 'Deve conter pelo menos um caractere especial'),
  confirm_password: z.string().min(8, 'Deve conter menos 8 caracteres')

}).refine((data) => data.password === data.confirm_password, {
  message: 'Senhas devem ser iguais',
  path: ['confirm_password']
})


export type RegisterPersonFormData = z.infer<typeof RegisterFormPersonSchema>
export type RegisterOrganizationFormData = z.infer<typeof RegisterFormOrganizationSchema>
export type RegisterFormAddressData = z.infer<typeof RegisterFormAddressSchema>

export type LoginFormType = z.infer<typeof LoginFormSchema>
