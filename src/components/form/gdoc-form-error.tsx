import { Text } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { useFormContext } from 'react-hook-form'

const getFieldRecursive = (data: Record<string, any>, fields: string[]) => {
  if (fields.length > 1) {
    return getFieldRecursive(data?.[fields[0]], fields.slice(1))
  }
  return data?.[fields[0]]
}

type Props = {
  name: string
  small?: boolean
}

export function GdocFormError({name, small}: Props) {
  const { formState: { errors } } = useFormContext()
  const error = getFieldRecursive(errors, name.split('.'))
  if (!error) return null
  return <Text style={[style.message, small && {fontSize: 10}]}>{error.message?.toString()}</Text>
}

const style = StyleSheet.create({
  message: {
    color: 'red'
  }
})
