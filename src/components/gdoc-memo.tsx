import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '@/theme'

type Props = {
  title: string;
  description: string;
}

export function GdocMemo({title, description}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray,
    width: '100%',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  text: {
    fontSize: 14,
    alignSelf: 'flex-start',
    color: '#7C7C7C'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: '#7C7C7C'
  }
})
