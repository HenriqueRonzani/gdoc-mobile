import AuthStack from './navigation/AuthStack.js'
import MainStack from './navigation/MainStack.js'
import { NavigationContainer } from '@react-navigation/native'
import { PaperProvider } from 'react-native-paper'
import { SnackbarProvider } from './providers/SnackbarProvider.js'

export default function App() {
  const isLogged = true
  return (
    <PaperProvider>
      <SnackbarProvider>
        <NavigationContainer>
          {isLogged ? <MainStack/> : <AuthStack/>}
        </NavigationContainer>
      </SnackbarProvider>
    </PaperProvider>
  )
}
