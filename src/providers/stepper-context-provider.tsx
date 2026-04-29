import type { Dispatch, SetStateAction} from 'react'
import React, { createContext, useContext, useState } from 'react'

export type StepObjectType = {
  step_name: string,
  component: React.ElementType,
  progress: number
}

type StepperContextType = {
  steps: StepObjectType[]
  currentStepObject: StepObjectType | undefined
  progress: number | undefined
  currentStepName: string
  setStepName: Dispatch<SetStateAction<string>>
  totalSteps: number
}

const StepperContext = createContext<StepperContextType>({} as StepperContextType)

export const useStepper = () => useContext(StepperContext)

type StepperProviderProps = {
  children: React.ReactNode
  initialStepName: string
  steps: StepObjectType[]
  totalSteps: number
}

export function StepperProvider({children, initialStepName, steps, totalSteps}: StepperProviderProps) {
  const [currentStepName, setStepName] = useState<string>(initialStepName)
  const currentStepObject = steps.find(i => i.step_name === currentStepName)

  return (
    <StepperContext.Provider value={{steps, currentStepObject, progress: currentStepObject?.progress, currentStepName, setStepName, totalSteps }}>
      {children}
    </StepperContext.Provider>
  )
}
