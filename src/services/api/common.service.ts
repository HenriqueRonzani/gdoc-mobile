import api from '@/lib/axios'
import type { BackendPagination } from '@/types/commom'

export const loadNextPage = async <T>(url: string, params?: object) => {
  const response = await api.get(url, params)
  return response.data as BackendPagination<T>
}
