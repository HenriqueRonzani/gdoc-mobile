import { useStepper } from '@/providers/stepper-context-provider'
import { View } from 'react-native'
import React from 'react'

export function GdocStepperContent() {
  const {currentStepObject} = useStepper()
  if (!currentStepObject) {
    return <View/>
  }
  const CurrentScreen = currentStepObject.component
  return (
    <View style={{flex: 1}}>
      <CurrentScreen/>
    </View>
  )
}
