import { TypeOf, z } from 'zod'
import { obligatoryStringField, fullNameField, emailField, telephoneField } from './common.schema'

export const ProfileEditSchema = z.object({
  name: fullNameField,
  gender: obligatoryStringField
})

export const EmailEditSchema = z.object({
email: emailField
})

export const PhoneEditSchema = z.object({
cellphone: telephoneField
})

export const AddressEditSchema = z.object({
street: obligatoryStringField,
number: obligatoryStringField,
city: obligatoryStringField,
state: obligatoryStringField,
zip: obligatoryStringField,
})
export const AddPhoneSchema = z.object(
  {
    name: obligatoryStringField,
    value: telephoneField
}
)
export type EmailEditSchemaType = z.infer<typeof EmailEditSchema>
export type PhoneEditSchemaType = z.infer<typeof PhoneEditSchema>
export type AddressEditSchema = z.infer<typeof AddressEditSchema>
export type ProfileEditSchemaType = z.infer<typeof ProfileEditSchema>
export type AddPhoneSchemaType = z.infer<typeof AddPhoneSchema>
