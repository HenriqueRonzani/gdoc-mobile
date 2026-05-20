import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type RootStackParamList = {
  Login: undefined
  Register: undefined
  Menu: undefined
  Recover: undefined
  Profile: undefined
  Inbox: undefined
}

export type NavigatorType = NativeStackNavigationProp<RootStackParamList>
