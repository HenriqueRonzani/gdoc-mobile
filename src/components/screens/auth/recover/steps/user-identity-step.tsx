import { StyleSheet, View } from 'react-native'
import { useStepper } from '@/providers/stepper-context-provider'
import { GdocGrayedButton } from '@/components/button/gdoc-grayed-button'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { NavigatorType } from '@/types/navigation'
import { theme } from '@/theme'
import { Text } from 'react-native-paper'
import { GetRecoveryMethodsFormData } from '@/schemas/recover.schema'
import { UserIdentityForm } from '@/components/screens/auth/recover/forms/user-identity-form'
import { useRecover } from '@/providers/recover-context-provider'
import { getRecoveryMethods } from '@/services/auth.service'

export function UserIdentityStep() {
  const {setStepName} = useStepper()
  const {recoverParams, setRecoverParams} = useRecover()
  const navigation = useNavigation<NavigatorType>()

  const onSubmit = async (data: GetRecoveryMethodsFormData) => {
    console.log('before', recoverParams)
    const response = await getRecoveryMethods(data)
    setRecoverParams({...recoverParams, cpfCnpj: data.cpfCnpj, recovery_methods: response})
    console.log('after', recoverParams)
    setStepName('send_verification_code_mean')
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
        <UserIdentityForm onSubmit={onSubmit} footer={footer}/>
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
