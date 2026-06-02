import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useSnackbar } from '@/providers/snackbar-provider'
import { getProfile } from '@/services/api/profile.service'
import { UserSessionData } from '@/types/auth-me'
import { handleRequestError } from '@/services/request-error.helper'

export type ProfileProviderData = {
  isLoading: boolean
  profile: UserSessionData
}

const ProfileContext = createContext<ProfileProviderData>({} as ProfileProviderData)

export const useProfile = () => useContext(ProfileContext)

export function ProfileProvider({children}: { children: ReactNode }) {
  const {toastError} = useSnackbar()
  const [profile, setProfile] = useState<UserSessionData>({} as UserSessionData)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const loadProfile = async () => {
    setIsLoading(true)
    try {
      const response = await getProfile()
      setProfile(response)
    } catch (error: unknown) {
      handleRequestError(error, toastError, 'Erro ao carregar perfil')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {loadProfile()}, [])

  return (
    <ProfileContext.Provider value={{profile, isLoading}}>
      {children}
    </ProfileContext.Provider>
  )
}
