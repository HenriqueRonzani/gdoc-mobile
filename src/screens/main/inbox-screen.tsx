import { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { ActivityIndicator, IconButton, Text, TextInput } from 'react-native-paper'
import { InboxItem } from '@/components/screens/main/inbox/inbox-item'
import { getInbox } from '@/services/api/inbox.service'
import { useSnackbar } from '@/providers/snackbar-provider'
import { debounce } from 'lodash'
import { GdocPageTitle } from '@/components/gdoc-page-title'
import type { InboxDocument } from '@/types/inbox'
import { handleRequestError } from '@/services/request-error.helper'
import { useProfile } from '@/providers/profile-provider'
import { loadNextPage } from '@/services/api/common.service'
import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native'

export function InboxScreen() {
  const {toastError} = useSnackbar()
  const {profile} = useProfile()

  const [tab, setTab] = useState('opened_by_me')
  const [data, setData] = useState<InboxDocument[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingNextPage, setLoadingNextPage] = useState(false)
  const [nextPageUrl, setNextPageUrl] = useState < string | null | undefined>()

  const filterDocuments = (documents: InboxDocument[]) => {
    return documents.filter(item => item.created_by === profile.person.name)
  }

  const getInboxItems = async () => {
    setLoading(true)
    try {
      const response = await getInbox({tab, search})
      setData(response?.data ? filterDocuments(response.data) : [])
      setNextPageUrl(response.next_page_url)
    } catch (error: unknown) {
      handleRequestError(error, toastError, 'Erro ao buscar documentos!')
    } finally {
      setLoading(false)
    }
  }

  const getInboxItemsDebounce = debounce(getInboxItems, 500)

  const getNextPage = async ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!nextPageUrl) return

    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent
    if (layoutMeasurement.height + contentOffset.y < contentSize.height - 20) return

    try {
      setLoadingNextPage(true)
      const response = await loadNextPage<InboxDocument>(nextPageUrl)
      setData([...data, ...filterDocuments(response.data)])
      setNextPageUrl(response.next_page_url)
    } catch (error: unknown) {
      handleRequestError(error, toastError, 'Erro ao buscar documentos!')
    } finally {
      setLoadingNextPage(false)
    }
  }

  useEffect(() => {
    getInboxItemsDebounce()
  }, [tab, search])

  return (
    <View style={styles.container}>
      <GdocPageTitle>Minhas solicitações</GdocPageTitle>

      <View style={styles.filter}>
        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            mode="outlined"
            value={search}
            onChangeText={setSearch}
            placeholder="Pesquisar"
          />

          <IconButton
            icon="refresh"
            size={20}
            onPress={() => getInboxItemsDebounce()}
            style={styles.icon}
          />
        </View>

        <View style={styles.tabRow}>
          <Pressable
            style={[styles.tab, tab === 'opened_by_me' && styles.tabActive]}
            onPress={() => setTab('opened_by_me')}
          >
            <Text
              style={
                tab === 'opened_by_me'
                  ? styles.textActive
                  : styles.textInactive
              }
            >
              Abertos por mim
            </Text>
          </Pressable>

          <Pressable
            style={[styles.tab, tab === 'archived' && styles.tabActive]}
            onPress={() => setTab('archived')}
          >
            <Text
              style={
                tab === 'archived'
                  ? styles.textActive
                  : styles.textInactive
              }
            >
              Concluído
            </Text>
          </Pressable>

        </View>

      </View>

      { loading
        ? <ActivityIndicator animating={true} />
        : <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={nativeEvent => getNextPage(nativeEvent)}
        >
          { data.length === 0
            ? <Text style={{textAlign: 'center'}}>Nenhum registro encontrado.</Text>

            : data.map(item => (
              <InboxItem
                key={item.number}
                item={item}
              />

            ))
          }
          { loadingNextPage && <ActivityIndicator animating={true} /> }
        </ScrollView>
      }

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    gap: 5
  },

  filter: {
    width: '100%',
    height: 111,
    alignSelf: 'center',
    padding: 14,

    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    backgroundColor: '#F5F5F5'
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  searchInput: {
    width: 272,
    height: 40
  },

  icon: {
    margin: 0
  },

  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1
  },

  tab: {
    paddingBottom: 4
  },

  tabActive: {
    borderBottomWidth: 1,
    borderColor: '#1F1B79'
  },

  textActive: {
    color: '#1F1B79'
  },

  textInactive: {
    color: '#737373'
  }
})
