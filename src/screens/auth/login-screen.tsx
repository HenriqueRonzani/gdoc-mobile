import { StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { useSnackbar } from '@/providers/snackbar-provider'
import { GdocPageTitle } from '@/components/gdoc-page-title'
import { ClientLogo } from '@/components/client-logo'
import { LoginForm } from '@/components/screens/auth/login/login-form'
import type { LoginFormType } from '@/schemas/auth/login.schema'
import { useNavigation } from '@react-navigation/native'
import type { NavigatorType } from '@/types/navigation'
import { Text } from 'react-native-paper'
import { theme } from '@/theme'
import { loginUser } from '@/services/api/auth.service'
import { GdocSecondaryButton } from '@/components/button/gdoc-secondary-button'
import { useAuth } from '@/providers/auth-provider'
import { handleRequestError } from '@/services/request-error.helper'

export function LoginScreen() {
  const {setToken} = useAuth()
  const navigation = useNavigation<NavigatorType>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {toastError, toastSuccess} = useSnackbar()

  const login = async (formData: LoginFormType) => {
    try {
      setIsLoading(true)
      const response = await loginUser(formData)
      await setToken(response?.access_token)
      toastSuccess('Login realizado com Sucesso!')
    } catch (error) {
      handleRequestError(error, toastError, 'Erro ao realizar login!')
    } finally {
      setIsLoading(false)
    }
  }

  const goToRecover = () => {
    navigation.navigate('Recover')
  }

  const goToRegister = () => {
    navigation.navigate('Register')
  }

  const footer = (
    <GdocSecondaryButton style={style.secondaryButton} onPress={goToRegister}>
      CRIAR CONTA G-DOC
    </GdocSecondaryButton>
  )

  return (
    <View style={style.container}>
      <GdocPageTitle>Acessar Plataforma G-Doc</GdocPageTitle>
      <ClientLogo style={style.containerLogo}/>
      <LoginForm onSubmit={login} isLoading={isLoading} footer={footer}>
        <Text style={{color: theme.colors.text, fontWeight: 'bold'}}>
          Problemas ao acessar?
          <Text style={{color: theme.colors.primary}} onPress={goToRecover}
          > Recupere sua conta
          </Text>
        </Text>
      </LoginForm>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 15,
    paddingBottom: 10
  },
  containerLogo: {
    alignSelf: 'center'
  },
  secondaryButton: {
    marginTop: 2
  }
})
