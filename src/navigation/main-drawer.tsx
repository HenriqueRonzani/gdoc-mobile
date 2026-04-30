import { createDrawerNavigator } from '@react-navigation/drawer'
import { MenuScreen } from '@/screens/main/menu-screen'
import { ProfileScreen } from '@/screens/main/profile-screen'
import { InboxScreen } from '@/screens/main/inbox-screen'
import { MainHeader } from "@/components/screens/main/main-header";
import { theme } from '@/theme'
import { MainDrawerContent } from '@/components/screens/main/main-drawer-content'
import { AuthProvider } from '@/providers/auth-provider';

const Drawer = createDrawerNavigator()

export function MainDrawer() {
  return (
    <AuthProvider>
      <Drawer.Navigator
        initialRouteName={'Menu'}
        backBehavior={'initialRoute'}
        defaultStatus={'closed'}
        drawerContent={(props) => <MainDrawerContent {...props}/>}
        screenOptions={{
          drawerPosition: 'right',
          drawerType: 'front',
          drawerStyle: {
            backgroundColor: theme.colors.background,
            width: '50%',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderWidth: 0,
          },
          sceneStyle: {
            backgroundColor: theme.colors.gray,
            borderRadius: 0,
            overflow: 'hidden'
          },
          header: () => <MainHeader/>,
        }}
      >
        <Drawer.Screen name={'Menu'} component={MenuScreen}/>
        <Drawer.Screen name={'Profile'} component={ProfileScreen}/>
        <Drawer.Screen name={'Inbox'} component={InboxScreen}/>
      </Drawer.Navigator>
    </AuthProvider>
  )
}
