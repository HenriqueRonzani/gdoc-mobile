import { TextInput, TextInputProps, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { theme } from "@/theme";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = TextInputProps & {
  field: ControllerRenderProps<FieldValues, string>
}

export default function GdocTextInput({field, ...rest}: Props) {
  const theme = useTheme()

  return (
    <TextInput
      {...rest}
      value={field.value}
      onChangeText={field.onChange}
      style={style.textInput}
      selectionColor={theme.colors.secondary}
    />
  )
}

const style = StyleSheet.create({
  textInput: {
    backgroundColor: theme.colors["component-on"],
    color: 'black',
    borderRadius: 10
  }
})
