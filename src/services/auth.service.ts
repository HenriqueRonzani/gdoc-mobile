import api from '@/lib/axios'
import { LoginFormType } from '@/schemas/auth.schema'
import { RegisterForm } from '@/types/register'

export const loginUser = async (payload: LoginFormType) => {
  const response = await api.post('/auth/login', {
    type: 6,
    data: {
      cpf_cnpj: payload.cpf_cnpj,
      password: payload.password
    }
  });
  return response.data;
};

export const registerUser = async (payload: RegisterForm) => {
  const response = await api.post('/user/register', payload)
  return response.data;
}
