import api from '@/lib/axios'

export const getInbox = async (filter: string, search: string) => {
  try {
    console.log("AUTH HEADER ATUAL:", api.defaults.headers.common.Authorization)

    const response = await api.get(`/inbox/query/external?tab=${filter}`)

    return response.data
  } catch (error) {
    console.log("ERRO NO getInbox:", error)
    throw error
  }
}