import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { GdocGrayedButton } from '@/components/button/gdoc-grayed-button'
import { useStepper } from '@/providers/stepper-context-provider'
import { VerifyRecoveryCodeForm } from '../forms/verify-recovery-code-form'
import { theme } from '@/theme'
import { Text } from 'react-native-paper'
import { VerifyRecoveryCodeFormData } from '@/schemas/auth/recover.schema'
import { verifyRecoveryCode } from '@/services/api/auth.service'
import { useRecover } from '@/providers/recover-context-provider'
import { useSnackbar } from '@/providers/snackbar-provider'
import { handleRequestError } from '@/services/request-error.helper'

export function VerifyRecoveryCodeStep() {
  const {setStepName} = useStepper()
  const {recoverParams, setRecoverParams} = useRecover()
  const [loading, setLoading] = useState<boolean>(false)
  const {toastError} = useSnackbar()

  const onSubmit = async (data: VerifyRecoveryCodeFormData) => {
    try {
      setLoading(true)
      const response = await verifyRecoveryCode({
        verification_token: recoverParams.verification_token,
        verification_code: data.verification_code
      })

      if (!response.is_valid) {
        toastError('Código invalido')
        return
      }

      setRecoverParams({
        ...recoverParams,
        verification_code: data.verification_code
      })
      setStepName('finish_reset_password')
    } catch (error: unknown) {
      handleRequestError(error, toastError, 'Houve um erro')
    } finally {
      setLoading(false)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Enviamos um código para henri************@gmail.com</Text>
        <VerifyRecoveryCodeForm
          onSubmit={onSubmit}
          loading={loading}
          footer={(
            <GdocGrayedButton onPress={() => setStepName('request_recovery_code')}>
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
    justifyContent: 'space-between',
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
