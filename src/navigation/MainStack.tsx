import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './types'
import Menu from '@/screens/main/Menu'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Menu'} component={Menu}/>
    </Stack.Navigator>
  )
}