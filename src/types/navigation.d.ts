import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type CreateDocumentRouteParam = {
  serviceId: number
}

export type RootStackParamList = {
  Login: undefined
  Register: undefined
  Menu: undefined
  Recover: undefined
  Profile: undefined
  Inbox: undefined
  CreateDocument: CreateDocumentRouteParam
}

export type NavigatorType = NativeStackNavigationProp<RootStackParamList>
export type ParamType<T extends object> = RouteProp<{ Screen: T }, 'Screen'>;
