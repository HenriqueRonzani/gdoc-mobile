import { GdocText } from '@/components/gdoc-text';
import { GdocPageTitle } from '@/components/gdoc-page-title';
import { GdocStepper } from '@/components/gdoc-stepper';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { GdocRegisterInformation } from '@/components/gdoc-register-information';
import { Button} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NavigatorType } from '@/types/navigation';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { GdocForm } from '@/components/gdoc-form/gdoc-form';
import { RegisterForm3Data, RegisterForm3Schema } from '@/schemas/auth.schema';
import { GdocFormItem } from '@/components/gdoc-form/gdoc-form-item';
import { GdocTextInput } from '@/components/gdoc-form/gdoc-text-input';
import { GdocFormError } from '@/components/gdoc-form/gdoc-form-error';
import api from "@/lib/axios"
import { ItemType } from 'react-native-dropdown-picker';
import { GdocDropdown } from '@/components/gdoc-form/gdoc-dropdown';
import { useFormContext } from 'react-hook-form';
import { UseRegister } from '@/contexts/use-register';
import { Address } from '@/types/register';


export function RegisterScreen3() {
  const navigation = useNavigation<NavigatorType>();

  const initialForm = {city: '', complement: '',confirm_password: '', neighborhood: '', number: '', password: '', state: '', street: '', zip: ''}

  const [states, setStates] = useState<ItemType<string>[]>([])
  const [openState, setOpenState] = useState(false)
  const [citys, setCitys] = useState<ItemType<string>[]>([])
  const [openCity, setOpenCity] = useState(false)

  const {registerParams,setRegisterParams} = UseRegister();

  useEffect(()=>{
    const fetchState = async () => {
        const request = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/"
        const response = await api.get(request)
        const listStates = response.data
        listStates.sort((a: any, b: any) => a.nome.localeCompare(b.nome));
        const getStates: ItemType<string>[] = []
        listStates.forEach((state: any) => {
            getStates.push({label: state.nome, value: state.sigla})
        })
        setStates(getStates)
    }

    fetchState()
  },[])

  function Submit(data: RegisterForm3Data) {
      const address: Address = {
        zip: data.zip,
        city: data.city,
        complement: data.complement,
        neighborhood: data.neighborhood,
        number: data.number,
        state: data.state,
        street: data.street
      }
      setRegisterParams((prev)=>({...prev, password: data.password, address: address}))    
      navigation.navigate("Register4")
    
  }

  const GoBackRegister2 = () => {
    if (registerParams.type === "External") {
        navigation.navigate("RegisterIndividual2")
    } else {
      navigation.navigate("RegisterCompany2")
    }
  }


  const footer = (<Button onPress={GoBackRegister2} textColor="#7E7E7E"style={styles.button}> Voltar</Button>)

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
        <GdocStepper actualStepper={3} finalStepper={4} />
        <GdocRegisterInformation
          title="Endereço e senha"
          description="Complete os campos abaixo"
        />

          <GdocForm initial={initialForm} onSubmit={Submit} schema={RegisterForm3Schema} confirmLabel='Proxímo' footer={footer}>
            <GdocFormItem name={'zip'}>
              {(field) => {
                const {setValue} = useFormContext();
                useEffect(()=>{
                    const searchZip = async () => {
                        if (field.value.length == 8) {
                            const request = 'https://viacep.com.br/ws/'+field.value+'/json'
                            const response = await api.get(request);
                            const zip = response.data
                            setValue("street", zip.logradouro)
                            setValue("neighborhood",zip.bairro)
                            setValue("state", zip.uf)
                            setValue("city", zip.localidade)
                        } 
                    }
                    searchZip()
                }, [field.value])

                 return (
                    <>
                        <GdocTextInput  field={field} label='CEP' placeholder='CEP'/>
                        <GdocFormError name={'zip'}/>
                    </>
                )
              }}
            </GdocFormItem>
            <GdocFormItem name={'state'}>
                          {(field) => {

                            useEffect(()=> {
                                const fetchCitys = async ()=>{
                                    const request = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/"+field.value+"/municipios"
                                    const response = await api.get(request);
                                    const listCitys = response.data;
                                    listCitys.sort((a: any, b: any) => a.nome.localeCompare(b.nome));
                                    const getCitys: ItemType<string>[] = []
                                    listCitys.forEach((city:any)=>{
                                        getCitys.push({label: city.nome, value: city.nome})
                                    })
                                    setCitys(getCitys)
                                }

                                fetchCitys()
                            },[field.value])
                            return  (
                            <>
                              <GdocDropdown placeholder='Estado'  items={states} setItems={setStates}  open={openState} setOpen={setOpenState} field={field}/>
                              <GdocFormError name={'state'}/>
                            </>
                          )
                          }}
            </GdocFormItem>

            <GdocFormItem name={'city'}>
              {(field) => (
                <>
                  <GdocDropdown placeholder='Cidades'  items={citys} setItems={setCitys} open={openCity} setOpen={setOpenCity} field={field}/>
                  <GdocFormError name={'city'}/>
                </>
              )}
            </GdocFormItem>

            <GdocFormItem name={'street'}>
              {(field) => (
                <>
                  <GdocTextInput  field={field} label='Rua' placeholder='Rua'/>
                  <GdocFormError name={'street'}/>
                </>
              )}
            </GdocFormItem>

            <GdocFormItem name={'number'}>
              {(field) => (
                <>
                  <GdocTextInput  field={field} label='Número' placeholder='Número'/>
                  <GdocFormError name={'number'}/>
                </>
              )}
            </GdocFormItem>

            <GdocFormItem name={'complement'}>
              {(field) => (
                <>
                  <GdocTextInput  field={field} label='Complemento' placeholder='Complemento'/>
                  <GdocFormError name={'complement'}/>
                </>
              )}
            </GdocFormItem>

            <GdocFormItem name={'password'}>
                    {(field) => (
                      <>
                        <GdocTextInput field={field} label={'Senha'} placeholder={'Senha'} secureTextEntry={true}/>
                        <GdocFormError name={'password'}/>
                      </>
                    )}
            </GdocFormItem>

            <GdocFormItem name={'confirm_password'}>
                    {(field) => (
                      <>
                        <GdocTextInput field={field} label={'Confirme a senha'} placeholder={'Confirme a senha'} secureTextEntry={true}/>
                        <GdocFormError name={'confirm_password'}/>
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