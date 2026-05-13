import { cpfCnpjField } from '@/schemas/common.schema'
import { z } from 'zod'

export const LoginFormSchema = z.object({
  cpf_cnpj: cpfCnpjField,
  password: z.string().min(8, 'Pelo menos 8 caracteres')
})

export type LoginFormType = z.infer<typeof LoginFormSchema>
