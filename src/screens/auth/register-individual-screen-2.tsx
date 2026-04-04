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

export function RegisterIndividualScreen2() {
  const navigation = useNavigation<NavigatorType>();
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [birthday, setBirthday] = useState("")

  //erros
  const [touched, setTouched] = useState(
    {
      'name': false,
      'cpf': false,
      'email': false,
      'phone': false,
      'birthday': false
    }
  )
  
  function emptyField(field: string) {
    return field.length === 0;
  }

  function checkNameErros() {
    if (emptyField(name)) return "Campo obrigatório"

    if (!name.trim().includes(" ")) return "O nome completo deve conter nome e sobrenome"
    return ""
  }

  function checkCpfErros() {
    if (emptyField(cpf)) return "Campo obrigatório"

    if (cpf.length < 14 || !cpfValidator.isValid(cpf)) return "Cpf inválido"
    return ""
  }

  function checkPhoneErros() {

    const cleanPhone = phone.replace(/\D/g, "");

    if (emptyField(phone)) return "Campo obrigatório"

    const ddd = cleanPhone.substring(0,2);
    const number = cleanPhone.substring(2);

    let validPhone = true
    
    if (ddd.startsWith('0')) validPhone = false
    if (cleanPhone.length < 10 || cleanPhone.length > 11) validPhone = false
    if (!number.startsWith('9') && cleanPhone.length === 11) validPhone = false

    if (!validPhone) return "Formato de telefone inválido"

    return ""
  }

  function checkEmailErros() {
    if (emptyField(email)) return "Campo obrigatório"

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) return "Email inválido"

    return ""
  }

  function checkBirthdayErros() {
    if (emptyField(birthday)) return "Campo obrigatório"

    const [day, month, year] = birthday.split("/").map(Number);

    if (!day || !month || !year) return "Data incompleta";

    const dateObj = new Date(year, month - 1, day);

    if (!(dateObj.getFullYear() === year && dateObj.getMonth() === month - 1 &&dateObj.getDate() === day) || year < 1900) return "Data inválida"

    return ""
  }

  function handleBlur(field: string) {
    setTouched(prev => ({...prev, [field]: true}))
  }

  //context
  const { registerParams, setRegisterParams } = UseRegister();

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

        <View style={styles.formSection}>
          <TextInput
            value={name}
            onChangeText={setName}
            label="Nome Completo"
            mode="flat"
            style={styles.input}
            underlineColor="#7E7E7E"
            error={!!checkNameErros() && touched.name}
            onBlur={() => handleBlur("name")}
          />

          <HelperText type='error' visible={!!checkNameErros() && touched.name}>
            {checkNameErros()}
          </HelperText>

          <TextInput
            value={cpf}
            label="CPF"
            mode="flat"
            style={styles.input}
            underlineColor="#7E7E7E"
            onBlur={() => handleBlur("cpf")}
            error={!!checkCpfErros() && touched.cpf}
            render={(props) => (
              <MaskInput
                {...props}
                value={cpf}
                onChangeText={(masked) => setCpf(masked)}
                mask={Masks.BRL_CPF}
              />
            )}
          />

          <HelperText type='error' visible={!!checkCpfErros() && touched.cpf}>
            {checkCpfErros()}
          </HelperText>

           <TextInput
            value={email}
            onChangeText={setEmail}
            label="Email"
            mode="flat"
            style={styles.input}
            underlineColor="#7E7E7E"
            error={!!checkEmailErros() && touched.email}
            onBlur={() => handleBlur("email")}
          />

          <HelperText type='error' visible={!!checkEmailErros() && touched.email}>
            {checkEmailErros()}
          </HelperText>

          <TextInput
            value={phone}
            label="Telefone"
            mode="flat"
            style={styles.input}
            underlineColor="#7E7E7E"
            onBlur={() => handleBlur("phone")}
            error={!!checkPhoneErros() && touched.phone}
            render={(props) => (
              <MaskInput
                {...props}
                value={phone}
                onChangeText={(masked) => setPhone(masked)}
                mask={Masks.BRL_PHONE}
              />
            )}
          />

          <HelperText type='error' visible={!!checkPhoneErros() && touched.phone}>
            {checkPhoneErros()}
          </HelperText>

          <TextInput
            value={birthday}
            label="Data de nascimento"
            mode="flat"
            style={styles.input}
            underlineColor="#7E7E7E"
            onBlur={() => handleBlur("birthday")}
            error={!!checkBirthdayErros() && touched.birthday}
            render={(props) => (
              <MaskInput
                {...props}
                value={birthday}
                onChangeText={(masked) => setBirthday(masked)}
                mask={Masks.DATE_DDMMYYYY}
              />
            )}
          />

          <HelperText type='error' visible={!!checkBirthdayErros() && touched.birthday}>
            {checkBirthdayErros()}
          </HelperText>

        </View>

        <Button
          onPress={() => navigation.navigate("Register1")}
          textColor="#7E7E7E"
          style={styles.button}
        >
          Voltar
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 15,
    alignItems: 'center',
    paddingBottom: 40, // 👈 evita botão ficar colado no teclado
  },
  formSection: {
    marginBottom: 33,
  },
  input: {
    width: 300,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    width: 350,
  },
});