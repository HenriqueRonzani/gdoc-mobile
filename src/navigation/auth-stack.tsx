import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types/navigation'
import { LoginScreen } from '@/screens/auth/login-screen'
import { AuthHeader } from "@/components/screens/auth/auth-header";
import { RegisterScreen } from '@/screens/auth/register-screen'

const Stack = createNativeStackNavigator<RootStackParamList>()

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{
      header: () => <AuthHeader/>
    }}>
      <Stack.Screen name={'Login'} component={LoginScreen}/>
      <Stack.Screen name={'Register'} component={RegisterScreen}/>
    </Stack.Navigator>
  )
}