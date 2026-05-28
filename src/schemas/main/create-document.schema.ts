import { CheckboxValue, CustomFieldConfig, FileValue, StringValue } from '@/types/service'
import { z } from 'zod'
import { ZodTypeAny } from 'zod/v3'

const baseFileSchema = z.object({
  uri: z.string().min(1),
  name: z.string().min(1),
  type: z.string().min(1)
})

const baseCheckBoxSchema = z.array(z.string()).min(1)

const baseStringFieldSchema = z.string().min(1)

export const makeServiceSchema = (customFields: CustomFieldConfig[]): ZodTypeAny => {
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
      }
      else {
        return baseStringFieldSchema.safeParse(field.value).success
      }
    }

    return true
  }, {
    message: 'Campo obrigatório',
    path: ['value']
  }).transform((field) => ({
    id: field.field_id,
    value: field.value
  }) as TransformedFields)

  return z.object({
    recipients: z.coerce.number().int().min(1, {message: 'Campo obrigatório'}),
    fields: z.array(fieldSchema)
  }).transform((data: TransformedCreateDocumentFormData) => {
    const filtered = data.fields.filter(i => {
      const fieldConfig = customFields.find(c => c.id === i.id)
      if (!fieldConfig) return false

      if (fieldConfig.type === 'file') {
        return baseFileSchema.safeParse(i.value).success
      }
      if (fieldConfig?.type === 'checkbox') {
        return baseFileSchema.safeParse(i.value).success
      }
      else {
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

type CreateDocumentFormData = {
  recipients: number
  value: FormFields
}

export type TransformedFields = {
  id: string | number
  value: StringValue | CheckboxValue | FileValue
}

export type TransformedCreateDocumentFormData = {
  recipients: number
  fields: TransformedFields[]
}
