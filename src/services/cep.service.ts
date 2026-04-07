import axios from 'axios'

export const getStates = async () => {
  const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
  return response.data.sort((a: any, b: any) => a.nome.localeCompare(b.nome))
}

export const getCities = async (state: string) => {
  const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`)
  return response.data.sort((a: any, b: any) => a.nome.localeCompare(b.nome))
}

export const getAddress = async (cep: string) => {
  const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`)
  return response.data
}
