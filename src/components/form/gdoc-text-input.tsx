import type { TextInputProps} from 'react-native-paper'
import { TextInput, useTheme } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { theme } from '@/theme'
import type { ControllerRenderProps, FieldValues } from 'react-hook-form'
import MaskInput from 'react-native-mask-input/src/MaskInput'
import type { Mask } from 'react-native-mask-input'

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
      style={[style.textInput, rest.style]}
      selectionColor={theme.colors.secondary}
      render={mask ? props => (
        <MaskInput
          {...props}
          keyboardType={rest.keyboardType}
          value={field.value}
          onChangeText={(masked, _) => {
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
