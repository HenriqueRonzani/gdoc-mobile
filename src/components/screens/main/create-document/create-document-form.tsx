import { CreateDocumentRequest, CustomFieldConfig, Service } from '@/types/service'
import { GdocForm } from '@/components/form/gdoc-form'
import { makeServiceSchema } from '@/schemas/main/create-document.schema'
import { StyleSheet, View } from 'react-native'
import { GdocFormItem } from '@/components/form/gdoc-form-item'
import { GdocDropdown } from '@/components/form/gdoc-dropdown'
import { GdocFormError } from '@/components/form/gdoc-form-error'
import { RenderCustomFieldInput } from '@/components/screens/main/create-document/render-custom-field-input'
import { Text } from 'react-native-paper'
import { GdocDivider } from '@/components/gdoc-divider'
import { theme } from '@/theme'

type Props = {
  service: Service
  onSubmit: (data: CreateDocumentRequest) => void
}

export function CreateDocumentForm({service, onSubmit}: Props) {
  const fields: Record<string|number, any> = {}

  for (const customField of service.fields) {
    const fieldName = `id_${customField.id}`
    if (customField.type === 'checkbox') {
      fields[fieldName] = []
    } else if (customField.type === 'file') {
      fields[fieldName] = null
    } else {
      fields[fieldName] = ''
    }
  }

  const initialValue = {
    service_id: service.id,
    recipients: 0,
    identification_type: '',
    fields: fields,
    is_test: false
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

        {service.fields.map(customField => (
          <GdocFormItem name={`fields.id_${customField.id}`} key={customField.id}>
            {field => (
              <>
                <RenderCustomFieldInput field={field} customFieldConfig={customField}/>
                <GdocFormError name={`fields.id_${customField.id}`}/>
                <GdocDivider/>
              </>
            )}
          </GdocFormItem>
        ))}

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
