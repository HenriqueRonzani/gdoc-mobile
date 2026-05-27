import { Mask } from 'react-native-mask-input'
import { StringBool } from '@/types/service'

export const stringToMask = (mascaraString: string): Mask => {
  return mascaraString.split('').map((char) => {
    if (char === '9') {
      return /\d/
    }
    if (char === 'A') {
      return /[a-zA-Z]/
    }
    return char
  })
}

export const formatToFormData = (
  data: object,
  formData: FormData = new FormData(),
  outerField?: string
) => {
  for (const [field, value] of Object.entries(data)) {

    const fieldName = outerField ? `${outerField}[${field}]` : field
    if (value && typeof value === 'object' && !value.uri) {
      formatToFormData(value, formData, fieldName)
    } else {
      formData.append(fieldName, value)
    }
  }

  return formData
}

export const booleanStringToBoolean = (string: StringBool) => {
  return string === 'true'
}
