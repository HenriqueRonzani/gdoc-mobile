import { DocumentInfo, TimelineDispatch } from '@/types/document'
import { Pressable, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import dayjs from 'dayjs'
import Pdf from 'react-native-pdf'
import { GdocAttachment } from '@/components/gdoc-attachment'
import { theme } from '@/theme'
import { Icon } from 'react-native-paper/src'
import { File, Paths } from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import { useSnackbar } from '@/providers/snackbar-provider'
import { useState } from 'react'
import { handleRequestError } from '@/services/request-error.helper'

type Props = {
  timelineItem: TimelineDispatch
  documentInfo: DocumentInfo
  isFirst?: boolean
}

export function Dispatch({timelineItem, documentInfo, isFirst}: Props) {
  const {toastError} = useSnackbar()
  const date = dayjs(timelineItem.created_at)
  const dateString = date.format('DD/MM/YYYY')
  const hourString = date.format('HH:mm')

  const [isDownloading, setIsDownloading] = useState<boolean>(false)

  const downloadDispatch = async () => {
    if (isDownloading) return

    try {
      setIsDownloading(true)
      const name = `${documentInfo.subject_type}-${documentInfo.number}`;
      const safeName = name.replace(/[\/\\.: ]/g, '_');
      const timestamp = new Date().getTime();

      const file = new File(Paths.cache, `${safeName}_${timestamp}.pdf`)
      await File.downloadFileAsync(timelineItem.url, file)

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(file.uri, {
          mimeType: 'application/pdf',
          UTI: 'com.adobe.pdf',
          dialogTitle: 'Compartilhar Despacho'
        })
      }
    } catch (error: unknown) {
      handleRequestError(error, toastError, 'Erro ao baixar despacho')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <View style={[style.container, {width: isFirst ? '100%' : '80%'}]}>
      <View style={style.header}>
        <Text style={style.headerText}>
          <Text style={style.headerFieldName}>Tipo do documento: </Text>
          <Text style={style.headerFieldValue}>{documentInfo.request_type}</Text>
        </Text>

        <Text style={style.headerText}>
          <Text style={style.headerFieldName}>Número: </Text>
          <Text style={style.headerFieldValue}>{documentInfo.number}</Text>
          <Text style={style.headerFieldName}> - Despacho: </Text>
          <Text style={style.headerFieldValue}>{timelineItem.dispatch_number}</Text>
        </Text>

        <Text style={style.headerText}>
          <Text style={style.headerFieldName}>Criado por: </Text>
          <Text style={style.headerFieldValue}>{timelineItem.created_by}</Text>
        </Text>

        <Text style={style.headerText}>
          <Text style={style.headerFieldName}>Criado em: </Text>
          <Text style={style.headerFieldValue}>{dateString}</Text>
          <Text style={style.headerFieldName}> às </Text>
          <Text style={style.headerFieldValue}>{hourString}</Text>
        </Text>

        {timelineItem.created_by_sector && (
          <Text style={style.headerText}>
            <Text style={style.headerFieldName}>Setor: </Text>
            <Text style={style.headerFieldValue}>{timelineItem.created_by_sector}</Text>
          </Text>
        )}
      </View>
      <Pdf
        trustAllCerts={false}
        source={{uri: timelineItem.url, cache: true}}
        style={style.pdf}
        renderActivityIndicator={() => (
          <ActivityIndicator animating/>
        )}
      />
      <View style={style.footer}>
        <View>
          <Text style={style.footerSectionHeader}>Baixar PDF do despacho</Text>
          <Pressable style={style.downloadDispatchButton} onPress={downloadDispatch}>
            <Icon size={15} source={'download'} color={theme.colors.primaryText}/>
            <Text style={style.infoText}>Toque para baixar o despacho</Text>
          </Pressable>
        </View>

        {timelineItem.attachments.length > 0 && (
          <View style={{gap: 10}}>
            <View>
              <Text style={style.footerSectionHeader}>Anexos</Text>
              <View style={style.infoContainer}>
                <Icon size={12} source={'information'} color={theme.colors.primaryText}/>
                <Text style={style.infoText}>Toque em um anexo para baixá-lo</Text>
              </View>
            </View>
            <View style={style.attachments}>
              {timelineItem.attachments.map(attachment => (
                <GdocAttachment
                  key={attachment.name}
                  attachment={attachment}
                />
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: theme.colors.text,
    borderRadius: 10
  },
  header: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: theme.colors.text,
    backgroundColor: theme.colors.gray + 'AA',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  headerText: {
    color: theme.colors.primaryText
  },
  headerFieldName: {
    fontSize: 10
  },
  headerFieldValue: {
    fontSize: 11,
    color: '#000000' + 'CC',
    fontWeight: 'bold'
  },
  pdf: {
    width: '100%',
    height: 400
  },
  footer: {
    padding: 10,
    gap: 10
  },
  footerSectionHeader: {
    fontSize: 12,
    color: theme.colors.primaryText,
    fontWeight: 'bold'
  },
  infoContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center'
  },
  infoText: {
    fontSize: 10,
    color: theme.colors.primaryText
  },
  downloadDispatchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.gray,
    padding: 6,
    gap: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.text
  },
  attachments: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})
