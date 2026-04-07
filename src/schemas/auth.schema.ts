import { cnpj, cpf } from 'cpf-cnpj-validator'
import { z } from 'zod'
import api from "@/lib/axios"
import { telephoneField } from '@/schemas/index'

export const LoginFormSchema = z.object({
  cpf_cnpj: z.string({coerce: true}).min(5, 'Pelo menos 5 caracteres'),
  password: z.string().min(5, 'Pelo menos 5 caracteres')
})

export const RegisterFormPersonSchema = z.object({
  name: z.string().min(1, "Campo obrigatório").regex(/^\S+\s+\S+/ , "O nome deve incluir nome e sobrenome"),
  cpf_cnpj: z.string().min(14, "CPF incompleto").refine((field) => cpf.isValid(field), "Cpf invalido"),
  birthday: z.string().min(10, "Data incompleta").refine((field) => {
    const [day,month,year] = field.split("/").map(Number)
    const newDate = new Date(year, month - 1, day)
    return year >= 1900 && day == newDate.getDate() && month - 1 == newDate.getMonth() && year == newDate.getFullYear()
  }, "Data invalída"),
  genre: z.string().min(1,"Campo obrigatório"),
  email: z.string().min(1,"Campo obrigatório").email("Email inválido"),
  telephone: telephoneField
})

export const RegisterFormCompanySchema = z.object({
  name: z.string().min(1, "Campo obrigatorio"),
  cpf_cnpj: z.string().min(18, "Cnpj incompleto").refine((field) => cnpj.isValid(field), "Cnpj invalido"),
  email: z.string().min(1,"Campo obrigatorio").email("Email invalido"),
  telephone: telephoneField,
  secondary_name:  z.string().min(1, "Campo obrigatorio").regex(/^\S+\s\S+$/,"O nome deve incluir nome e sobrenome"),
  secondary_cpf: z.string().min(14, "Cpf incompleto").refine((field) => cpf.isValid(field), "Cpf invalido"),
})

export const RegisterFormAddressSchema = z.object({
  street: z.string().min(1,"Campo obrigatorio"),
  number: z.string().min(1,"Campo obrigatorio"),
  neighborhood: z.string().min(1,"Campo obrigatorio"),
  city: z.string().min(1,"Campo obrigatorio"),
  state: z.string().min(1,"Campo obrigatorio"),
  zip: z.string().min(1,"Campo obrigatorio"),
  complement: z.string(),
  password: z.string().min(8, 'Pelo menos 8 caracteres')
  .regex(/[A-Z]/, "Precisa ter pelo menos uma letra maiúscula")
  .regex(/[0-9]/, "Precisa ter pelo menos um número")
  .regex(/[^A-Za-z0-9]/, "Precisa ter pelo menos um caractere especial"),
  confirm_password: z.string().min(8, 'Pelo menos 8 caracteres')
  .regex(/[A-Z]/, "Precisa ter pelo menos uma letra maiúscula")
  .regex(/[0-9]/, "Precisa ter pelo menos um número")
  .regex(/[^A-Za-z0-9]/, "Precisa ter pelo menos um caractere especial"),

}).refine((data) => data.password === data.confirm_password, {
  message:"Senhas não combinam",
  path: ["confirmPassword"]
})

export type RegisterPersonFormData = z.infer<typeof RegisterFormPersonSchema>
export type RegisterCompanyFormData = z.infer<typeof RegisterFormCompanySchema>
export type RegisterFormAddressData = z.infer<typeof RegisterFormAddressSchema>

export type LoginFormData = z.infer<typeof LoginFormSchema>
