import type { PressableProps, ViewStyle } from 'react-native'
import { Pressable, StyleSheet, View } from 'react-native'
import { GdocText } from './gdoc-text'
import type { IconSource } from 'react-native-paper/src/components/Icon'
import AvatarIcon from 'react-native-paper/src/components/Avatar/AvatarIcon'
import { theme } from '@/theme'
import { Text } from 'react-native-paper'

type Props = PressableProps & {
  icon: IconSource;
  optionName: string,
  description?: string,
  onPress: () => void;
}

export function OptionCard({icon, optionName, description, onPress, ...rest}: Props) {
  return (
    <Pressable {...rest} style={[styles.container, rest.style as ViewStyle]} onPress={onPress}>
      <AvatarIcon size={50} icon={icon} style={styles.image}/>
      <View style={{flex:1, alignItems: 'center'}}>
        <GdocText>{optionName}</GdocText>

        {description && (<Text style={styles.description}>
          {description}
        </Text>)}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#AEAEAE',
    borderWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 13.4,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  image: {
    height: 50,
    width: 50,
    backgroundColor: `${theme.colors.primary  }EE`
  },
  description: {
    fontSize: 12,
    color: theme.colors.text
  }
})
