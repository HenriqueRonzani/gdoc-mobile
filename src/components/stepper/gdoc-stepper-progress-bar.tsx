import { StyleSheet, View } from 'react-native'
import { GdocText } from '../gdoc-text'
import React from 'react'
import { useStepper } from '@/providers/stepper-context-provider'

const createStepper = (progress: number, totalSteps: number) => {
  return Array.from({length: totalSteps}).map((_, index) => (
    <View
      key={index}
      style={index < progress - 1
        ? styles.completedStepper
        : index == progress - 1
          ? styles.activeStepper
          : styles.inactiveStepper}
    />
  ))
}

export function GdocStepperProgressBar() {
  const {currentStepObject, totalSteps} = useStepper()
  if (!currentStepObject) {
    return <View/>
  }

  return (
    <View style={styles.stepperContainer}>
      <View>
        <GdocText>Etapa {currentStepObject.progress} de {totalSteps}</GdocText>
      </View>
      <View style={styles.stepperSection}>
        {createStepper(currentStepObject.progress, totalSteps)}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  stepperSection: {
    flexDirection: 'row'
  },
  stepScreen: {
    flex: 1
  },
  inactiveStepper: {
    height: 10,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#AEAEAE',
    marginRight: 3
  },
  completedStepper: {
    height: 10,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#154560',
    marginRight: 3
  },
  activeStepper: {
    height: 10,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#00CE84',
    marginRight: 3
  }
})
