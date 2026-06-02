import { CheckboxValue, CustomFieldConfig, extension, FileValue, StringValue } from '@/types/service'
import { z } from 'zod'
import { ZodTypeAny } from 'zod/v3'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const baseFileSchema = z.object({
  uri: z.string().min(1),
  name: z.string().min(1),
  type: z.string().min(1)
})

const baseCheckBoxSchema = z.array(z.string()).min(1)

const baseStringFieldSchema = z.string().min(1)

export const makeServiceSchema = (hasRecipientOptions: boolean, customFields: CustomFieldConfig[]): ZodTypeAny => {
  const fieldSchema = z.object({
    field_id: z.string().or(z.number()),
    value: z.any()
  }).refine((field) => {
    const fieldConfig = customFields.find(c => c.id === field.field_id)
    if (!fieldConfig) return true

    if (fieldConfig?.is_required) {
      if (fieldConfig.type === 'file') {
        return baseFileSchema.safeParse(field.value).success
      }
      if (fieldConfig.type === 'checkbox') {
        return baseCheckBoxSchema.safeParse(field.value).success
      } else {
        return baseStringFieldSchema.safeParse(field.value).success
      }
    }

    return true
  }, {
    message: 'Campo obrigatório',
    path: ['value']
  }).superRefine((field, ctx) => {
    const fieldConfig = customFields.find(c => c.id === field.field_id)
    if (!fieldConfig || fieldConfig.type !== 'file') return
    if (!baseFileSchema.safeParse(field.value).success) return

    const cleanExtensions = fieldConfig.options.extensions.flatMap(i => i.split(',')).map(i => i.trim()) as extension[]
    if (cleanExtensions.includes('*')) return

    const currentExtension = field.value?.name?.match(/\.(\w*)/g)?.at(-1)?.toLowerCase()
    if (!currentExtension) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Arquivo sem extensão',
        path: ['value']
      })
      return
    }

    const isValid = cleanExtensions.includes(currentExtension)
    if (!isValid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Arquivo com extensão incorreta',
        path: ['value']
      })
    }
  }).superRefine((field, ctx) => {
    const fieldConfig = customFields.find(c => c.id === field.field_id)
    if (!fieldConfig || fieldConfig.type !== 'date') return true

    const date = dayjs(field.value, 'DD/MM/YYYY')
    if (!date.isValid()) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
        message: 'Data inválida',
        path: ['value']
      })
      return
    }

    if (!(fieldConfig.options.initial_date || fieldConfig.options.final_date)) return true

    const initialDateDays = Number(fieldConfig.options.initial_date?.match(/[+-]?\d+/)?.[0])
    const finalDateDays = Number(fieldConfig.options.final_date?.match(/[+-]?\d+/)?.[0])

    const initialDate = Number.isNaN(initialDateDays) ? null : dayjs().add(initialDateDays, 'days')
    const finalDate = Number.isNaN(finalDateDays) ? null : dayjs().add(finalDateDays, 'days')

    const isValid = (
      !initialDate || !initialDate.isAfter(date, 'days')
    ) && (
      !finalDate || !finalDate.isBefore(date, 'days')
    )

    if (!isValid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: fieldConfig.options.optional_message_error_validation || 'Data fora dos limites',
        path: ['value']
      })
    }
  }).transform((field) => {
      const fieldConfig = customFields.find(c => c.id === field.field_id)
      const value = fieldConfig?.type === 'checkbox' ? field.value.join(', ') : field.value
      return {
        id: field.field_id,
        value: value
      } as TransformedFields
    }
  )

  return z.object({
    recipients: hasRecipientOptions
      ? z.coerce.number().int().min(1, {
        message: 'Campo obrigatório'
      })
      : z.coerce.number().int().optional(),
    fields: z.array(fieldSchema)
  }).transform((data: TransformedCreateDocumentFormData) => {
    const filtered = data.fields.filter(i => {
      const fieldConfig = customFields.find(c => c.id === i.id)
      if (!fieldConfig) return false

      if (fieldConfig.type === 'file') {
        return baseFileSchema.safeParse(i.value).success
      }
      if (fieldConfig?.type === 'checkbox') {
        // at this point checkbox is transformed and joined into string, condition is kept just to make it clear
        return baseStringFieldSchema.safeParse(i.value).success
      } else {
        return baseStringFieldSchema.safeParse(i.value).success
      }
    })

    return {
      recipients: data.recipients,
      fields: filtered
    } as TransformedCreateDocumentFormData
  })
}

type FormFields = {
  field_id: string | number
  value: StringValue | CheckboxValue | FileValue
}

export type TransformedFields = {
  id: string | number
  value: StringValue | CheckboxValue | FileValue
}

export type TransformedCreateDocumentFormData = {
  recipients?: number
  fields: TransformedFields[]
}
