import type { ReactNode} from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import type { Organization } from '@/types/organization'
import { getOrganization } from '@/services/api/organization.service'
import { useSnackbar } from '@/providers/snackbar-provider'
import { handleRequestError } from '@/services/request-error.helper'

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
      handleRequestError(error, toastError, 'Houve um erro ao carregar a organização')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadOrganization()
  }, [])

  return (
    <OrganizationContext.Provider value={{organization, isLoading}}>
      {children}
    </OrganizationContext.Provider>
  )
}
