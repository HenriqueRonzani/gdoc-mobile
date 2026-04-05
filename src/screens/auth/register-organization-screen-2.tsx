import { GdocText } from '@/components/gdoc-text';
import { GdocPageTitle } from '@/components/gdoc-page-title';
import { GdocStepper } from '@/components/gdoc-stepper';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { GdocRegisterInformation } from '@/components/gdoc-register-information';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { UseRegister } from '@/contexts/use-register';
import { NavigatorType } from '@/types/navigation';
import { Masks } from 'react-native-mask-input';
import { ScrollView } from 'react-native';
import { GdocForm } from '@/components/gdoc-form/gdoc-form';
import {  RegisterFormOrganizationSchema, RegisterOrganizationFormData } from '@/schemas/auth.schema';
import { GdocFormItem } from '@/components/gdoc-form/gdoc-form-item';
import { GdocTextInput } from '@/components/gdoc-form/gdoc-text-input';
import { GdocFormError } from '@/components/gdoc-form/gdoc-form-error';

export function RegisterOrganizationScreen2() {
  const navigation = useNavigation<NavigatorType>();

  const initialForm = {name:'', cpf_cnpj:'', email: '', telephone: '', secondary_name: '', secondary_cpf: ''}

  //context
  const {setRegisterParams } = UseRegister();

  function Submit(data: RegisterOrganizationFormData) {
      setRegisterParams((prev)=> ({...prev, name: data.name,  cpf_cnpj: data.cpf_cnpj, email: data.email, telephone: data.telephone, secondary_cpf: data.secondary_cpf, secondary_name: data.secondary_name}))
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

          <GdocForm initial={initialForm} onSubmit={Submit} schema={RegisterFormOrganizationSchema} confirmLabel='Proxímo' footer={footer}>
            <GdocFormItem name={'name'}>
              {(field) => (
                <>
                  <GdocTextInput  field={field} label='Nome da organização' placeholder='Nome da organização'/>
                  <GdocFormError name={'name'}/>
                </>
              )}
            </GdocFormItem>
            <GdocFormItem name={'cpf_cnpj'}>
              {(field) => (
                <>
                  <GdocTextInput mask={Masks.BRL_CNPJ}  field={field} label='CNPJ' placeholder='CNPJ'/>
                  <GdocFormError name={'cpf_cnpj'}/>
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

            <GdocFormItem name={'secondary_name'}>
              {(field) => (
                <>
                  <GdocTextInput  field={field} label='Nome completo' placeholder='Nome completo'/>
                  <GdocFormError name={'secondary_name'}/>
                </>
              )}
            </GdocFormItem>

            <GdocFormItem name={'secondary_cpf'}>
              {(field) => (
                <>
                  <GdocTextInput mask={Masks.BRL_CPF}  field={field} label='Cpf do responsavel' placeholder='Cpf do responsavel'/>
                  <GdocFormError name={'secondary_cpf'}/>
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