import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

type RecoverContextFields = {
  cpfCnpj: string
  recovery_methods: RecoveryMethod[]
  chosen_method_id: number
  verification_token: string
  verification_code: string
}

type RecoverContextType = {
  recoverParams: RecoverContextFields,
  setRecoverParams: Dispatch<SetStateAction<RecoverContextFields>>
  clearRecoverParams: () => void
}

export const RecoverContext = createContext<RecoverContextType>({} as RecoverContextType)

export function useRecover() {
  const recoverContext = useContext(RecoverContext)

  if (!recoverContext) {
    throw new Error('O contexto esta sendo usado em um ambiente incorreto')
  }

  return recoverContext
}

const initialParams: RecoverContextFields = {
  cpfCnpj: '',
  recovery_methods: [],
  chosen_method_id: 0,
  verification_token: '',
  verification_code: ''
}

export function RecoverContextProvider({children}: { children: ReactNode}) {
  const [recoverParams, setRecoverParams] = useState<RecoverContextFields>(initialParams)

  const clearRecoverParams = () => setRecoverParams(initialParams)

  return (
    <RecoverContext.Provider value={{recoverParams, setRecoverParams, clearRecoverParams}}>
      {children}
    </RecoverContext.Provider>
  )
}
