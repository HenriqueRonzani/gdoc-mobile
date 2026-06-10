import api from '@/lib/axios'
import type { BackendPagination } from '@/types/commom'
import type { GetInboxParams, InboxDocument } from '@/types/inbox'

export const getInbox = async (payload: GetInboxParams) => {
  const response = await api.get('inbox/query/external', { params: payload })

  return response.data as BackendPagination<InboxDocument>
}
