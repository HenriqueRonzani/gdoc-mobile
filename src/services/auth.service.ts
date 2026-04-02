import api from '@/lib/axios'
import { LoginFormData } from '@/schemas/auth.schema'

export const loginUser = async (payload: LoginFormData) => {
  const response = await api.post('/auth/login', {
    type: 6,
    data: {
      cpf_cnpj: payload.cpf_cnpj,
      password: payload.password
    }
  });
  return response.data;
};