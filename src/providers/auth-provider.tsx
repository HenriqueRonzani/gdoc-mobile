import React, { createContext, useContext, useEffect, useState } from 'react'
import { clearAuthToken, getAuthToken, setAuthToken } from '@/services/auth.storage'
import api from '@/lib/axios'
import { isAxiosError } from 'axios'
import { useSnackbar } from '@/providers/snackbar-provider'

type AuthContextType = {
  token: string | null
  setToken: (token: string) => Promise<void>
  clearToken: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({children}: { children: React.ReactNode }) {
  const {toastError} = useSnackbar()
  const [token, setLocalToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    async function loadToken() {
      try {
        setLocalToken(await getAuthToken())
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    loadToken()
  }, [])

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error: unknown) => {
        if (isAxiosError(error) && error?.response && error.response.status === 401) {
          console.log('Sessão Expirada')
          toastError('Sessão Expirada')
          await clearToken()
        }

        return Promise.reject(error)
      }
    )
    return ()=> {
      api.interceptors.response.eject(interceptor)
    }
  }, [])

  const setToken = async (token: string) => {
    await setAuthToken(token)
    setLocalToken(token)
  }

  const clearToken = async () => {
    await clearAuthToken()
    setLocalToken(null)
  }

  return (
    <AuthContext.Provider value={{token, setToken, clearToken, isLoading}}>
      {children}
    </AuthContext.Provider>
  )
}
