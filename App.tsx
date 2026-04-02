import AuthStack from '@/navigation/AuthStack'
import MainStack from '@/navigation/MainStack'
import { NavigationContainer } from '@react-navigation/native'
import { PaperProvider } from 'react-native-paper'
import { SnackbarProvider } from '@/providers/SnackbarProvider'
import { navTheme, theme } from "@/theme";

export default function App() {
  const isLogged = false
  return (
    <PaperProvider theme={theme}>
      <SnackbarProvider>
        <NavigationContainer theme={navTheme}>
          {isLogged ? <MainStack/> : <AuthStack/>}
        </NavigationContainer>
      </SnackbarProvider>
    </PaperProvider>
  )
}
