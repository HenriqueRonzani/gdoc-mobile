import { CreateDocumentRequest, CustomFieldConfig, Service } from '@/types/service'
import { GdocForm } from '@/components/form/gdoc-form'
import { makeServiceSchema, TransformedCreateDocumentFormData } from '@/schemas/main/create-document.schema'
import { StyleSheet, View } from 'react-native'
import { GdocFormItem } from '@/components/form/gdoc-form-item'
import { GdocDropdown } from '@/components/form/gdoc-dropdown'
import { GdocFormError } from '@/components/form/gdoc-form-error'
import { RenderCustomFieldInput } from '@/components/screens/main/create-document/render-custom-field-input'
import { Text } from 'react-native-paper'
import { theme } from '@/theme'
import { GdocFormArray } from '@/components/form/gdoc-form-array'

type Props = {
  service: Service
  onSubmit: (data: TransformedCreateDocumentFormData) => void
}

export function CreateDocumentForm({service, onSubmit}: Props) {
  const customFields = service.fields

  const initialFields = customFields.map(field => ({
    field_id: field.id,
    value: field.type === 'checkbox' ? [] : (field.options.defaultvalue || '')
  }))

  const initialValue = {
    recipients: 0,
    fields: initialFields,
  }

  const schema = makeServiceSchema(service.fields)

  const recipientsItems = service.recipient_options.map(i => ({
    label: i.recipient_name,
    value: String(i.responsible_id)
  }))

  return (
    <GdocForm
      initial={initialValue}
      schema={schema}
      onSubmit={onSubmit}
    >
      <View style={style.container}>
        <GdocFormItem name={'recipients'}>
          {field => (
            <>
              <Text style={style.label}>Remetente Responsável:</Text>
              <GdocDropdown
                field={field}
                placeholder="Responsável"
                items={recipientsItems}
              />
              <GdocFormError name={'recipients'}/>
            </>
          )}
        </GdocFormItem>

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
                      <GdocFormError name={`fields.${index}.value`}/>
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
