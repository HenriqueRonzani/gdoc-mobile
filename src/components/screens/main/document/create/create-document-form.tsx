import type { CustomFieldConfig, Service } from '@/types/service'
import { GdocForm } from '@/components/form/gdoc-form'
import type { TransformedCreateDocumentFormData } from '@/schemas/main/create-document.schema'
import { makeServiceSchema } from '@/schemas/main/create-document.schema'
import { StyleSheet, View } from 'react-native'
import { GdocFormItem } from '@/components/form/gdoc-form-item'
import { GdocDropdown } from '@/components/form/gdoc-dropdown'
import { GdocFormError } from '@/components/form/gdoc-form-error'
import { RenderCustomFieldInput } from '@/components/screens/main/document/create/render-custom-field-input'
import { Text } from 'react-native-paper'
import { theme } from '@/theme'
import { GdocFormArray } from '@/components/form/gdoc-form-array'
import dayjs from 'dayjs'
import { fixEncoding } from '@/services/create-document.helper'

type Props = {
  service: Service
  onSubmit: (data: TransformedCreateDocumentFormData) => void
}

const handleDefaultValues = (field: CustomFieldConfig) => {
  if (field.type === 'checkbox') {
    return [] as string[]
  }

  const defaultValue = field.options.defaultvalue

  if (!defaultValue) {
    return ''
  }

  const dateRegex = /\d\d\d\d-\d\d-\d\d/g
  if (field.type !== 'date' && dateRegex.test(defaultValue)){
    return dayjs(defaultValue, 'YYYY-MM-DD').format('DD/MM/YYYY')
  }
  return fixEncoding(defaultValue)
}

export function CreateDocumentForm({service, onSubmit}: Props) {
  const customFields = service.fields

  const initialFields = customFields.map(field => ({
    field_id: field.id,
    value: handleDefaultValues(field)
  }))

  const initialValue = {
    recipients: service.recipient_options.length === 1 
      ? service.recipient_options[0].responsible_id || service.recipient_options[0].sector_id
      : 0,
    fields: initialFields
  }

  const recipientsItems = service.recipient_options.map((i) => {
    const value = i.responsible_id || i.sector_id
    return {
      label: i.recipient_name,
      value: String(value)
    }
  })

  const schema = makeServiceSchema(recipientsItems.length > 0, service.fields)

  return (
    <GdocForm
      initial={initialValue}
      schema={schema}
      onSubmit={onSubmit}
    >
      <View style={style.container}>

        {recipientsItems.length > 1 && (
          <GdocFormItem name={'recipients'}>
            {field => (
              <>
                <Text style={style.label}>Remetente Responsável:</Text>
                <GdocDropdown
                  field={field}
                  placeholder="Responsável"
                  items={recipientsItems}
                />
                <GdocFormError small name={'recipients'}/>
              </>
            )}
          </GdocFormItem>
        )}

        <GdocFormArray name={'fields'}>
          {fields => (
            fields.map((arrayField, index) => {
              const fieldConfig = customFields.find(c => c.id === arrayField.field_id)
              if (!fieldConfig) return
              return (
                <GdocFormItem name={`fields.${index}.value`} key={arrayField.id}>
                  {field =>
                    <>
                      <RenderCustomFieldInput field={field} customFieldConfig={fieldConfig}/>
                      <GdocFormError small name={`fields.${index}.value`}/>
                    </>
                  }
                </GdocFormItem>
              )
            })
          )}
        </GdocFormArray>

      </View>
    </GdocForm>
  )
}

const style = StyleSheet.create({
  container: {
    gap: 12
  },
  label: {
    color: theme.colors.primaryText,
    fontWeight: 'bold'
  }
})
