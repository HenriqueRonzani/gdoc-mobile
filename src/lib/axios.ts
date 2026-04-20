import axios from 'axios'

const baseUrl = process.env.EXPO_PUBLIC_GDOC_BACKEND

const api = axios.create({
  baseURL: baseUrl
})

export const setApiToken = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`
}

export default api
