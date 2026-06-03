import { Pressable, StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-paper/src'
import { theme } from '@/theme'
import { Text } from 'react-native-paper'
import { GdocDivider } from '@/components/gdoc-divider'

type ItemConfig = {
  icon: string
  title: string
  onPress: () => void
}

type SectionConfig = {
  name: string
  items: ItemConfig[]
}

export type SectionsConfig = SectionConfig[]

type SectionsProp = {
  drawerSectionsConfig: SectionsConfig
}

function SectionItem({icon, title, onPress}: ItemConfig) {
  return (
    <Pressable style={style.item} onPress={onPress}>
      <View style={style.itemIcon}>
        <Icon size={15} source={icon} color={theme.colors.primaryText}/>
      </View>
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={style.itemText}
      >
        {title}
      </Text>
    </Pressable>
  )
}

function Section({name, items}: SectionConfig) {
  return (
    <View style={style.section}>
      <Text style={style.sectionText}>{name}</Text>
      <View style={style.sectionItems}>
        {items.map(item => (
          <SectionItem key={item.title} {...item}/>
        ))}
      </View>
    </View>
  )
}

export function SectionsRenderer({drawerSectionsConfig}: SectionsProp) {
  return (
    <View>
      {drawerSectionsConfig.map((config, index) => (
        <View key={config.name} style={style.sectionContainer}>
          <Section {...config}/>
          {index < drawerSectionsConfig.length - 1 && <GdocDivider style={style.sectionDivider}/>}
        </View>
      ))}
    </View>
  )
}

const style = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  itemIcon: {
    marginHorizontal: 10,
    alignItems: 'center'
  },
  itemText: {
    fontSize: 12,
    flex: 1,
    color: '#0e0e0e'
  },
  sectionItems: {
    width: '100%',
    paddingRight: 20,
    gap: 10
  },
  section: {
    width: '100%',
    marginLeft: 5,
    gap: 10,
    paddingVertical: 10
  },
  sectionText: {
    fontSize: 12,
    color: theme.colors.text,
    fontWeight: 'bold'
  },
  sectionContainer: {
    gap: 10
  },
  sectionDivider: {
    backgroundColor: theme.colors.text
  }
})
