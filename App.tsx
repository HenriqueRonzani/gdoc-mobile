import 'react-native-gesture-handler'
import { PaperProvider } from 'react-native-paper'
import { SnackbarProvider } from '@/providers/snackbar-provider'
import { theme } from '@/theme'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthProvider } from '@/providers/auth-provider'
import { RootNavigation } from '@/navigation/root-navigation'
import * as SplashScreen from 'expo-splash-screen'
import { OrganizationProvider, useOrganization } from '@/providers/organization-provider'
import { useEffect } from 'react'
import { LogBox } from 'react-native'

LogBox.ignoreLogs([
  "SafeAreaView has been deprecated" // No use in projects, only libs which we cannot fix
])

SplashScreen.preventAutoHideAsync().catch(() => {
})

function AppContent() {
  const {isLoading} = useOrganization()

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync()
    }
  }, [isLoading])

  if (isLoading) {
    return null
  }

  return <RootNavigation/>
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <SnackbarProvider>
          <OrganizationProvider>
            <AuthProvider>
              <AppContent/>
            </AuthProvider>
          </OrganizationProvider>
        </SnackbarProvider>
      </PaperProvider>
    </SafeAreaProvider>
  )
}
