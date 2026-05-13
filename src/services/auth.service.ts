import api from '@/lib/axios'
import type { LoginFormType } from '@/schemas/auth/login.schema'
import type { RegisterForm } from '@/types/register'

export const loginUser = async (payload: LoginFormType) => {
  const response = await api.post('/auth/login', {
    type: 6,
    data: {
      cpf_cnpj: payload.cpf_cnpj,
      password: payload.password
    }
  })
  return response.data
}

export const registerUser = async (payload: RegisterForm) => {
  const response = await api.post('/user/register', payload)
  return response.data
}

export const getRecoveryMethods = async (payload: GetRecoveryMethodForm) => {
  const response = await api.post('/user/account/get-recovery-methods', payload)
  return response.data as GetRecoveryMethodResponse
}

export const requestRecoveryCode = async (payload: RequestRecoveryCodeForm) => {
  const response = await api.post('/user/account/request-recovery-code', payload)
  return response.data as RequestRecoveryCodeResponse
}

export const verifyRecoveryCode = async (payload: VerifyRecoveryCodeForm) => {
  const response = await api.post('/user/account/verify-recovery-code', payload)
  return response.data as VerifyRecoveryCodeResponse
}

export const finishResetPassword = async (payload: FinishResetPasswordForm) => {
  const response = await api.post('/user/account/finish-reset-password', payload)
  return response.data as FinishResetPasswordResponse
}
