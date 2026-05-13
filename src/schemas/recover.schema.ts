import { z } from 'zod'
import { cpf } from 'cpf-cnpj-validator'

export const GetRecoveryMethodsFormSchema = z.object({
  cpfCnpj: z.string().min(14, 'CPF incompleto').refine((field) => cpf.isValid(field), 'Cpf invalido')
})

export type GetRecoveryMethodsFormData = z.infer<typeof GetRecoveryMethodsFormSchema>

export const VerifyRecoveryCodeFormSchema = z.object({
  verification_code: z.string()
})

export type VerifyRecoveryCodeFormData = z.infer<typeof VerifyRecoveryCodeFormSchema>

export const FinishResetPasswordFormSchema = z.object({
  password: z.string().min(8, 'Deve conter pelo menos 8 caracteres')
    .regex(/[A-Z]/, 'Deve conter pelo menos uma letra maiúscula')
    .regex(/[0-9]/, 'Deve conter pelo menos um número')
    .regex(/[^A-Za-z0-9]/, 'Deve conter pelo menos um caractere especial'),
  confirm_password: z.string().min(8, 'Deve conter menos 8 caracteres')
}).refine((data) => data.password === data.confirm_password, {
  message: 'Senhas devem ser iguais',
  path: ['confirm_password']
})

export type FinishResetPasswordFormData = z.infer<typeof FinishResetPasswordFormSchema>
