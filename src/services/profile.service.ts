import api from '@/lib/axios'

export const getProfile = async () => {

  console.log('TOKEN:')
  console.log(api.defaults.headers.common.Authorization)

  const response = await api.get('/auth/me')

  return response.data
}