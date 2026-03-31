import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './types.js'
import Login from '../screens/auth/Login.js'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Login'} component={Login}/>
    </Stack.Navigator>
  )
}