import api from '@/lib/axios'
import { GetInboxParams } from '@/types/inbox'

export const getInbox = async (payload: GetInboxParams) => {
  const response = await api.get('inbox/query/external', { params: payload })

  return response.data
}
