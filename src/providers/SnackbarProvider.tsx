import { createContext, useContext, useState } from 'react'
import { Snackbar, Text } from 'react-native-paper'
import { StyleSheet } from 'react-native'

type SnackbarContextType = {
  toast: (message: string) => void
  toastSuccess: (message: string) => void
  toastError: (message: string) => void
}

const SnackbarContext = createContext<SnackbarContextType>({} as SnackbarContextType)

export const useSnackbar = () => useContext(SnackbarContext);

export function SnackbarProvider({ children }: any) {
  const [message, setMessage] = useState<string>('')
  const [color, setColor] = useState<string>('#ffffff')

  const toast = (message: string) => {
    setMessage(message)
    setColor('#ffffff')
  }
  const toastSuccess = (message: string) => {
    setMessage(message)
    setColor('#8fef82')
  }
  const toastError = (message: string) => {
    setMessage(message)
    setColor('#e84f4f')
  }

  return (
    <SnackbarContext.Provider value={{ toast, toastSuccess, toastError }}>
      {children}
      <Snackbar
        visible={!!message}
        style={{backgroundColor: color}}
        onDismiss={() => setMessage('')}
      >
        <Text style={style.message}>{message}</Text>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}

const style = StyleSheet.create({
  message: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 500
  }
})