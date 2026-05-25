import api from '@/lib/axios'
import { Subject } from '@/types/service'

export const getRootServiceLetter = async (serviceLetterId: number) => {
  const response = await api.get(`/integration/native-login/service-letter/${serviceLetterId}/services`)
  return response.data as { data: Subject[] }
}

export const getServiceLetterService = async (serviceLetterId: number, categoryId: number) => {
  const response = await api.get(`/integration/native-login/service-letter/${serviceLetterId}/services/${categoryId}/items`)
  return response.data as { data: Subject[] }
}
