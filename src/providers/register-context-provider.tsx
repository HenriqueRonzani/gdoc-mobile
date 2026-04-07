import { RegisterParams} from "@/types/register";
import React, { createContext, useState, useContext } from 'react'

type RegisterContextType = {
  registerParams: RegisterParams;
  setRegisterParams: React.Dispatch<React.SetStateAction<RegisterParams>>;
};

export function useRegister() {
  const registerContext = useContext(RegisterContext)

  if (!registerContext) {
    throw new Error("O contexto esta sendo usado em um ambiente incorreto");
  }

  return registerContext;
}

export const RegisterContext = createContext<RegisterContextType | null>(null);

export function RegisterContextProvider ({children}:{ children: React.ReactNode }) {
    const initialRegisterParams: RegisterParams = {
        type: '',
        name: '',
        cpf_cnpj: '',
        birthday: '',
        genre: '',
        email: '',
        telephone: '',
        address: {
            city: '',
            complement: '',
            neighborhood: '',
            number: '',
            state: '',
            street: '',
            zip: ''
        },
        password: '',
        secondary_cpf: '',
        secondary_name: ''
    }
    const [registerParams, setRegisterParams] = useState(initialRegisterParams)

    const contextValue = {registerParams, setRegisterParams}

    return (
        <RegisterContext.Provider value={contextValue}>
            {children}
        </RegisterContext.Provider>
    )
}
