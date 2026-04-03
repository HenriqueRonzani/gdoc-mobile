import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/types/navigation'
import { MenuScreen } from '@/screens/main/menu-screen'

const Stack = createNativeStackNavigator<RootStackParamList>()

export function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Menu'} component={MenuScreen}/>
    </Stack.Navigator>
  )
}