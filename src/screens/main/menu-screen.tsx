import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { GdocPageTitle } from '@/components/gdoc-page-title'
import { useOrganization } from '@/providers/organization-provider'
import { GdocCategories } from '@/components/screens/main/menu/service-sheet/gdoc-categories'
import { GdocServices } from '@/components/screens/main/menu/service-sheet/gdoc-services'
import { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { Icon } from 'react-native-paper/src'
import { IdentificationType, Service, Subject } from '@/types/service'
import { getRootServiceLetter, getService, getServiceLetterByCategory } from '@/services/service.service'
import { useSnackbar } from '@/providers/snackbar-provider'
import { useNavigation } from '@react-navigation/native'
import type { NavigatorType } from '@/types/navigation'
import { TransformedCreateDocumentFormData } from '@/schemas/main/create-document.schema'
import { IdentificationTypeModal } from '@/components/screens/main/create-document/identification-type-modal'
import { GdocCategoryNavigation } from '@/components/screens/main/menu/gdoc-category-navigation'

export function MenuScreen() {
  const {toastError} = useSnackbar()
  const {organization} = useOrganization()
  const navigation = useNavigation<NavigatorType>()
  const serviceLetterId = organization.external_service_letter_id

  const [loading, setLoading] = useState<boolean>(false)
  const [service, setService] = useState<Service|null>(null)
  const [openModal, setOpenModal] = useState<boolean>(false)

  const onPressService = async (id: number) => {
    setLoading(true)
    try {
      const response = await getService(serviceLetterId, id)
      const identificationTypes = response.identification_type.filter(i => i !== 'CONFIDENTIAL')
      if (identificationTypes.length > 1) {
        setService(response)
        setOpenModal(true)
      } else {
        navigation.navigate('CreateDocument', {
          service: response,
          identificationType: identificationTypes[0]
        })
      }
    } catch (error: unknown) {
      toastError('Erro ao carregar categorias')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const onCloseModal = () => {
    setOpenModal(false)
    setService(null)
  }

  const onConfirmModal = (chosenType: IdentificationType) => {
    if (!service) return
    navigation.navigate('CreateDocument', {
      service: service,
      identificationType: chosenType
    })
    setOpenModal(false)
  }

  return (
    <ScrollView style={style.container}>
      <GdocPageTitle>Serviços</GdocPageTitle>
      <GdocCategoryNavigation onPressService={onPressService} loading={loading}/>
      <IdentificationTypeModal open={openModal} onClose={onCloseModal} onChoose={onConfirmModal} loading={loading}/>
    </ScrollView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
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
    gap: 30
  },
  text: {
    fontSize: 14,
    alignSelf: 'flex-start',
    color: '#7C7C7C',
    justifyContent: 'center',
    textAlign: 'center'
  }
})

