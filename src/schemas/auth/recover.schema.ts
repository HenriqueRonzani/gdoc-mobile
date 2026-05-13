import { z } from 'zod'
import { cpfCnpjField, createPasswordField, obligatoryStringField } from '@/schemas/common.schema'

export const GetRecoveryMethodsFormSchema = z.object({
  cpfCnpj: cpfCnpjField
})

export const VerifyRecoveryCodeFormSchema = z.object({
  verification_code: obligatoryStringField
})

export const FinishResetPasswordFormSchema = z.object({
  password: createPasswordField,
  confirm_password: z.string().min(8, 'Deve conter menos 8 caracteres')
}).refine((data) => data.password === data.confirm_password, {
  message: 'Senhas devem ser iguais',
  path: ['confirm_password']
})

export type GetRecoveryMethodsFormData = z.infer<typeof GetRecoveryMethodsFormSchema>
export type VerifyRecoveryCodeFormData = z.infer<typeof VerifyRecoveryCodeFormSchema>
export type FinishResetPasswordFormData = z.infer<typeof FinishResetPasswordFormSchema>
