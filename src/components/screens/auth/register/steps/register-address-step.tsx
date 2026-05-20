import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native'
import type { RegisterFormAddressData} from '@/schemas/auth/register.schema'
import { RegisterFormAddressSchema } from '@/schemas/auth/register.schema'
import type { Address } from '@/types/register'
import { useRegister } from '@/providers/register-context-provider'
import { useStepper } from '@/providers/stepper-context-provider'
import { AddressForm } from '@/components/screens/auth/register/forms/address-form'
import { GdocGrayedButton } from '@/components/button/gdoc-grayed-button'
import { GdocForm } from '@/components/form/gdoc-form'
import { RegisterHeader } from '@/components/screens/auth/register/register-header'
import React from 'react'

const initialForm = {
  city: '',
  complement: '',
  confirm_password: '',
  neighborhood: '',
  number: '',
  password: '',
  state: '',
  street: '',
  zip: ''
}

export function RegisterAddressStep() {
  const {setStepName} = useStepper()
  const {registerParams, setRegisterParams} = useRegister()

  const onSubmit = (data: RegisterFormAddressData) => {
    const address: Address = {
      zip: data.zip,
      city: data.city,
      complement: data.complement,
      neighborhood: data.neighborhood,
      number: data.number,
      state: data.state,
      street: data.street
    }
    setRegisterParams(prev => ({
      ...prev,
      person: {...prev.person, address: address},
      password: data.password
    }))
    setStepName('use_terms')
  }

  const footer = (
    <GdocGrayedButton onPress={() => {
      if (registerParams.type === 'Pessoa física')
        setStepName('person_data')
      else
        setStepName('company_data')
    }}
    >Voltar</GdocGrayedButton>)

  return (
    <View style={styles.container}>
      <RegisterHeader memoTitle="Endereço e senha" memoDescription="Complete os campos abaixo"/>

      <ScrollView keyboardShouldPersistTaps="handled">
        <GdocForm
          initial={{
            ...initialForm,
            ...registerParams.person.address,
            ...registerParams
          }}
          schema={RegisterFormAddressSchema}
          onSubmit={onSubmit}
          confirmLabel="Próximo"
          footer={footer}
        >
          <AddressForm/>
        </GdocForm>
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
