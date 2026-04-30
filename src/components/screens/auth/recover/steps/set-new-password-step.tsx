import { StyleSheet, View } from 'react-native'
import { useStepper } from '@/providers/stepper-context-provider'
import { useNavigation } from '@react-navigation/native'
import { NavigatorType } from '@/types/navigation'
import { theme } from '@/theme'
import { Text } from 'react-native-paper'
import React from 'react'
import { SetNewPasswordForm } from '@/components/screens/auth/recover/forms/set-new-password-form'
import { GdocGrayedButton } from '@/components/button/gdoc-grayed-button'

export function SetNewPasswordStep () {
  const navigation = useNavigation<NavigatorType>()


  const onSubmit = (data: unknown) => {
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Digite seu CPF ou CNPJ</Text>
        <SetNewPasswordForm onSubmit={onSubmit} footer={(
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
