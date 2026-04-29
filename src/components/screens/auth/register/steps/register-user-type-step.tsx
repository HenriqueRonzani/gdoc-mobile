import { StyleSheet, View } from 'react-native'
import { OptionCard } from '@/components/gdoc-option-card'
import individual from '@/assets/individual-icon.png'
import legal from '@/assets/legal-entity-icon.png'
import { initialRegisterParams, useRegister } from '@/providers/register-context-provider'
import { useStepper } from '@/providers/stepper-context-provider'
import { GdocGrayedButton } from '@/components/button/gdoc-grayed-button'
import { useNavigation } from '@react-navigation/native'
import type { NavigatorType } from '@/types/navigation'
import { RegisterHeader } from '@/components/screens/auth/register/register-header'
import React from 'react'

export function RegisterUserTypeStep() {
  const navigation = useNavigation<NavigatorType>()
  const {setStepName} = useStepper()
  const {setRegisterParams} = useRegister()

  const chooseType = (type: string) => {
    setRegisterParams(_ => ({
      ...initialRegisterParams,
      type: type ? 'Pessoa física' : 'Pessoa jurídica'
    }))
    setStepName(`${type}_data`)
  }

  return (
    <View style={styles.container}>
      <RegisterHeader memoTitle="Tipo de conta" memoDescription="Preencha os campos abaixo"/>

      <OptionCard
        onPress={() => chooseType('person')}
        optionName="Pessoa Física"
        imageSource={individual}
      />
      <OptionCard
        onPress={() => chooseType('organization')}
        optionName="Pessoa Jurídica"
        imageSource={legal}
      />

      <GdocGrayedButton onPress={() => navigation.navigate('Login')}>
        Voltar
      </GdocGrayedButton>
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
