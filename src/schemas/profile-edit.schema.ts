import { cnpj, cpf } from 'cpf-cnpj-validator'
import { TypeOf, z } from 'zod'
import { fullNameField, telephoneField } from '@/schemas/index'

export const ProfileEditSchema = z.object({
    name: fullNameField,
    cpfCnpj: z.string().min(14, 'CPF incompleto').refine(field => cpf.isValid(field), 'Cpf invalido'),
    dateOfBirth: z.string().min(10, 'Data incompleta').refine((field) => {
      const [day, month, year] = field.split('/').map(Number)
      const newDate = new Date(year, month - 1, day)
      return year >= 1900 && day === newDate.getDate() && month - 1 === newDate.getMonth() && year === newDate.getFullYear()
    }, 'Data invalída').transform((val) => {
      const [day, month, year] = val.replace(/\//g, '-').split('-')
      return `${year}-${month}-${day}`
    }),
    gender: z.string().min(1, 'Campo obrigatório'),
})

export type ProfileEditSchemaType = z.infer<typeof ProfileEditSchema>
