import { isAxiosError } from 'axios'

export const handleRequestError = (error: unknown, toastError: (message: string) => void, errorMessage?: string)=> {
  if (!(error instanceof Error)) {
    toastError('Houve um erro interno')
    console.log('Erro desconhecido', error)
    return
  }

  console.log('Erro', `${error.name} - ${error.message}`)
  console.log('Stack Trace', error.stack)

  if (isAxiosError(error)) {
    if (error.response) {
      if (error.response.status === 401) {
        toastError('Sessão expirada')
        console.log('Sessão expirada')
        return
      }
      toastError(errorMessage || 'Houve um erro ao processar sua solicitação')
      console.log(`Api Response: ${error.response.status} `, error.response.data)
      return
    }
  }

  toastError('Houve um erro interno')
  console.log('Erro fora da API')
}
