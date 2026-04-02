import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './types'
import Login from '@/screens/auth/Login'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Login'} component={Login}/>
    </Stack.Navigator>
  )
}