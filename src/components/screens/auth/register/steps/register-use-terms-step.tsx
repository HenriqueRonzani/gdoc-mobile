import { StyleSheet, View } from 'react-native'
import { useStepper } from '@/providers/stepper-context-provider'
import { GdocGrayedButton } from '@/components/button/gdoc-grayed-button'
import { GdocUseTerms } from '@/components/screens/auth/register/forms/gdoc-use-terms'
import React, { useState } from 'react'
import { GdocConfirmRecaptcha } from '@/components/form/gdoc-confirm-recaptcha'
import { useRegister } from '@/providers/register-context-provider'
import { registerUser } from '@/services/api/auth.service'
import { useSnackbar } from '@/providers/snackbar-provider'
import { useAuth } from '@/providers/auth-provider'
import { RegisterHeader } from '@/components/screens/auth/register/register-header'
import { handleRequestError } from '@/services/request-error.helper'

export function RegisterUseTermsStep() {
  const {setToken} = useAuth()
  const {registerParams} = useRegister()
  const {setStepName} = useStepper()
  const {toastError, toastSuccess} = useSnackbar()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (token: string) => {
    try {
      setLoading(true)
      const result = await registerUser({
        ...registerParams,
        'g-recaptcha-response': token
      })
      await setToken(result?.auth_token)
      toastSuccess('Registro realizado com sucesso')
    } catch (error: unknown) {
      handleRequestError(error, toastError, 'Houve um erro no registro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <RegisterHeader memoTitle="Termos e condições" memoDescription="Complete os campos abaixo"/>

      <GdocUseTerms/>
      <GdocConfirmRecaptcha onSubmit={onSubmit} loading={loading}/>

      <GdocGrayedButton onPress={() => setStepName('address')}>
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
    paddingBottom: 10,
    gap: 8
  }
})
