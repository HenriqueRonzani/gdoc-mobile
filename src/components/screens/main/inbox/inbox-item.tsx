import type { InboxDocument } from '@/types/inbox'
import { Pressable, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '@/theme'
import { Icon } from 'react-native-paper/src'
import dayjs from 'dayjs'
import { Feather } from '@expo/vector-icons'
import { formatFeatherIconName } from '@/services/format-feather-icon-name.helper'
import { useNavigation } from '@react-navigation/native'
import { NavigatorType } from '@/types/navigation'

type props = {
  item: InboxDocument
}

export function InboxItem({item}: props) {
  const navigation = useNavigation<NavigatorType>()
  const onOpen = () => {
    navigation.navigate('Document', {uuid: item.email_uuid})
  }

  const icon = formatFeatherIconName(item.document_type_icon)

  return (
    <View style={[style.itemContainer, item.has_update && style.itemHasUpdate]}>
      <View style={style.itemHeader}>
        <View style={style.iconContainer}>
          <Icon color={theme.colors.primaryText} source={(props: any) => <Feather {...props} name={icon}/>} size={30}/>
        </View>
        <View style={style.textContainer}>
          <Text>
            <Text style={style.numberText}>{item.number}</Text>
            <Text style={style.typeText}> | {item.document_type_name}</Text>
          </Text>
          <View>
            <Text style={style.createdAtText}>{dayjs(item.created_at).format('DD/MM/YYYY HH:mm')}</Text>
            <Text style={style.subjectText}>{item.subject_name}</Text>
            <Text style={style.createdByText}>{item.created_by}</Text>
          </View>
        </View>
      </View>

      <Pressable style={style.openContainer} onPress={onOpen}>
        <Icon color={theme.colors.primaryText} source={'eye-outline'} size={20}/>
        <Text style={style.openText}>Abrir</Text>
      </Pressable>
    </View>
  )
}

const style = StyleSheet.create({
  itemContainer: {
    backgroundColor: theme.colors.background,
    padding: 10,
    marginVertical: 5,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    gap: 10,
    width: '98%',
    borderWidth: 1,
    borderColor: theme.colors.text
  },
  itemHasUpdate: {
    borderLeftWidth: 2,
    borderLeftColor: theme.colors.primary
  },
  itemHeader: {
    flexDirection: 'row',
    gap: 20
  },
  iconContainer: {
    borderWidth: 1,
    height: 40,
    width: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colors.text
  },
  textContainer: {
    gap: 10,
    width: '80%'
  },
  openContainer: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center'
  },
  numberText: {
    fontSize: 13,
    fontWeight: 'bold'
  },
  typeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.text
  },
  createdAtText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: theme.colors.text
  },
  subjectText: {
    fontSize: 13,
    fontWeight: 'bold'
  },
  createdByText: {
    fontSize: 11,
    color: theme.colors.primaryText
  },
  openText: {
    fontSize: 11
  }
})
