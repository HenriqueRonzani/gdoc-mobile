import 'react-native-gesture-handler'
import { PaperProvider } from 'react-native-paper'
import { SnackbarProvider } from '@/providers/snackbar-provider'
import { theme } from '@/theme'
import { SafeAreaProvider,  } from 'react-native-safe-area-context'
import { AuthProvider } from '@/providers/auth-provider'
import { RootNavigation } from '@/navigation/root-navigation'

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <SnackbarProvider>
          <AuthProvider>
            <RootNavigation/>
          </AuthProvider>
        </SnackbarProvider>
      </PaperProvider>
    </SafeAreaProvider>
  )
}
