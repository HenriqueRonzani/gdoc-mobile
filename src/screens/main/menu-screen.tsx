import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { GdocPageTitle } from '@/components/gdoc-page-title'
import { useOrganization } from '@/providers/organization-provider'
import { GdocCategories } from '@/components/screens/main/menu/gdoc-categories'
import { GdocServices } from '@/components/screens/main/menu/gdoc-services'
import { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { Icon } from 'react-native-paper/src'
import { Subject } from '@/types/service'
import { getRootServiceLetter, getServiceLetterByCategory } from '@/services/service.service'
import { useSnackbar } from '@/providers/snackbar-provider'
import { useNavigation } from '@react-navigation/native'
import type { NavigatorType } from '@/types/navigation'

export function MenuScreen() {
  const {toastError} = useSnackbar()
  const {organization} = useOrganization()
  const navigation = useNavigation<NavigatorType>()

  const [loading, setLoading] = useState<boolean>(false)
  const [categories, setCategories] = useState<Subject[]>([])
  const [services, setServices] = useState<Subject[]>([])
  const [parentIds, setParentIds] = useState<number[]>([])

  const serviceLetterId = organization.external_service_letter_id

  const onPressCategory = (clickedServiceId: number) => {
    setParentIds([...parentIds, clickedServiceId])
  }

  const onPressService = (id: number) => {
    navigation.navigate('CreateDocument', {
      serviceId: id
    })
  }

  const onPreviousCategory = () => {
    if (parentIds.length > 0) {
      setParentIds(parentIds.slice(0, parentIds.length - 1))
    }
  }

  const loadCategories = async () => {
    setLoading(true)
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
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [parentIds])

  return (
    <ScrollView style={style.container}>
      <GdocPageTitle>Serviços</GdocPageTitle>
      <View style={style.content}>
        <Text style={style.text}>Busque e solicite os serviços oferecidos por {organization.name}</Text>
        {parentIds.length > 0 && (
          <Pressable style={style.backContainer} onPress={onPreviousCategory}>
            <Icon source={'arrow-left'} size={25}/>
            <Text style={style.backText}>Voltar a categoria anterior</Text>
          </Pressable>
        )}
        {loading
          ? <ActivityIndicator animating={true}/>
          : (
            <View>
              <GdocCategories categories={categories} onPressCategory={onPressCategory}/>
              <GdocServices services={services} onPressService={onPressService}/>
            </View>
          )
        }
      </View>
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

