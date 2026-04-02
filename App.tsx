import { AuthStack } from '@/navigation/AuthStack'
import { MainStack } from '@/navigation/MainStack'
import { NavigationContainer } from '@react-navigation/native'
import { PaperProvider } from 'react-native-paper'
import { SnackbarProvider } from '@/providers/SnackbarProvider'
import { navTheme, theme } from '@/theme'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { AuthProvider } from '@/providers/AuthProvider'
import { RootNavigation } from '@/navigation/RootNavigation'

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
