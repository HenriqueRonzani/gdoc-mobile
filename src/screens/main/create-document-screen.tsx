import { useRoute } from '@react-navigation/native'
import { CreateDocumentRouteParam, ParamType } from '@/types/navigation'
import { useOrganization } from '@/providers/organization-provider'
import { createDocument, getService } from '@/services/service.service'
import { useEffect, useState } from 'react'
import { IdentificationType, Service } from '@/types/service'
import { useSnackbar } from '@/providers/snackbar-provider'
import { ScrollView, StyleSheet, View } from 'react-native'
import { CreateDocumentForm } from '@/components/screens/main/create-document/create-document-form'
import { ActivityIndicator, Text } from 'react-native-paper'
import { GdocPageTitle } from '@/components/gdoc-page-title'
import { IdentificationTypeModal } from '@/components/screens/main/create-document/identification-type-modal'
import { TransformedCreateDocumentFormData } from '@/schemas/main/create-document.schema'
import { isAxiosError } from 'axios'

export function CreateDocumentScreen() {
  const {toastError} = useSnackbar()
  const {organization} = useOrganization()
  const route = useRoute<ParamType<CreateDocumentRouteParam>>()

  const {serviceId} = route.params
  const serviceLetterId = organization.external_service_letter_id

  const [loading, setLoading] = useState<boolean>(false)
  const [service, setService] = useState<Service>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [formData, setFormData] = useState<TransformedCreateDocumentFormData|null>(null)

  const loadServiceConfig = async () => {
    setLoading(true)
    try {
      const response = await getService(serviceLetterId, serviceId)
      setService(response)
    } catch (error: unknown) {
      toastError('Erro ao carregar categorias')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadServiceConfig()
  }, [])

  const onsubmit = (data: TransformedCreateDocumentFormData) => {
    setOpenModal(true)
    setFormData(data)
  }

  const onCloseModal = () => {
    setOpenModal(false)
    setFormData(null)
  }

  const onConfirmModal = async (chosenType: IdentificationType) => {
    if (!formData) return
    console.log('formData', formData)
    try {
      const response = await createDocument({
        recipients: [formData.recipients],
        identification_type: chosenType,
        service_id: serviceId,
        fields: formData.fields,
        is_test: false
      })
      console.log(response)
    } catch (e) {
      if (isAxiosError(e) && 'response' in e && e.response && 'data' in e.response)
        console.log(e.response.data)
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
            <CreateDocumentForm service={service} onSubmit={onsubmit}/>
          )
        }
      </View>

      <IdentificationTypeModal open={openModal} onClose={onCloseModal} onChoose={onConfirmModal}/>
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
