import { RegisterParams} from "@/types/register";
import { useState } from "react";
import { RegisterContext } from "../contexts/register-context";

export function RegisterContextProvider ({children}:{ children: React.ReactNode }) {
    const initialRegisterParams: RegisterParams = {
        type: null,
        name: null,
        cpf_cnpj: null,
        birthday: null,
        genre: null,
        email: null,
        telephone: null,
        address: {
            city: null,
            complement: null,
            neighborhood: null,
            number: null,
            state: null,
            street: null,
            zip: null
        },
        password: null,
        secondary_cpf: null,
        secondary_name: null
    }
    const [registerParams, setRegisterParams] = useState(initialRegisterParams)

    const contextValue = {registerParams, setRegisterParams}

    return (
        <RegisterContext.Provider value={contextValue}>
            {children}
        </RegisterContext.Provider>
    )
}