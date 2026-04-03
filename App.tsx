import { AuthStack } from '@/navigation/auth-stack'
import { MainStack } from '@/navigation/main-stack'
import { NavigationContainer } from '@react-navigation/native'
import { PaperProvider } from 'react-native-paper'
import { SnackbarProvider } from '@/providers/snackbar-provider'
import { navTheme, theme } from '@/theme'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
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
