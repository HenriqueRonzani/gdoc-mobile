import type { ReactNode} from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { useSnackbar } from '@/providers/snackbar-provider'
import { getProfile } from '@/services/api/profile.service'
import { handleRequestError } from '@/services/request-error.helper'
import type { ProfileType } from '@/types/profile'

export type ProfileProviderData = {
  isLoading: boolean
  profile: ProfileType
  reloadProfile: () => void
}

const ProfileContext = createContext<ProfileProviderData>({} as ProfileProviderData)

export const useProfile = () => useContext(ProfileContext)

export function ProfileProvider({children}: { children: ReactNode }) {
  const {toastError} = useSnackbar()
  const [profile, setProfile] = useState<ProfileType>({} as ProfileType)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const reloadProfile = async () => {
    try {
      const response = await getProfile()
      setProfile(response)
    } catch (error: unknown) {
      handleRequestError(error, toastError, 'Erro ao carregar perfil')
    }
  }

  useEffect(() => {
    const loadProfile = async () => {
      await reloadProfile()
      setIsLoading(false)
    }
    loadProfile()
  }, [])

  return (
    <ProfileContext.Provider value={{profile, isLoading, reloadProfile}}>
      {children}
    </ProfileContext.Provider>
  )
}
