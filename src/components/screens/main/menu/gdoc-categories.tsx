import { getCategories } from '@/services/service.service'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Category } from '@/types/service'
import { StyleSheet, View } from 'react-native'
import { GdocSubject } from '@/components/screens/main/menu/gdoc-subject'
import { ActivityIndicator, Text } from 'react-native-paper'
import { theme } from '@/theme'
import { useSnackbar } from '@/providers/snackbar-provider'

type Props = {
  serviceLetterId: number
  serviceId: number
  onPressCategory: (id: number) => void
  setParentId: Dispatch<SetStateAction<number|null>>
}

export const GdocCategories = ({serviceLetterId, serviceId, onPressCategory, setParentId}: Props) => {
  const {toastError} = useSnackbar()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const loadCategories = async () => {
    setLoading(true)
    try {
      const response = await getCategories(serviceLetterId, serviceId)
      setCategories(response.items)
      setParentId(response.parent_service?.id)
    } catch (error: unknown) {
      toastError('Erro ao carregar categorias')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [serviceId])

  return loading
    ? <ActivityIndicator animating={true}/>
    : (
      <View style={style.container}>
        {categories.length > 0 && <Text style={style.text}>Categorias</Text>}
        {categories.map((item: Category) => (
          <GdocSubject
            key={item.id}
            iconName={item.icon_name}
            iconColor={item.icon_color}
            title={item.name}
            onPress={() => onPressCategory(item.id)}
          />
        ))}
      </View>
    )
}

const style = StyleSheet.create({
  container: {
    gap: 10
  },
  text: {
    fontSize: 25,
    alignSelf: 'center',
    color: theme.colors.primary
  },
  noCategoryText: {
    fontSize: 12,
    alignItems: 'center',
    alignSelf: 'center'
  }
})
