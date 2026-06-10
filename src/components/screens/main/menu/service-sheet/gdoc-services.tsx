import type { Subject } from '@/types/service'
import { GdocSubject } from '@/components/screens/main/menu/gdoc-subject'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '@/theme'

type Props = {
  services: Subject[]
  onPressService: (id: number) => void
}

export const GdocServices = ({services, onPressService}: Props) => {
  return (
    <View style={style.container}>
      <Text style={style.text}>Serviços</Text>
      {services.map((item: Subject) => (
        <GdocSubject
          key={item.id}
          iconName={item.icon_name}
          iconColor={item.icon_color}
          title={item.name}
          onPress={() => onPressService(item.id)}
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
