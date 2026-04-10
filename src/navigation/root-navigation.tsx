import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MainStack } from '@/navigation/main-stack'
import { AuthStack } from '@/navigation/auth-stack'
import { navTheme } from '@/theme'
import { useAuth } from '@/providers/auth-provider'
import { ActivityIndicator } from 'react-native-paper'
import { View } from 'react-native'

export function RootNavigation () {
  const { token, isLoading } = useAuth()

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator/>
      </View>
    )
  }

  return (
    <NavigationContainer theme={navTheme}>
      <SafeAreaView style={{flex: 1}}>
        {token ? <MainStack/> : <AuthStack/>}
      </SafeAreaView>
    </NavigationContainer>
  )
}