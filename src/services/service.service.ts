import api from '@/lib/axios'
import { CreateDocumentRequest, Service, Subject } from '@/types/service'
import { formatToFormData } from '@/services/create-document.helper'

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

export const createDocument = async (payload: CreateDocumentRequest) => {
  const formData = formatToFormData(payload)
  console.log('formattedFormData', formData)
  const response = await api.post('/integration/native-login/document',
    formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  console.log('response', response)
  return response.data
}
