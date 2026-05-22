import api from '@/lib/axios'

export const getServices = async (serviceLetterId: number, serviceId: number) => {
  const response = await api.get(`/document/service-letter/${serviceLetterId}/view/${serviceId}/services`)
  return response.data
}

export const getCategories = async (serviceLetterId: number, serviceId: number) => {
  const response = await api.get(`/document/service-letter/${serviceLetterId}/view/${serviceId}/categories`)
  return response.data
}