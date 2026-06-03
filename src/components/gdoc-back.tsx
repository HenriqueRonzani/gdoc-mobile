import { Pressable, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { Icon } from 'react-native-paper/src'

type Props = {
  text: string
  onPress: () => void
}

export function GdocBack ({text, onPress}: Props)  {
  return (
    <Pressable style={style.backContainer} onPress={onPress}>
      <Icon source={'arrow-left'} size={25}/>
      <Text style={style.backText}>{text}</Text>
    </Pressable>
  )
}

const style = StyleSheet.create({
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backText: {
    fontSize: 12
  },
})
