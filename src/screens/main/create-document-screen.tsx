import { useRoute } from '@react-navigation/native'
import { CreateDocumentRouteParam, ParamType } from '@/types/navigation'
import { createDocument } from '@/services/service.service'
import { useState } from 'react'
import { useSnackbar } from '@/providers/snackbar-provider'
import { ScrollView, StyleSheet, View } from 'react-native'
import { CreateDocumentForm } from '@/components/screens/main/create-document/create-document-form'
import { ActivityIndicator, Text } from 'react-native-paper'
import { GdocPageTitle } from '@/components/gdoc-page-title'
import { TransformedCreateDocumentFormData } from '@/schemas/main/create-document.schema'

export function CreateDocumentScreen() {
  const {toastError} = useSnackbar()

  const route = useRoute<ParamType<CreateDocumentRouteParam>>()
  const {service, identificationType} = route.params

  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (data: TransformedCreateDocumentFormData) => {
    setLoading(true)
    try {
      const response = await createDocument({
        recipients: [data.recipients],
        identification_type: identificationType,
        service_id: service.id,
        fields: data.fields,
        is_test: false
      })
      console.log(response)
    } catch (error: unknown) {
      toastError('Houve um erro na criação do documento')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView contentContainerStyle={style.container}>
      <GdocPageTitle>Criar serviço</GdocPageTitle>

      <View style={style.content}>
        <Text style={{textAlign: 'center'}}>
          Preencha os campos abaixo para solicitar o serviço: <Text style={{fontWeight: 'bold'}}>{service?.name}</Text>
        </Text>

        {loading || !service
          ? <ActivityIndicator animating={true}/>
          : (
            <CreateDocumentForm service={service} onSubmit={onSubmit}/>
          )
        }
      </View>
    </ScrollView>
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: 15,
    gap: 8
  },
  content: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    gap: 15
  },
  text: {
    fontSize: 14,
    alignSelf: 'flex-start',
    color: '#7C7C7C',
    justifyContent: 'center',
    textAlign: 'center'
  },
  textBold: {
    fontWeight: 'bold'
  }
})
