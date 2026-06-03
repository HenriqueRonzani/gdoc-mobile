import { StyleSheet, View } from 'react-native'
import { useStepper } from '@/providers/stepper-context-provider'
import { GdocGrayedButton } from '@/components/button/gdoc-grayed-button'
import React, { useState } from 'react'
import { Text } from 'react-native-paper'
import { theme } from '@/theme'
import { useRecover } from '@/providers/recover-context-provider'
import { VerificationMethod } from '@/components/screens/auth/recover/verification-method'
import { requestRecoveryCode } from '@/services/api/auth.service'
import { useSnackbar } from '@/providers/snackbar-provider'
import { handleRequestError } from '@/services/request-error.helper'

export function RequestRecoveryCodeStep() {
  const {setStepName} = useStepper()
  const {recoverParams, setRecoverParams} = useRecover()
  const [loading, setLoading] = useState<boolean>(false)
  const {toastError} = useSnackbar()

  const choseMethod = async (methodId: number) => {
    try {
      setLoading(true)
      const response = await requestRecoveryCode({
        cpfCnpj: recoverParams.cpfCnpj,
        contact_id: methodId
      })
      setRecoverParams({...recoverParams, chosen_method_id: methodId, verification_token: response.verification_token})
      setStepName('verify_recovery_code')
    } catch (error: unknown) {
      handleRequestError(error, toastError, 'Houve um erro')
    } finally {
      setLoading(false)
    }
  }

  const recoveryMethods = recoverParams.recovery_methods

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Escolha um contato para receber o código de recuperação</Text>
        {loading ? (
          <View/>
        ) : (
          <View style={{gap: 8}}>
            {recoveryMethods.map(i => (
              <VerificationMethod
                key={i.id}
                method={i}
                onClick={choseMethod}
              />
            ))}
          </View>
        )}

        <GdocGrayedButton onPress={() => setStepName('get_recovery_methods')}>
          Voltar
        </GdocGrayedButton>
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
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: theme.colors.text,
    borderRadius: 4
  },
  sendMeanItem: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: theme.colors.text,
    borderRadius: 4,
    gap: 4
  },
  sendMeanTitle: {
    fontWeight: 'bold'
  },
  whatsappIcon: {
    width: 40,
    height: 40,
    marginVertical: 10
  }
})
