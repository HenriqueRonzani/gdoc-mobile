import { RegisterParams } from "@/types/register";
import { createContext } from "react";

type RegisterContextType = {
  registerParams: RegisterParams;
  setRegisterParams: React.Dispatch<React.SetStateAction<RegisterParams>>;
};
export const RegisterContext = createContext<RegisterContextType | null>(null);