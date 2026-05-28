import { Pressable, StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-paper/src'
import { ActivityIndicator, Text } from 'react-native-paper'
import { GdocCategories } from '@/components/screens/main/menu/service-sheet/gdoc-categories'
import { GdocServices } from '@/components/screens/main/menu/service-sheet/gdoc-services'
import { useEffect, useState } from 'react'
import { Subject } from '@/types/service'
import { useOrganization } from '@/providers/organization-provider'
import { getRootServiceLetter, getServiceLetterByCategory } from '@/services/service.service'
import { useSnackbar } from '@/providers/snackbar-provider'

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
      toastError('Erro ao carregar categorias')
      console.log(error)
    } finally {
      setLocalLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [parentIds])

  return (
    <View style={style.content}>
      <Text style={style.text}>Busque e solicite os serviços oferecidos por {organization.name}</Text>
      {parentIds.length > 0 && (
        <Pressable style={style.backContainer} onPress={onPreviousCategory}>
          <Icon source={'arrow-left'} size={25}/>
          <Text style={style.backText}>Voltar a categoria anterior</Text>
        </Pressable>
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
    </View>
  )
}


const style = StyleSheet.create({

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


