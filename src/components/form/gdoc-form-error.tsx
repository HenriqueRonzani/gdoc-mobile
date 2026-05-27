import { Text } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { useFormContext } from 'react-hook-form'

const getFieldRecursive = (data: Record<string, any>, fields: string[]) => {
  if (fields.length > 1) {
    return getFieldRecursive(data?.[fields[0]], fields.slice(1))
  }
  return data?.[fields[0]]
}

export function GdocFormError({name}: {name: string}) {
  const { formState: { errors } } = useFormContext()
  const error = getFieldRecursive(errors, name.split('.'))
  if (!error) return null
  return <Text style={style.message}>{error.message?.toString()}</Text>
}

const style = StyleSheet.create({
  message: {
    color: 'red'
  }
})
