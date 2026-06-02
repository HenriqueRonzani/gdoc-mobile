import api from '@/lib/axios'
import { Service, Subject } from '@/types/service'

export const getRootServiceLetter = async (serviceLetterId: number) => {
  const response = await api.get(`/integration/native-login/service-letter/${serviceLetterId}/services`)
  return response.data as { data: Subject[] }
}

export const getServiceLetterByCategory = async (serviceLetterId: number, categoryId: number) => {
  const response = await api.get(`/integration/native-login/service-letter/${serviceLetterId}/services/${categoryId}/items`)
  return response.data as { data: Subject[] }
}

export const getService = async (serviceLetterId: number, serviceId: number) => {
  const response = await api.get(`/integration/native-login/service-letter/${serviceLetterId}/services/${serviceId}/details`)
  return response.data as Service
}
