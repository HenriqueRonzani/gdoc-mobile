import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { InboxItem } from '@/components/screens/main/inbox/inbox-item'

const inboxItem = {
  allow_external_archievement: false,
  created_at: '2024-04-05T12:24:57.000000Z',
  created_by: 'Henrique Ronzani',
  document_status_class: 'published',
  document_status_name: 'Em andamento',
  document_type_icon: 'folder',
  document_type_name: 'Comissão PAD',
  document_type_type: '14d1905c-33a7-4b9b-a31f-9e8306a8192c',
  email_uuid: '831710fd-21e3-47ff-b473-d07887f57c2a',
  has_update: true,
  number: 'CPAD-14/2024',
  subject_name: 'Abertura de Sindicância-PAD',
  user_has_pending_signature: false,
  users_can_reopen_document: true,
}

export function InboxScreen() {
  return (
    <View style={style.container}>
      <Text>Tela de solicitações</Text>
      <View>
        <InboxItem item={inboxItem}/>
        <InboxItem item={inboxItem}/>
        <InboxItem item={inboxItem}/>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 15,
    gap: 8
  }
})
