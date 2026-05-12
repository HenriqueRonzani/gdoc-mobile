import * as SecureStore from 'expo-secure-store'

export const getAuthToken = async () => {
  return await SecureStore.getItemAsync('authToken')
}

export const setAuthToken = async (token: string) => {
  await SecureStore.setItemAsync('authToken', token)
}

export const clearAuthToken = async () => {
  await SecureStore.deleteItemAsync('authToken')
}
