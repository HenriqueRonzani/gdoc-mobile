import { GdocText } from '@/components/gdoc-text';
import { GdocPageTitle } from '@/components/gdoc-page-title';
import { GdocStepper } from '@/components/gdoc-stepper';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { GdocRegisterInformation } from '@/components/gdoc-register-information';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { UseRegister } from '@/contexts/use-register';
import { NavigatorType } from '@/types/navigation';
import { useState } from 'react';
import MaskInput from 'react-native-mask-input/src/MaskInput';
import { Masks } from 'react-native-mask-input';
import { ScrollView } from 'react-native';
import {cpf as cpfValidator} from "cpf-cnpj-validator"
import { check, date } from 'zod/v4-mini';
import { fa } from 'zod/v4/locales';
import DropDownPicker from 'react-native-dropdown-picker';
import { GdocForm } from '@/components/gdoc-form/gdoc-form';
import { RegisterExternalFormData, RegisterFormExternalSchema } from '@/schemas/auth.schema';
import { GdocFormItem } from '@/components/gdoc-form/gdoc-form-item';
import { GdocTextInput } from '@/components/gdoc-form/gdoc-text-input';
import { GdocFormError } from '@/components/gdoc-form/gdoc-form-error';
import { GdocDropdown } from '@/components/gdoc-form/gdoc-dropdown';

export function RegisterIndividualScreen2() {
  const navigation = useNavigation<NavigatorType>();

  const initialForm = {name:'', cpf_cnpj:'', birthday:'', genre: '', email: '', telephone: ''}

  const options = [
    {label: 'Masculino', value: 'male'},
    {label: 'Feminino', value: 'female'},
    {label: 'Outro', value: 'other'},
  ]

  const [open, setOpen] = useState(false)
 

  //context
  const {setRegisterParams } = UseRegister();

  function Submit(data: RegisterExternalFormData) {
      setRegisterParams((prev)=> ({...prev, name: data.name, genre: data.genre, cpf_cnpj: data.cpf_cnpj, birthday: data.birthday, email: data.email, telephone: data.telephone, }))
      navigation.navigate("Register3")
    
  }

  const footer = (<Button onPress={() => navigation.navigate("Register1")} textColor="#7E7E7E"style={styles.button}> Voltar</Button>)

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <GdocPageTitle>Criação de conta Gdoc</GdocPageTitle>
        <GdocText>Preencha os seus dados abaixo</GdocText>
        <GdocStepper actualStepper={2} finalStepper={4} />
        <GdocRegisterInformation
          title="Dados pessoais"
          description="Complete os campos abaixo"
        />

          <GdocForm initial={initialForm} onSubmit={Submit} schema={RegisterFormExternalSchema} confirmLabel='Proxímo' footer={footer}>
            <GdocFormItem name={'name'}>
              {(field) => (
                <>
                  <GdocTextInput  field={field} label='Nome completo' placeholder='Nome completo'/>
                  <GdocFormError name={'name'}/>
                </>
              )}
            </GdocFormItem>
            <GdocFormItem name={'cpf_cnpj'}>
              {(field) => (
                <>
                  <GdocTextInput mask={Masks.BRL_CPF}  field={field} label='CPF' placeholder='CPF'/>
                  <GdocFormError name={'cpf_cnpj'}/>
                </>
              )}
            </GdocFormItem>
            <GdocFormItem name={'birthday'}>
              {(field) => (
                <>
                  <GdocTextInput mask={Masks.DATE_DDMMYYYY}  field={field} label='Data de nascimento' placeholder='Data de nascimento'/>
                  <GdocFormError name={'birthday'}/>
                </>
              )}
            </GdocFormItem>

            <GdocFormItem name={'genre'}>
              {(field) => (
                <>
                  <GdocDropdown placeholder='Gênero'  items={options} open={open} setOpen={setOpen} field={field}/>
                  <GdocFormError name={'genre'}/>
                </>
              )}
            </GdocFormItem>
            <GdocFormItem name={'email'}>
              {(field) => (
                <>
                  <GdocTextInput  field={field} label='Email' placeholder='Email'/>
                  <GdocFormError name={'email'}/>
                </>
              )}
            </GdocFormItem>
            <GdocFormItem name={'telephone'}>
              {(field) => (
                <>
                  <GdocTextInput mask={Masks.BRL_PHONE} field={field} label='Telefone' placeholder='Telefone'/>
                  <GdocFormError name={'telephone'}/>
                </>
              )}
            </GdocFormItem>

          </GdocForm>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
   container: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 15,
    paddingBottom: 30,
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    width: 350,
    marginBottom: 10
  }
});