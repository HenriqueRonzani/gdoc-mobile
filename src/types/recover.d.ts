type RecoveryMethod = {
  type: 'email' | 'telephone'
  value: string
  id: number
}

type GetRecoveryMethodForm = {
  cpfCnpj: string
}

type GetRecoveryMethodResponse = RecoveryMethod[]

type RequestRecoveryCodeForm = {
  cpfCnpj: string
  contact_id: number
}

type RequestRecoveryCodeResponse = {
  verification_token: string
}

type VerifyRecoveryCodeForm = {
  verification_token: string
  verification_code: string
}

type VerifyRecoveryCodeResponse = {
  is_valid: true
}

type FinishResetPasswordForm = {
  password: string
  verification_code: string
  verification_token: string
}

type FinishResetPasswordResponse = {
  message: string
}
