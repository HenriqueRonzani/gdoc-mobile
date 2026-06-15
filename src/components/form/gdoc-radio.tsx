import type { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { View } from 'react-native'
import { RadioButton } from 'react-native-paper'

type Props =  {
  field: ControllerRenderProps<FieldValues, string>
  values: string[]
  disabled?: boolean
}

export function GdocRadio({field, values, disabled} : Props) {
  return (
    <View>
      {values.map(i =>
        <RadioButton.Item
          key={i}
          value={i}
          label={i}
          status={field.value === i ? 'checked' : 'unchecked'}
          onPress={() => field.onChange(i)}
          disabled={disabled}
          labelVariant={'bodySmall'}
        />
      )}
    </View>
  )
}
