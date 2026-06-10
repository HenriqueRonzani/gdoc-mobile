import type { Mask } from 'react-native-mask-input'
import type { StringBool } from '@/types/service'

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

export function fixEncoding(text: any) {
  if (!text) return text
  try {
    return decodeURIComponent(escape(text))
  } catch (e) {
    return text
  }
}

export const formatToFormData = (
  data: object,
  formData: FormData = new FormData(),
  outerField?: string
) => {
  for (const [field, value] of Object.entries(data)) {
    if (value === undefined || value == null) {
      continue
    }

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
