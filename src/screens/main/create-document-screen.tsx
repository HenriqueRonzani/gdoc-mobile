import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { CreateDocumentRouteParam, type NavigatorType, ParamType } from '@/types/navigation'
import { createDocument } from '@/services/service.service'
import { useCallback, useState } from 'react'
import { useSnackbar } from '@/providers/snackbar-provider'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { CreateDocumentForm } from '@/components/screens/main/create-document/create-document-form'
import { ActivityIndicator, Text } from 'react-native-paper'
import { GdocPageTitle } from '@/components/gdoc-page-title'
import { TransformedCreateDocumentFormData } from '@/schemas/main/create-document.schema'
import { Icon } from 'react-native-paper/src'

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
      await createDocument({
        recipients: data.recipients ? [data.recipients] : undefined,
        identification_type: identificationType,
        service_id: service.id,
        fields: data.fields,
        is_test: false
      })
      toastSuccess('Documento criado com sucesso!')
      navigation.navigate('Menu')
    } catch (error: unknown) {
      toastError('Houve um erro na criação do documento')
      console.log(error)
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
    <ScrollView contentContainerStyle={style.container}>
      <GdocPageTitle>Criar serviço</GdocPageTitle>

      <Pressable style={style.backContainer} onPress={() => navigation.navigate('Menu')}>
        <Icon source={'arrow-left'} size={25}/>
        <Text style={style.backText}>Voltar ao menu</Text>
      </Pressable>

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
    </ScrollView>
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: 15,
    gap: 8
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backText: {
    fontSize: 12
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
