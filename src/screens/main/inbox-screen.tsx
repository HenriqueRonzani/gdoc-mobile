import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { IconButton, Text, TextInput } from 'react-native-paper'

import { InboxItem } from '@/components/screens/main/inbox/inbox-item'
import api from '@/lib/axios'
import { useAuth } from '@/providers/auth-provider'

export function InboxScreen() {
  const auth = useAuth()

  const [tab, setTab] = useState('opened_by_me')
  const [data, setData] = useState<any[]>([])
  const [search, setSearch] = useState('')

  const getInbox = async (tab: string, search: string) => {
    try {
      const response = await api.get('inbox/query/external', {
        params: { tab, search },
      })

      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchInbox = async () => {
      const response = await getInbox(tab, search)
      setData(response?.data ?? [])
    }

    fetchInbox()
  }, [])

  useEffect(() => {
    const fetchInbox = async () => {
      const response = await getInbox(tab, search)
      setData(response?.data ?? [])
    }

    fetchInbox()
  }, [tab, search])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas solicitações</Text>

      <View style={styles.filter}>
        {/* SEARCH */}
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
            onPress={() => setSearch('')}
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
            style={[
              styles.tab,
              tab === 'opened_by_others' && styles.tabActive,
            ]}
            onPress={() => setTab('opened_by_others')}
          >
            <Text
              style={
                tab === 'opened_by_others'
                  ? styles.textActive
                  : styles.textInactive
              }
            >
              Aberto por outros
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

      <View>
        {data.map((item, index) => (
          <InboxItem key={index} item={item} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },

  title: {
    fontSize: 36,
    alignSelf: 'center',
    marginTop: 32,
  },

  filter: {
    width: 336,
    height: 111,
    alignSelf: 'center',
    marginTop: 36,
    padding: 14,

    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    backgroundColor: '#F5F5F5',
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  searchInput: {
    width: 272,
    height: 40,
  },

  icon: {
    margin: 0,
  },

  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },

  tab: {
    paddingBottom: 4,
  },

  tabActive: {
    borderBottomWidth: 1,
    borderColor: '#1F1B79',
  },

  textActive: {
    color: '#1F1B79',
  },

  textInactive: {
    color: '#737373',
  },
})