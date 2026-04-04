import { useContext } from "react";
import { RegisterContext } from "./register-context";

export function UseRegister() {
    const registerContext = useContext(RegisterContext)

    if (!registerContext) {
        throw new Error("O contexto esta sendo usado em um ambiente incorreto");
    }

    return registerContext;
}