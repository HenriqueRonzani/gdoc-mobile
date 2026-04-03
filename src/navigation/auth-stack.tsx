import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types/navigation'
import { LoginScreen } from '@/screens/auth/login-screen'
import { AuthHeader } from "@/components/auth/auth-header";
import { RecoverScreen } from '@/screens/auth/recover-screen'

const Stack = createNativeStackNavigator<RootStackParamList>()

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{
      header: () => <AuthHeader/>
    }}>
      <Stack.Screen name={'Login'} component={LoginScreen}/>
      <Stack.Screen name={'Recover'} component={RecoverScreen}/>
    </Stack.Navigator>
  )
}