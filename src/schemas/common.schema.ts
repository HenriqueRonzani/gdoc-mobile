import { z } from 'zod'
import { validateCNPJ, validateCPF, validateCPFCNPJ } from '@/services/validation.service'

export const telephoneField =  z.string().refine((field) => {
  const phone = field.replace(/\D/g, '')
  const ddd = phone.substring(0,2)
  const phoneNumber = phone.substring(2)
  return ddd[0] !== '0' && phone.length >= 10 && phone.length <= 11 && (phone.length !== 11 || phoneNumber[0] === '9')
}, 'Numero de telefone invalido')

export const fullNameField = z.string()
  .min(1, 'Campo obrigatório')
  .regex(/^\S+\s+\S+/, 'O nome deve incluir nome e sobrenome')

export const cpfField = z.string()
  .refine(value => value.length === 14, 'CPF inválido')
  .refine(validateCPF, 'CPF inválido')

export const cnpjField = z.string()
  .refine(value => value.length === 18)
  .refine(validateCNPJ, 'CNPJ inválido')

export const cpfCnpjField = z.string()
  .refine(value => value.length === 14 || value.length === 18, 'CPF/CNPJ incompleto')
  .refine(validateCPFCNPJ, 'CPF/CNPJ inválido')

export const obligatoryStringField = z.string().min(1, 'Campo obrigatório')

export const emailField = obligatoryStringField.email('Email invalido')

export const createPasswordField = z.string().min(8, 'Deve conter pelo menos 8 caracteres')
  .regex(/[A-Z]/, 'Deve conter pelo menos uma letra maiúscula')
  .regex(/[0-9]/, 'Deve conter pelo menos um número')
  .regex(/[^A-Za-z0-9]/, 'Deve conter pelo menos um caractere especial')

export const dateField = z.string()
  .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data deve ser no formato DD/MM/YYYY')
  .refine((field) => {
    const [day, month, year] = field.split('/').map(Number)
    const newDate = new Date(year, month - 1, day)

    return (
      year >= 1900 &&
      day === newDate.getDate() &&
      month - 1 === newDate.getMonth() &&
      year === newDate.getFullYear()
    )
  }, 'Data invalída')
  .transform((val) => {
    const [day, month, year] = val.split('/')
    return `${year}-${month}-${day}`
  })
