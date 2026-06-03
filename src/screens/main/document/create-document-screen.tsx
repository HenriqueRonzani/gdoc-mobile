import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { CreateDocumentRouteParam, type NavigatorType, ParamType } from '@/types/navigation'
import { createDocument } from '@/services/api/document.service'
import { useCallback, useState } from 'react'
import { useSnackbar } from '@/providers/snackbar-provider'
import { StyleSheet, View } from 'react-native'
import { CreateDocumentForm } from '@/components/screens/main/document/create/create-document-form'
import { ActivityIndicator, Text } from 'react-native-paper'
import { GdocPageTitle } from '@/components/gdoc-page-title'
import { TransformedCreateDocumentFormData } from '@/schemas/main/create-document.schema'
import { handleRequestError } from '@/services/request-error.helper'
import { GdocBack } from '@/components/gdoc-back'

export function CreateDocumentScreen() {
  const navigation = useNavigation<NavigatorType>()
  const {toastError, toastSuccess} = useSnackbar()

  const route = useRoute<ParamType<CreateDocumentRouteParam>>()
  const {service, identificationType} = route.params

  const [loading, setLoading] = useState<boolean>(false)
  const [formKey, setFormKey] = useState(0)

  const onSubmit = async (data: TransformedCreateDocumentFormData) => {
    setLoading(true)
    try {
      const response = await createDocument({
        recipients: data.recipients ? [data.recipients] : undefined,
        identification_type: identificationType,
        service_id: service.id,
        fields: data.fields,
        is_test: false
      })
      toastSuccess('Documento criado com sucesso!')

      if (!response.uuid) return

      navigation.navigate('Document', {
        uuid: response.uuid
      })
    } catch (error: unknown) {
      handleRequestError(error, toastError, 'Erro ao carregar documento')
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      setFormKey(prev => prev + 1)
    }, [])
  )

  return (
    <View style={style.container}>
      <GdocPageTitle>Criar serviço</GdocPageTitle>

      <GdocBack onPress={() => navigation.navigate('Menu')}
        text={'Voltar ao menu'}
      />

      <View style={style.content}>
        <Text style={{textAlign: 'center'}}>
          Preencha os campos abaixo para solicitar o serviço: <Text style={{fontWeight: 'bold'}}>{service?.name}</Text>
        </Text>

        {loading || !service
          ? <ActivityIndicator animating={true}/>
          : (
            <CreateDocumentForm
              key={formKey}
              service={service}
              onSubmit={onSubmit}
            />
          )
        }
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    paddingHorizontal: 15,
    gap: 8,
    paddingBottom: 10
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
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
