import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MainDrawer } from '@/navigation/main-drawer'
import { AuthStack } from '@/navigation/auth-stack'
import { navTheme } from '@/theme'
import { useAuth } from '@/providers/auth-provider'
import { ActivityIndicator } from 'react-native-paper'
import { View } from 'react-native'
import { ProfileProvider } from '@/providers/profile-provider'

export function RootNavigation() {
  const {token, isLoading} = useAuth()

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
        {
          token
            ? (
              <ProfileProvider>
                <MainDrawer/>
              </ProfileProvider>
            )
            : <AuthStack/>
        }
      </SafeAreaView>
    </NavigationContainer>
  )
}
