import type { Subject } from '@/types/service'
import { StyleSheet, View } from 'react-native'
import { GdocSubject } from '@/components/screens/main/menu/gdoc-subject'
import { Text } from 'react-native-paper'
import { theme } from '@/theme'

type Props = {
  categories: Subject[]
  onPressCategory: (id: number) => void
}

export const GdocCategories = ({categories, onPressCategory}: Props) => {
  return (
    <View style={style.container}>
      {categories.length > 0 && <Text style={style.text}>Categorias</Text>}
      {categories.map((item: Subject) => (
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
