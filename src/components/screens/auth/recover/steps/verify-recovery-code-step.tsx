import { StyleSheet, View } from 'react-native'
import React from 'react'
import { GdocGrayedButton } from '@/components/button/gdoc-grayed-button'
import { useStepper } from '@/providers/stepper-context-provider'
import { VerifyRecoveryCodeForm } from '../forms/verify-recovery-code-form'
import { theme } from '@/theme'
import { Text } from 'react-native-paper'
import { VerifyRecoveryCodeFormData } from '@/schemas/recover.schema'
import { verifyRecoveryCode } from '@/services/auth.service'
import { useRecover } from '@/providers/recover-context-provider'
import { useSnackbar } from '@/providers/snackbar-provider'

export function VerifyRecoveryCodeStep() {
  const {setStepName} = useStepper()
  const {recoverParams, setRecoverParams} = useRecover()
  const {toastError} = useSnackbar()

  const onSubmit = async (data: VerifyRecoveryCodeFormData) => {
    const response = await verifyRecoveryCode({
      verification_token: recoverParams.verification_token,
      verification_code: data.verification_code
    })

    if (!response.is_valid) {
      toastError('Erro')
    }

    setRecoverParams({
      ...recoverParams,
      verification_code: data.verification_code
    })
    setStepName('finish_reset_password')
  }
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Enviamos um código para henri************@gmail.com</Text>
        <VerifyRecoveryCodeForm
          onSubmit={onSubmit}
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
