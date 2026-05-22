import { Pressable, StyleSheet, View } from 'react-native'
import { theme } from '@/theme'
import { Avatar, Text } from 'react-native-paper'
import { Icon } from 'react-native-paper/src'

type props = {
  iconName: string
  iconColor: string
  title: string
  onPress: () => void
}

export function GdocSubject({iconName, iconColor, title, onPress}: props) {
  return (
    <Pressable style={style.container} onPress={onPress}>
      <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
        <View>
          <Avatar.Icon
            icon={iconName}
            size={40}
            color={iconColor}
            style={{ backgroundColor: `${iconColor ?? '#000000'}20` }}
          />
        </View>
        <Text style={style.title}>{title}</Text>
      </View>
      <View style={style.gotoIcon}>
        <Icon source={'arrow-right'} size={25}/>
      </View>
    </Pressable>
  )
}

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: theme.colors['component-off'],
    borderRadius: 5,
    backgroundColor: theme.colors.background
  },
  gotoIcon: {
    padding: 2,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.colors.primary
  },
  title: {
    color: theme.colors.primary,
    flexWrap: 'wrap',
    width: '70%'
  }
})