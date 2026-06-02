import api from '@/lib/axios'
import { formatToFormData } from '@/services/create-document.helper'
import { CreateDocumentRequest, DocumentInfo, TimelineDispatch } from '@/types/document'

export const createDocument = async (payload: CreateDocumentRequest) => {
  const formData = formatToFormData(payload)
  const response = await api.post('/integration/native-login/document',
    formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  return response.data
}

export const getDocument = async (uuid: string) => {
  const response = await api.get(`/integration/native-login/document/${uuid}`)
  return response.data as DocumentInfo
}

export const getDocumentTimeline = async (uuid: string) => {
  const response = await api.get(`/integration/native-login/document/${uuid}/timeline`)
  return response.data as TimelineDispatch[]
}
