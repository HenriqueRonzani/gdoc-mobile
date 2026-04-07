import { Image, ImageSourcePropType, Pressable, StyleSheet, View } from 'react-native'
import { GdocText } from './gdoc-text'

type Props = {
  imageSource: ImageSourcePropType;
  optionName: string,
  onPress: () => void;
}

export function OptionCard({imageSource, optionName, onPress}: Props) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={imageSource} style={styles.image} resizeMode="contain"/>
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
    gap: 13.4
  },
  image: {
    height: 48,
    width: 48
  }
})