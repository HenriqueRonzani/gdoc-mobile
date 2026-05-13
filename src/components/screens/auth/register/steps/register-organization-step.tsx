import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native'
import type { RegisterOrganizationFormData } from '@/schemas/auth/register.schema'
import { useRegister } from '@/providers/register-context-provider'
import { useStepper } from '@/providers/stepper-context-provider'
import { OrganizationForm } from '@/components/screens/auth/register/forms/organization-form'
import { GdocGrayedButton } from '@/components/button/gdoc-grayed-button'
import { RegisterHeader } from '@/components/screens/auth/register/register-header'
import React from 'react'

export function RegisterOrganizationStep() {
  const {setStepName} = useStepper()
  const {setRegisterParams} = useRegister()

  const onSubmit = (data: RegisterOrganizationFormData) => {
    setRegisterParams(prev => ({
      ...prev,
      person: {
        ...prev.person, ...data
      }
    }))
    setStepName('address')
  }

  const footer = (
    <GdocGrayedButton onPress={() => setStepName('user_type')}>
      Voltar
    </GdocGrayedButton>
  )

  return (
    <View style={styles.container}>
      <RegisterHeader memoTitle="Dados pessoais" memoDescription="Complete os campos abaixo"/>

      <ScrollView keyboardShouldPersistTaps="handled">
        <OrganizationForm onSubmit={onSubmit} footer={footer}/>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 15,
    gap: 8
  }
})
