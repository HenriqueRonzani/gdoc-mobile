import { StyleSheet, View } from 'react-native'
import { useStepper } from '@/providers/stepper-context-provider'
import { GdocGrayedButton } from '@/components/button/gdoc-grayed-button'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NavigatorType } from '@/types/navigation'
import { theme } from '@/theme'
import { Text } from 'react-native-paper'
import { GetRecoveryMethodsFormData } from '@/schemas/auth/recover.schema'
import { GetRecoveryMethodsForm } from '../forms/get-recovery-methods-form'
import { useRecover } from '@/providers/recover-context-provider'
import { getRecoveryMethods } from '@/services/api/auth.service'
import { useSnackbar } from '@/providers/snackbar-provider'
import { handleRequestError } from '@/services/request-error.helper'

export function GetRecoveryMethodsStep() {
  const {setStepName} = useStepper()
  const {recoverParams, setRecoverParams} = useRecover()
  const [loading, setLoading] = useState<boolean>(false)
  const navigation = useNavigation<NavigatorType>()
  const {toastError} = useSnackbar()

  const onSubmit = async (data: GetRecoveryMethodsFormData) => {
    try {
      setLoading(true)
      const response = await getRecoveryMethods(data)
      setRecoverParams({...recoverParams, cpfCnpj: data.cpfCnpj, recovery_methods: response})
      setStepName('request_recovery_code')
    } catch (error: any) {
      handleRequestError(error, toastError, 'Houve um erro')
    } finally {
      setLoading(false)
    }
  }

  const footer = (
    <GdocGrayedButton onPress={() => navigation.navigate('Login')}>
      Voltar
    </GdocGrayedButton>
  )

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Digite seu CPF ou CNPJ</Text>
        <GetRecoveryMethodsForm loading={loading} onSubmit={onSubmit} footer={footer}/>
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
