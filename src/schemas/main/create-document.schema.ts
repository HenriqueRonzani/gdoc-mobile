import { CustomFieldConfig } from '@/types/service'
import { z } from 'zod'
import { ZodTypeAny } from 'zod/v3'

const baseFileSchema = z.object({
  uri: z.string(),
  name: z.string(),
  type: z.string(),
}, {message: 'Campo obrigatório'});

export const makeServiceSchema = (customFields: CustomFieldConfig[]): ZodTypeAny => {
  let fields: Record<string, any> = {}

  for (const customField of customFields) {
    const fieldName = `id_${customField.id}`
    if (customField.type === 'file') {
      fields[fieldName] = customField.is_required
        ? baseFileSchema
        : baseFileSchema.optional().nullable()
    }
    else if (customField.type === 'checkbox') {
      fields[fieldName] = customField.is_required
        ? z.array(z.string()).min(1, {message: 'Selecione pelo menos uma opção'})
        : z.array(z.string()).optional().nullable()
    }
    else {
      fields[fieldName] = customField.is_required
        ? z.string().min(1, {message: 'Campo obrigatório'})
        : z.string().optional()
    }
  }

  return z.object({
    recipients: z.coerce.number().int().min(1, {message: 'Campo obrigatório'}),
    fields: z.object(fields)
  })
}
