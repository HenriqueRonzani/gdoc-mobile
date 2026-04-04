import { RegisterParams} from "@/types/register";
import { useState } from "react";
import { RegisterContext } from "../contexts/register-context";

export function RegisterContextProvider ({children}:{ children: React.ReactNode }) {
    const initialRegisterParams: RegisterParams = {
        type: null
    }
    const [registerParams, setRegisterParams] = useState(initialRegisterParams)

    const contextValue = {registerParams, setRegisterParams}

    return (
        <RegisterContext.Provider value={contextValue}>
            {children}
        </RegisterContext.Provider>
    )
}