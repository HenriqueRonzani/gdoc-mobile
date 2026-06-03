import { Image, StyleSheet, View } from 'react-native'
import { theme } from '@/theme'
import { IconButton, Text } from 'react-native-paper'
import { useAuth } from '@/providers/auth-provider'
import type { SectionsConfig } from '@/components/gdoc-sections-renderer'
import { SectionsRenderer } from '@/components/gdoc-sections-renderer'
import type { DrawerContentComponentProps } from '@react-navigation/drawer'
import { useProfile } from '@/providers/profile-provider'

const getDrawerConfig = ({navigation}: DrawerContentComponentProps): SectionsConfig => {
  return [
    {
      name: 'Navegação',
      items: [
        {
          icon: 'home',
          title: 'Página Inicial',
          onPress: () => navigation.navigate('Menu')
        },
        {
          icon: 'account',
          title: 'Meu Perfil',
          onPress: () => navigation.navigate('Profile')
        },
        {
          icon: 'inbox',
          title: 'Minhas Solicitações',
          onPress: () => navigation.navigate('Inbox')
        }
      ]
    },
    {
      name: 'Serviços',
      items: [
        {
          icon: 'file-document-multiple-outline',
          title: 'Carta de Serviço',
          onPress: () => navigation.navigate('Menu')
        }
      ]
    },
  ]
}

export function MainDrawerContent(props: DrawerContentComponentProps) {
  const {clearToken} = useAuth()
  const {profile} = useProfile()
  const drawerItems = getDrawerConfig(props)
  return (
    <View style={style.container}>
      <View style={style.drawerHeader}>
        <View style={style.userData}>
          <Image source={{uri: profile.person.photo_link}} style={style.userAvatar} resizeMode="contain"/>
          <Text style={{fontSize: 10}}>{profile.person.name}</Text>
        </View>
        <IconButton icon={'logout'} size={15} iconColor={theme.colors.primaryText} onPress={clearToken}/>
      </View>
      <View style={style.content}>
        <SectionsRenderer drawerSectionsConfig={drawerItems}/>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  drawerHeader: {
    backgroundColor: theme.colors.gray,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 50,
    padding: 5
  },
  userData: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 5
  },
  userAvatar: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: theme.colors.gray
  },
  content: {
    padding: 5
  }
})
