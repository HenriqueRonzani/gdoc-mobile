import type { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { View } from 'react-native'
import { RadioButton } from 'react-native-paper'

type Props =  {
  field: ControllerRenderProps<FieldValues, string>
  values: string[]
}

export function GdocRadio({field, values} : Props) {
  return (
    <View>
      {values.map(i =>
        <RadioButton
          key={i}
          value={i}
          status={field.value === i ? 'checked' : 'unchecked'}
          onPress={() => field.onChange(i)}
        />
      )}
    </View>
  )
}
