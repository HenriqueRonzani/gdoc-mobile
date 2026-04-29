import React, { createContext, useContext, useEffect, useState } from 'react'
import { clearAuthToken, getAuthToken, setAuthToken } from '@/services/auth.storage'
import { setApiToken } from '@/lib/axios'

type AuthContextType = {
  token: string | null
  setToken: (token: string) => Promise<void>
  clearToken: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({children}: { children: React.ReactNode }) {
  const [token, setLocalToken] = useState<string|null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    async function loadToken () {
      try {
        setLocalToken(await getAuthToken())
        if (token) setApiToken(token)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    loadToken()
  }, [token])

  const setToken = async (token: string) => {
    await setAuthToken(token)
    setLocalToken(token)
  }

  const clearToken = async () => {
    await clearAuthToken()
    setLocalToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, setToken, clearToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
