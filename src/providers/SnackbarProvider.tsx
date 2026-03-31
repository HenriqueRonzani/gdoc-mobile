import { createContext, useContext, useState } from 'react'
import { Snackbar } from 'react-native-paper'

const SnackbarContext = createContext<any>(null)

export const useSnackbar = () => useContext(SnackbarContext);

export function SnackbarProvider({ children }: any) {
  const [message, setMessage] = useState<string>('')

  const toast = (message: string) => setMessage(message)

  return (
    <SnackbarContext.Provider value={{ toast }}>
      {children}

      <Snackbar
        visible={!!message}
        onDismiss={() => setMessage('')}
      >
        {message}
      </Snackbar>
    </SnackbarContext.Provider>
  )
}
