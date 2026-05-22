import { Pressable, StyleSheet, View } from 'react-native'
import { ClientLogo } from '@/components/client-logo'
import { Text } from 'react-native-paper'
import { theme } from '@/theme'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import MaterialCommunityIcon from 'react-native-paper/src/components/MaterialCommunityIcon'
import { useOrganization } from '@/providers/organization-provider'

export function MainHeader() {
  const {organization} = useOrganization()
  const navigation = useNavigation()
  return (
    <View style={style.header}>
      <View style={{flexDirection: 'row', width: '50%', gap: 5, alignItems: 'center'}}>
        <ClientLogo style={style.logo}/>
        <View style={{flexDirection: 'column'}}>
          <Text style={{fontSize: 12}}>{organization.name}</Text>
          <Text style={{fontSize: 12, color: theme.colors.text, fontWeight: 'bold'}}>Central de Atendimento</Text>
        </View>
      </View>

      <View style={style.hamburgerContainer}>
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <MaterialCommunityIcon name="menu" size={32} color="black" direction={'ltr'}/>
        </Pressable>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  header: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: theme.colors.text + 20
  },
  logo: {
    width: 45,
    height: 45
  },
  hamburgerContainer: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'flex-end',
    alignSelf: 'center'
  }
})
