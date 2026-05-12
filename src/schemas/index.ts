import { z } from 'zod'

export const telephoneField =  z.string().refine((field) => {
  const phone = field.replace(/\D/g, '')
  const ddd = phone.substring(0,2)
  const phoneNumber = phone.substring(2)
  return ddd[0] !== '0' && phone.length >= 10 && phone.length <= 11 && (phone.length !== 11 || phoneNumber[0] === '9')
}, 'Numero de telefone invalido')

export const fullNameField = z.string()
  .min(1, 'Campo obrigatório')
  .regex(/^\S+\s+\S+/, 'O nome deve incluir nome e sobrenome')
