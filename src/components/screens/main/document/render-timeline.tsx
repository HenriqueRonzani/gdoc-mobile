import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import { handleRequestError } from '@/services/request-error.helper'
import { DocumentInfo, TimelineDispatch } from '@/types/document'
import { getDocumentTimeline } from '@/services/document.service'
import { useSnackbar } from '@/providers/snackbar-provider'
import { Dispatch } from '@/components/screens/main/document/Dispatch'
import { theme } from '@/theme'
import dayjs from 'dayjs'

type Props = {
  uuid: string
  documentInfo?: DocumentInfo
}

export function RenderTimeline({uuid, documentInfo}: Props) {
  const {toastError} = useSnackbar()

  const [firstDispatch, setFirstDispatch] = useState<TimelineDispatch>()
  const [timeline, setTimeline] = useState<TimelineDispatch[]>()
  const [loading, setLoading] = useState<boolean>(false)

  const loadTimeline = async () => {
    try {
      setLoading(true)
      const response = await getDocumentTimeline(uuid)
      setFirstDispatch(response[0])
      setTimeline(response.slice(1))
    } catch (error: unknown) {
      handleRequestError(error, toastError, 'Erro ao carregar timeline do documento')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTimeline()
  }, [uuid])

  if (loading) return <ActivityIndicator animating/>

  if (!(timeline && documentInfo)) return <Text>Nenhum conteúdo na timeline</Text>

  return (
    <View style={style.container}>
      {firstDispatch && (
        <Dispatch
          key={0}
          timelineItem={firstDispatch}
          documentInfo={documentInfo}
          isFirst={true}
        />
      )}

      <View style={style.timelineContainer}>

        <View style={style.lineContainer}>
          <View style={style.line}/>
        </View>

        <View style={style.timelineDispatches}>
          {timeline.map((item, index) => (
              <View style={style.dispatchContainer}>
                <Text style={style.dispatchText}>Novo despacho - {dayjs(item.created_at).format('DD/MM/YYYY')}</Text>
                <Dispatch
                  key={index}
                  timelineItem={item}
                  documentInfo={documentInfo}
                  isFirst={true}
                />
              </View>
            )
          )}
        </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {},
  timelineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  lineContainer: {
    width: '10%',
    alignItems: 'center'
  },
  timelineDispatches: {
    flex: 1,
    flexDirection: 'column',
    gap: 20
  },
  dispatchContainer: {
    width: '100%',
    marginTop: 20,
    gap: 5
  },
  dispatchText: {
    color: theme.colors.primaryText,
    fontSize: 12
  },
  line: {
    width: 1,
    flex: 1,
    backgroundColor: theme.colors.primaryText
  }
})
