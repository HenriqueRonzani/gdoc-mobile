import { Attachment } from '@/types/document'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Pdf from 'react-native-pdf'
import { File, Paths } from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import { theme } from '@/theme'
import { useEffect, useState } from 'react'
import { Icon } from 'react-native-paper/src'
import { useSnackbar } from '@/providers/snackbar-provider'
import { handleRequestError } from '@/services/request-error.helper'
import { AttachmentPreview } from '@/components/attachment-preview'

type Props = {
  attachment: Attachment
}

export function GdocAttachment({attachment}: Props) {
  const {toastError} = useSnackbar()

  const [isDownloading, setIsDownloading] = useState<boolean>(false)

  const downloadFile = async () => {
    if (isDownloading) return

    try {
      setIsDownloading(true)
      const timestamp = new Date().getTime()

      const file = new File(Paths.cache, `${timestamp}_${attachment.name}`)
      await File.downloadFileAsync(attachment.url, file)

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(file.uri, {
          mimeType: attachment.type,
          dialogTitle: 'Compartilhar Anexo'
        })
      }
    } catch (error: unknown) {
      handleRequestError(error, toastError, 'Erro ao baixar despacho')
    } finally {
      setIsDownloading(false)
    }
  }

  const getSize = () => {
    const kbSize = attachment.size / 1024

    if (kbSize < 1024) {
      return `${kbSize.toFixed(2)} KB`
    }

    const mbSize = kbSize / 1024
    return `${mbSize.toFixed(2)} MB`
  }

  const getAttachmentType = () => {
    if (attachment.type === 'application/pdf') return 'pdf'
    if (attachment.type.startsWith('image/')) return 'image'
    return 'other'
  }

  return (
    <Pressable
      style={style.container}
      onPress={downloadFile}
    >
      <AttachmentPreview
        type={getAttachmentType()}
        source={{uri: attachment.url}}
      />

      <View style={style.footer}>
        <Icon size={15} source={'download'} color={theme.colors.primaryText}/>
        <View>
          <Text style={style.attachmentName}>{attachment.name}</Text>
          <Text style={style.footerText}>
            <Text>{getSize()}</Text>
          </Text>
        </View>
      </View>
    </Pressable>
  )
}

const style = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: theme.colors.gray,
    height: 100,
    width: 100
  },
  previewContainer: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: theme.colors.gray
  },
  preview: {
    width: '100%',
    height: '100%'
  },
  footer: {
    padding: 2,
    alignItems: 'center',
    flexDirection: 'row'
  },
  attachmentName: {
    fontSize: 6,
    color: theme.colors.primaryText,
    fontWeight: 'bold'
  },
  footerText: {
    fontSize: 8,
    color: theme.colors.primaryText,
    fontWeight: 'bold'
  }
})
