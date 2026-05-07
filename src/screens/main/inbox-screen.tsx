import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { InboxItem } from '@/components/screens/main/inbox/inbox-item'
import { useEffect, useState } from 'react'
import api from '@/lib/axios'
import { useAuth } from '@/providers/auth-provider'
import React from 'react'
import { GdocTextInput } from '@/components/form/gdoc-text-input'

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

  const auth = useAuth();
  const [tab, setTab] = useState("opened_by_me")
  const [data, setData] = useState([]);
  const [text, setText] = useState("");

  useEffect(()=> {
    const fetch = async () => {
       try {
      const response = await api.get("inbox/query/external", {
        params: {
          tab: tab,
          search: text
        }
      });
      setData(response.data.data);
    } catch (err) {
      console.error("erro:", err);
    }
    }
    fetch();
  },[])

   useEffect(()=> {
    const fetch = async () => {
       try {
      const response = await api.get("inbox/query/external", {
        params: {
          tab: tab,
          search: text
        }
      });
      setData(response.data.data);
    } catch (err) {
      console.error("erro:", err);
    }
    }
    fetch();
  },[text])
  

  return (
    <View style={style.container}>
      <Text  style={style.title}>Minhas solicitações</Text>
      <View style={style.filter}>
        <Button textColor={tab === "opened_by_me" ? "#1F1B79" : "#0000"} mode='text' onPress={async () => {
          const response = await api.get("inbox/query/external", {
          params: {
            tab: "opened_by_me"
          }});
          setData(response.data.data);
          setTab("opened_by_me");
        }}>Abertos por mim</Button>

        <Button textColor={tab === "opened_by_others" ? "#1F1B79" : "#0000"} mode='text' onPress={async ()=>{
          const response = await api.get("inbox/query/external", {
          params: {
            tab: "opened_by_others",
            search: text
          }});
          setData(response.data.data);
          setTab("opened_by_others");
        }}>Aberto por outros</Button>

        <Button mode='text' textColor={tab === "archived" ? "#1F1B79" : "#0000"} onPress={async () =>{
          const response = await api.get("inbox/query/external", {
          params: {
            tab: "archived",
            search: text
          }});
          setData(response.data.data);
          setTab("archived");
        }}>Concluidos</Button>

      </View>
      <View>
                 <TextInput
         style={style.textInput}
      label="Filtro"
      mode='flat'
      value={text}
      onChangeText={text => setText(text)}
    />
    { data.map((item, index) => (
      <InboxItem key={index} item={item} />
     ))}
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
  },
  textInput: {
    margin: 30
  },
  filter: {
    width: 336,
    height: 111,
    color:"#F5F5F5",
    borderColor:"#000000",
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 36
  },
  title: {
    fontSize: 36,
    alignSelf: 'center',
    marginTop: 32
  }
})
