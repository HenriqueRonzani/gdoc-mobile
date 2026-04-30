import { Pressable, PressableProps, StyleSheet, View, ViewStyle } from 'react-native'
import { GdocText } from './gdoc-text'
import { IconSource } from 'react-native-paper/src/components/Icon'
import AvatarIcon from 'react-native-paper/src/components/Avatar/AvatarIcon'
import { theme } from '@/theme'

type Props = PressableProps & {
  icon: IconSource;
  optionName: string,
  onPress: () => void;
}

export function OptionCard({icon, optionName, onPress, ...rest}: Props) {
  return (
    <Pressable {...rest} style={[styles.container, rest.style as ViewStyle]} onPress={onPress}>
      <AvatarIcon size={50} icon={icon} style={styles.image}/>
      <GdocText>{optionName}</GdocText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#AEAEAE',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 13.4,
    padding: 10
  },
  image: {
    height: 50,
    width: 50,
    backgroundColor: theme.colors.primary + 'EE',
  }
})
