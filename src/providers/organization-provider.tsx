import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Organization } from '@/types/organization'
import { getOrganization } from '@/services/organization.service'
import { useSnackbar } from '@/providers/snackbar-provider'

export type OrganizationProviderData = {
  isLoading: boolean
  organization: Organization
}

const OrganizationContext = createContext<OrganizationProviderData>({} as OrganizationProviderData)

export const useOrganization = () => useContext(OrganizationContext)

export function OrganizationProvider({children}: { children: ReactNode }) {
  const {toastError} = useSnackbar()
  const [organization, setOrganization] = useState<Organization>({} as Organization)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loadOrganization = async () => {
    setIsLoading(true)
    try {
      const response = await getOrganization()
      setOrganization(response)
    } catch (error: unknown) {
      toastError('Houve um erro ao carregar a organização')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {loadOrganization()}, [])

  return (
    <OrganizationContext.Provider value={{organization, isLoading}}>
      {children}
    </OrganizationContext.Provider>
  )
}
