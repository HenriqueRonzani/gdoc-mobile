import { TextInput, TextInputProps, useTheme } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { theme } from '@/theme'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'
import MaskInput from 'react-native-mask-input/src/MaskInput'
import { Mask, Masks } from 'react-native-mask-input'

type Props = TextInputProps & {
  field: ControllerRenderProps<FieldValues, string>
  mask?: Mask
}

export function GdocTextInput({field, mask, ...rest}: Props) {
  const theme = useTheme()

  return (
    <TextInput
      {...rest}
      value={field.value}
      onChangeText={field.onChange}
      style={style.textInput}
      selectionColor={theme.colors.secondary}
      render={mask ? props => (
        <MaskInput
          {...props}
          value={field.value}
          onChangeText={(masked, unmasked) => {
            field.onChange(masked)
          }}
          mask={mask}
        />
      ) : undefined}
    />
  )
}

const style = StyleSheet.create({
  textInput: {
    backgroundColor: theme.colors['component-on'],
    color: 'black',
    borderRadius: 10
  }
})
