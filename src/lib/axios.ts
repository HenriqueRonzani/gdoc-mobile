import { getAuthToken } from '@/services/auth.storage'
import axios from 'axios'

const baseUrl = process.env.EXPO_PUBLIC_GDOC_BACKEND

const api = axios.create({
  baseURL: baseUrl
})

export const setApiToken = (token: string) => {
  
}

api.interceptors.request.use(async config => {
  const token = await getAuthToken()
  config.headers.Authorization = `Bearer ${token}`

  return config
})

export default api
