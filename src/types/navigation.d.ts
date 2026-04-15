import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Login: undefined,
  Register: undefined
  Menu: undefined,
}

export type NavigatorType = NativeStackNavigationProp<RootStackParamList>
