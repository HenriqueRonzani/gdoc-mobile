import { StyleSheet, View } from 'react-native'
import type { RegisterPersonFormData } from '@/schemas/auth/register.schema'
import { useRegister } from '@/providers/register-context-provider'
import { useStepper } from '@/providers/stepper-context-provider'
import { GdocGrayedButton } from '@/components/button/gdoc-grayed-button'
import { PersonForm } from '@/components/screens/auth/register/forms/person-form'
import { RegisterHeader } from '@/components/screens/auth/register/register-header'
import React from 'react'

export function RegisterPersonStep() {
  const {setRegisterParams} = useRegister()
  const {setStepName} = useStepper()

  const submit = (data: RegisterPersonFormData) => {
    setRegisterParams(prev => ({
      ...prev,
      person: {
        ...prev.person, ...data
      }
    }))
    setStepName('address')
  }

  const footer = (
    <GdocGrayedButton
      onPress={() => setStepName('user_type')}
    >
      Voltar
    </GdocGrayedButton>
  )

  return (
    <View style={styles.container}>
      <RegisterHeader memoTitle="Dados pessoais" memoDescription="Complete os campos abaixo"/>

      <PersonForm onSubmit={submit} footer={footer}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 15,
    paddingBottom: 10,
    gap: 8
  }
})
