import type { ControllerRenderProps, FieldValues } from 'react-hook-form'
import type { CustomFieldConfig } from '@/types/service'
import { GdocTextInput } from '@/components/form/gdoc-text-input'
import { GdocCheckGroup } from '@/components/form/gdoc-check-group'
import { GdocRadio } from '@/components/form/gdoc-radio'
import { GdocDate } from '@/components/form/gdoc-date'
import { GdocAttachment } from '@/components/form/gdoc-attachment'
import { GdocDropdown } from '@/components/form/gdoc-dropdown'
import { booleanStringToBoolean, fixEncoding, stringToMask } from '@/services/create-document.helper'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '@/theme'

type Props = {
  field: ControllerRenderProps<FieldValues, string>,
  customFieldConfig: CustomFieldConfig
}

const handleValuesFormatting = (values: string[]) => {
  return values.map(fixEncoding)
}

export function RenderCustomFieldInput({ field, customFieldConfig }: Props) {
  const disabled = booleanStringToBoolean(customFieldConfig.options.readonly)
  const formattedName = fixEncoding(customFieldConfig.name)

  switch (customFieldConfig.type) {
  case 'string': {
    const maxChar = customFieldConfig.options.maxchar
    const mask = customFieldConfig.options.mask
    return (
      <GdocTextInput
        field={field}
        label={formattedName}
        placeholder={formattedName}
        maxLength={Number(maxChar) > 0 ? Number(maxChar) : undefined }
        mask={mask ? stringToMask(mask) : undefined}
        disabled={disabled}
        style={{ fontSize: 12 }}
      />
    )
  }

  case 'checkbox': {
    const formattedValues = handleValuesFormatting(customFieldConfig.options.values)
    return (
      <View>
        <Text style={style.label}>{formattedName}</Text>
        <GdocCheckGroup field={field} values={formattedValues} disabled={disabled} />
      </View>
    )
  }

  case 'radio': {
    const formattedValues = handleValuesFormatting(customFieldConfig.options.values)
    return (
      <View>
        <Text style={style.label}>{formattedName}</Text>
        <GdocRadio field={field} values={formattedValues} disabled={disabled} />
      </View>
    )
  }

  case 'date':
    return (
      <GdocDate
        field={field}
        label={formattedName}
        placeholder={formattedName}
        disabled={disabled}
        style={{ fontSize: 12 }}
      />
    )

  case 'file':
    return (
      <View>
        <Text style={style.label}>{formattedName}</Text>
        <GdocAttachment field={field} allowedExtensions={customFieldConfig.options.extensions} />
      </View>
    )

  case 'select': {
    const formattedValues = handleValuesFormatting(customFieldConfig.options.values)
    const items = formattedValues.map(i => ({ value: i, label: i }))
    return (
      <View style={{ gap: 6 }}>
        <Text style={style.label}>{formattedName}</Text>
        <GdocDropdown field={field} placeholder={formattedName} items={items} />
      </View>
    ) }
  }
}

const style = StyleSheet.create({
  label: {
    color: theme.colors.primaryText,
    fontWeight: 'bold'
  }
})
