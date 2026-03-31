import axios from 'axios'

const baseUrl = process.env.EXPO_PUBLIC_GDOC_BACKEND

const api = axios.create({
  baseURL: baseUrl,
})

api.interceptors.request.use(config => {
  const token = '' // TODO: GET TOKEN

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api