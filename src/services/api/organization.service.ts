import api from '@/lib/axios'

const organizationId = process.env.EXPO_PUBLIC_ORGANIZATION_ID

export const getOrganization = async () => {
  const response = await api.get(`/organization/${organizationId}`)
  return response.data
}
