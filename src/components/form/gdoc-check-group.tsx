import type { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { View } from 'react-native'
import { Checkbox } from 'react-native-paper'

type Props =  {
  field: ControllerRenderProps<FieldValues, string>
  values: string[]
}

export function GdocCheckGroup ({field, values}: Props) {
  const onPress = (value: string) => {
    if (field.value.includes(value)) {
      field.onChange(field.value.filter((i: string) => i != value))
    } else {
      field.onChange([...field.value, value])
    }
  }

  return (
    <View>
      {values.map(i =>
        <Checkbox
          key={i}
          status={field.value.includes(i) ? 'checked' : 'unchecked'}
          onPress={() => onPress(i)}
        />
      )}
    </View>
  )
}

