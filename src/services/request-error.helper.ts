import { isAxiosError } from 'axios'

export const logIfDev = (...toLog: any) => {
  if (__DEV__) {
    console.log(toLog)
  }
}

export const handleRequestError = (error: unknown, toastError: (message: string) => void, errorMessage?: string) => {
  if (!(error instanceof Error)) {
    toastError('Houve um erro interno')
    logIfDev('Erro desconhecido', error)
    return
  }

  logIfDev('Erro', `${error.name} - ${error.message}`)
  logIfDev('Stack Trace', error.stack)

  if (isAxiosError(error)) {
    if (error.response) {
      if (error.response.status === 401) {
        toastError('Sessão expirada')
        logIfDev('Sessão expirada')
        return
      }
      toastError(errorMessage || 'Houve um erro ao processar sua solicitação')
      logIfDev(`Api Response: ${error.response.status} `, error.response.data)
      return
    }
  }

  toastError('Houve um erro interno')
  logIfDev('Erro fora da API')
}
