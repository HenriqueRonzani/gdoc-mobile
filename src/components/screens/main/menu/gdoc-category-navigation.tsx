import { ScrollView, StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { GdocCategories } from '@/components/screens/main/menu/service-sheet/gdoc-categories'
import { GdocServices } from '@/components/screens/main/menu/service-sheet/gdoc-services'
import { useCallback, useEffect, useState } from 'react'
import type { Subject } from '@/types/service'
import { useOrganization } from '@/providers/organization-provider'
import { getRootServiceLetter, getServiceLetterByCategory } from '@/services/api/service.service'
import { useSnackbar } from '@/providers/snackbar-provider'
import { useFocusEffect } from '@react-navigation/native'
import { handleRequestError } from '@/services/request-error.helper'
import { GdocBack } from '@/components/gdoc-back'

type Props = {
  onPressService: (id: number) => void
  loading: boolean
}

export function GdocCategoryNavigation ({onPressService, loading}: Props) {
  const {toastError} = useSnackbar()
  const {organization} = useOrganization()
  const serviceLetterId = organization.external_service_letter_id

  const [localLoading, setLocalLoading] = useState<boolean>(false)
  const [categories, setCategories] = useState<Subject[]>([])
  const [services, setServices] = useState<Subject[]>([])
  const [parentIds, setParentIds] = useState<number[]>([])

  const onPreviousCategory = () => {
    if (parentIds.length > 0) {
      setParentIds(parentIds.slice(0, parentIds.length - 1))
    }
  }

  const onPressCategory = (clickedServiceId: number) => {
    setParentIds([...parentIds, clickedServiceId])
  }

  const loadCategories = async () => {
    setLocalLoading(true)
    try {
      const response = parentIds.length === 0
        ? await getRootServiceLetter(serviceLetterId)
        : await getServiceLetterByCategory(serviceLetterId, parentIds.at(-1) as number)

      const categories = response.data.filter(i => i.type === 'CATEGORY')
      const services = response.data.filter(i => i.type === 'SERVICE')
      setCategories(categories)
      setServices(services)
    } catch (error: unknown) {
      handleRequestError(error, toastError, 'Erro ao carregar categorias')
    } finally {
      setLocalLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [parentIds])

  useFocusEffect(
    useCallback(() => {
      setParentIds([])
      return () => {}
    }, [])
  )

  return (
    <ScrollView
      style={{flex: 1}}
      contentContainerStyle={style.content}
      showsVerticalScrollIndicator={false}
    >
      {parentIds.length > 0 && (
        <GdocBack
          text={'Voltar para categoria anterior'}
          onPress={onPreviousCategory}
        />
      )}
      {localLoading || loading
        ? <ActivityIndicator animating={true}/>
        : (
          <View>
            <GdocCategories categories={categories} onPressCategory={onPressCategory}/>
            <GdocServices services={services} onPressService={onPressService}/>
          </View>
        )
      }
    </ScrollView>
  )
}

const style = StyleSheet.create({
  content: {
    gap: 5
  }
})
