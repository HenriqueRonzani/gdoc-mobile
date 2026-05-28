import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { IdentificationType, Service } from '@/types/service'

export type CreateDocumentRouteParam = {
  service: Service
  identificationType: IdentificationType
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
