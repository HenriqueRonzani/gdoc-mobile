import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types/navigation'
import { Login } from '@/screens/auth/Login'
import { AuthHeader } from "@/components/auth/AuthHeader";
import { Recover } from '@/screens/auth/Recover'

const Stack = createNativeStackNavigator<RootStackParamList>()

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{
      header: () => <AuthHeader/>
    }}>
      <Stack.Screen name={'Login'} component={Login}/>
      <Stack.Screen name={'Recover'} component={Recover}/>
    </Stack.Navigator>
  )
}