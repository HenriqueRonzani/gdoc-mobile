import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Login: undefined,
  Menu: undefined,
  Register: undefined
  Recover: undefined
}

export type NavigatorType = NativeStackNavigationProp<RootStackParamList>
