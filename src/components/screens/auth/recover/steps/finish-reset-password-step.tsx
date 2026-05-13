import { StyleSheet, View } from 'react-native'
import { useStepper } from '@/providers/stepper-context-provider'
import { useNavigation } from '@react-navigation/native'
import { NavigatorType } from '@/types/navigation'
import { theme } from '@/theme'
import { Text } from 'react-native-paper'
import React, { useState } from 'react'
import { FinishResetPasswordForm } from '../forms/finish-reset-password-form'
import { GdocGrayedButton } from '@/components/button/gdoc-grayed-button'
import { FinishResetPasswordFormData } from '@/schemas/recover.schema'
import { finishResetPassword } from '@/services/auth.service'
import { useRecover } from '@/providers/recover-context-provider'
import { useSnackbar } from '@/providers/snackbar-provider'

export function FinishResetPasswordStep () {
  const navigation = useNavigation<NavigatorType>()
  const {recoverParams, clearRecoverParams} = useRecover()
  const {toast, toastError} = useSnackbar()
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (data: FinishResetPasswordFormData) => {
    try {
      setLoading(true)
      const response = await finishResetPassword({
        password: data.password,
        verification_code: recoverParams.verification_code,
        verification_token: recoverParams.verification_token
      })
      toast(response.message)

      clearRecoverParams()
      navigation.navigate('Login')
    } catch (error: any) {
      toastError('Houve um erro no registro')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Digite seu CPF ou CNPJ</Text>
        <FinishResetPasswordForm onSubmit={onSubmit} loading={loading} footer={(
          <GdocGrayedButton onPress={() => navigation.navigate('Login')}>
            Voltar
          </GdocGrayedButton>
        )}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  title: {
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: theme.colors.text,
    borderRadius: 4
  }
})
