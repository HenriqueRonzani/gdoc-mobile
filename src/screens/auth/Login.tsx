import { View } from 'react-native'
import { Text, Button } from 'react-native-paper'
import { loginUser } from '@/services/authService.js'
import { useState } from 'react'
import { useSnackbar } from '@/providers/SnackbarProvider.js'

export default function Login() {
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const { toast } = useSnackbar()

  const login = async () => {
    try {
      setIsLoading(true)
      await loginUser('user', 'pass')
      toast('Login realizado com sucesso!')
    } catch (error) {
      console.log(error)
      toast('Erro ao realizar login!')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <View>
      <Text>Isso é uma tela de login!</Text>
      <Button onPress={login}>Login</Button>
      { isLoading && <Text>Loading</Text> }
    </View>
  )
}