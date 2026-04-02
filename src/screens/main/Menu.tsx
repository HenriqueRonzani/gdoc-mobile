import { Text, View } from 'react-native'
import { useAuth } from '@/providers/AuthProvider'
import { GdocPrimaryButton } from '@/components/button/GdocPrimaryButton'

export function Menu() {
  const {clearToken} = useAuth()
  return (
    <View>
      <Text>Isso é o menu inicial!</Text>
      <GdocPrimaryButton onPress={clearToken}>Limpar token</GdocPrimaryButton>
    </View>
  )
}