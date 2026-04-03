import { Text, View } from 'react-native'
import { useAuth } from '@/providers/auth-provider'
import { GdocPrimaryButton } from '@/components/button/gdoc-primary-button'

export function MenuScreen() {
  const {clearToken} = useAuth()
  return (
    <View>
      <Text>Isso é o menu inicial!</Text>
      <GdocPrimaryButton onPress={clearToken}>Limpar token</GdocPrimaryButton>
    </View>
  )
}