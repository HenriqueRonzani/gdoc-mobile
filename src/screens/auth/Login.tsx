import { StyleSheet, View } from 'react-native'
import { useState } from 'react'
import { useSnackbar } from '@/providers/SnackbarProvider'
import { GdocPageTitle } from '@/components/GdocPageTitle'
import { ClientLogo } from '@/components/ClientLogo'
import { LoginForm } from '@/components/auth/login/LoginForm'
import { LoginFormData } from '@/schemas/auth.schema'
import { useNavigation } from '@react-navigation/native'
import { NavigatorType } from '@/types/navigation'
import { Text } from 'react-native-paper'
import { theme } from '@/theme'
import { loginUser } from '@/services/auth.service'
import { GdocSecondaryButton } from '@/components/button/GdocSecondaryButton'
import { useAuth } from '@/providers/AuthProvider'

export function Login() {
  const {setToken} = useAuth()
  const navigation = useNavigation<NavigatorType>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {toastError, toastSuccess} = useSnackbar()

  const login = async (formData: LoginFormData) => {
    try {
      setIsLoading(true)
      const response = await loginUser(formData)
      await setToken(response?.access_token)
      toastSuccess('Login realizado com Sucesso!')
    } catch (error) {
      console.log(error)
      toastError('Erro ao realizar login!')
    } finally {
      setIsLoading(false)
    }
  }

  const goToSignUp = () => {
    navigation.navigate('Menu')
  }

  const goToRecover = () => {
    navigation.navigate('Recover')
  }

  const footer = (
    <GdocSecondaryButton style={style.secondaryButton} onPress={goToRecover}>
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
          <Text style={{color: theme.colors.primary}} onPress={goToSignUp}
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
    paddingHorizontal: 15
  },
  containerLogo: {
    alignSelf: 'center'
  },
  secondaryButton: {
    marginTop: 2
  }
})