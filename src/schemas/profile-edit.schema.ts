import { z } from 'zod'
import { obligatoryStringField, fullNameField } from './common.schema'

export const AddressEditSchema = z.object({
  street: obligatoryStringField.optional(),
  number: obligatoryStringField.optional(),
  city: obligatoryStringField.optional(),
  state: obligatoryStringField.optional(),
  zip: obligatoryStringField.optional()
})

export const ContactEditSchema = z.object({
  id: z.number().optional(),
  name: z.string().nullable().optional(),
  value: z.string().optional(),
  type: z.string().optional(),
  is_verified: z.boolean().optional()
})

export const UpdateUserProfileSchema = z.object({
  name: fullNameField.optional(),
  gender: obligatoryStringField.optional(),
  nationality: z.string().optional(),
  place_of_birth: z.string().nullable().optional(),
  mother_name: z.string().nullable().optional(),
  cpfCnpj: z.string().optional(),
  dateOfBirth: z.string().optional(),

  contacts: z.array(ContactEditSchema).optional(),

  address: AddressEditSchema.optional()
})

export type UpdateUserProfileFormData = z.infer<typeof UpdateUserProfileSchema>
