import { z } from 'zod'

export const LoginFormSchema = z.object({
  cpf_cnpj: z.string({coerce: true}).min(5, 'Pelo menos 5 caracteres'),
  password: z.string().min(5, 'Pelo menos 5 caracteres')
})

export type LoginFormData = z.infer<typeof LoginFormSchema>