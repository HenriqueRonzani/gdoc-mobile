import { Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useFormContext } from "react-hook-form";

export default function GdocFormError({name}: {name: string}) {
  const { formState: { errors } } = useFormContext()
  const error = errors[name]
  if (!error) return null
  return <Text style={style.message}>{error.message?.toString()}</Text>
}

const style = StyleSheet.create({
  message: {
    color: 'red'
  }
})