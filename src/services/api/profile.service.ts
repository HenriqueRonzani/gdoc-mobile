import api from '@/lib/axios'
import type { UpdateUserProfileType } from '@/types/update-profile'

export const getProfile = async () => {
  const response = await api.get('/auth/me')
  return response.data
}

export const updateProfile = async (payload: UpdateUserProfileType) => {
  const response = await api.put('/user/me', payload)
  return response.data
}
