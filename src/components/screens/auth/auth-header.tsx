import { Image, StyleSheet, View } from 'react-native'
import GdocWhite from '@/assets/gdoc-white.png'
import { theme } from '@/theme'

export function AuthHeader() {
  return (
    <View style={style.header}>
      <Image
        source={GdocWhite}
        style={style.image}
        resizeMode="contain"
      />
    </View>
  )
}

const style = StyleSheet.create({
  header: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    color: 'white',
    padding: 10
  },
  image: {
    height: '100%',
    width: undefined,
    aspectRatio: 3
  }
})
