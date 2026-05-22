import { Service } from '@/types/service'
import { useEffect, useState } from 'react'
import { getServices } from '@/services/service.service'
import { GdocSubject } from '@/components/screens/main/menu/gdoc-subject'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import { theme } from '@/theme'
import { useSnackbar } from '@/providers/snackbar-provider'

type Props = {
  serviceLetterId: number
  serviceId: number
}

export const GdocServices = ({serviceLetterId, serviceId}: Props) => {
  const {toastError} = useSnackbar()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const loadServices = async () => {
    setLoading(true)
    try {
      const response = await getServices(serviceLetterId, serviceId)
      setServices(response.items)
    } catch (error: unknown) {
      toastError('Erro ao carregar categorias')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    loadServices()
  }, [serviceId])

  return loading
    ? <ActivityIndicator animating={true}/>
    : (
      <View style={style.container}>
        <Text style={style.text}>Serviços</Text>
        {services.map((item: Service) => (
          <GdocSubject
            key={item.id}
            iconName={item.icon_name}
            iconColor={item.icon_color}
            title={item.name}
            onPress={() => console.log(`Clique no serviço ${item.name}`)}
          />
        ))}
        {services.length === 0 && (
          <Text style={style.noServiceText}>Nenhum serviço para esta categoria.</Text>
        )}
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
  noServiceText: {
    fontSize: 12,
    alignItems: 'center',
    alignSelf: 'center'
  }
})