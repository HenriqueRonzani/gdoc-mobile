import Pdf from 'react-native-pdf'
import { Image, StyleSheet, View } from 'react-native'
import { theme } from '@/theme'
import { Icon } from 'react-native-paper/src'

type Props = {
  type: 'image' | 'pdf' | 'other' | string
  source: { uri: string }
  small?: boolean
}

export function AttachmentPreview({type, source, small = false}: Props) {
  return (
    <View style={style.previewContainer}>
      {type === 'pdf' && (
        <Pdf
          source={source}
          singlePage
          style={style.preview}
        />
      )}
      {type === 'image' && (
        <Image
          source={source}
          style={style.preview}
        />
      )}
      {type !== 'pdf' && type !== 'image' && (
        <View style={{margin: 'auto'}}>
          <Icon
            size={small ? 20 : 40}
            source={'attachment-check'}
          />
        </View>
      )}
    </View>
  )
}

const style = StyleSheet.create({
  previewContainer: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: theme.colors.gray
  },
  preview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
})
