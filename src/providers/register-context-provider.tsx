import { RegisterForm } from '@/types/register'
import React, { createContext, useState, useContext } from 'react'

type RegisterContextType = {
  registerParams: RegisterForm;
  setRegisterParams: React.Dispatch<React.SetStateAction<RegisterForm>>;
};

export function useRegister() {
  const registerContext = useContext(RegisterContext)

  if (!registerContext) {
    throw new Error('O contexto esta sendo usado em um ambiente incorreto')
  }

  return registerContext
}

export const RegisterContext = createContext<RegisterContextType | null>(null)

export const initialRegisterParams: RegisterForm = {
  contactOrganization: null,
  'g-recaptcha-response': '',
  icp_hash: '',
  icp_issuer_display_name: '',
  login_type: 6,
  origin: 'external',
  password: '',
  person: {
    address: {
      city: '',
      complement: '',
      neighborhood: '',
      number: '',
      state: '',
      street: '',
      zip: ''
    },
    cellphone: '',
    cpfCnpj: '',
    dateOfBirth: '',
    email: '',
    gender: '',
    name: '',
    secondaryCpfCnpj: '',
    textualSignature: null,
  },
  provider: {
    avatar: null,
    id: null,
    name: null
  },
  type: '',
}

export function RegisterContextProvider({children}: { children: React.ReactNode }) {
  const [registerParams, setRegisterParams] = useState(initialRegisterParams)

  const contextValue = {registerParams, setRegisterParams}

  return (
    <RegisterContext.Provider value={contextValue}>
      {children}
    </RegisterContext.Provider>
  )
}
