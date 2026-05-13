import {  Portal, Modal } from "react-native-paper";
import { StyleSheet } from 'react-native'
import { FormProfileEdit } from "./gdoc-form-profile-edit";

export function ProfileEditModal({ active, onClose }: { active: boolean, onClose: () => void }){
    return(
        <Portal>
            <Modal visible = {active} onDismiss={onClose} contentContainerStyle={style.contentContainer}>
                <FormProfileEdit onClose={onClose}
                        onSubmit={(data) => {
                            console.log(data);
                            onClose(); // Fecha após o submit com sucesso
                        }}
                  />
                
            </Modal>
        </Portal>
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
    contentContainer: {
      flex: 1,
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 10
    },
    text: {
      fontSize: 14,
      alignSelf: 'flex-start',
      color: '#7C7C7C',
      justifyContent: 'center',
      textAlign: 'center'
    }
  })