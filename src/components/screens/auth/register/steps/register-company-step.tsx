import { GdocText } from '@/components/gdoc-text'
import { GdocPageTitle } from '@/components/gdoc-page-title'
import { StyleSheet, View } from 'react-native'
import { GdocMemo } from '@/components/gdoc-memo'
import { ScrollView } from 'react-native'
import { RegisterCompanyFormData } from '@/schemas/auth.schema'
import { useRegister } from '@/providers/register-context-provider'
import { useStepper } from '@/providers/stepper-context-provider'
import { GdocStepperProgressBar } from '@/components/stepper/gdoc-stepper-progress-bar'
import { CompanyForm } from '@/components/screens/auth/register/company-form'
import { GdocGrayedButton } from '@/components/button/gdoc-grayed-button'

export function RegisterCompanyStep() {
  const {setStepName} = useStepper()
  const {setRegisterParams} = useRegister()

  const onSubmit = (data: RegisterCompanyFormData)  => {
    setRegisterParams((prev) => ({
      ...prev,
      name: data.name,
      cpf_cnpj: data.cpf_cnpj,
      email: data.email,
      telephone: data.telephone,
      secondary_cpf: data.secondary_cpf,
      secondary_name: data.secondary_name
    }))
    setStepName('address')
  }

  const footer = (
    <GdocGrayedButton onPress={() => setStepName('user_type')}>
      Voltar
    </GdocGrayedButton>
  )

  return (
    <View style={styles.container}>
      <View>
        <GdocPageTitle>Criação de conta Gdoc</GdocPageTitle>
        <GdocText>Preencha os seus dados abaixo</GdocText>
        <GdocStepperProgressBar/>
        <GdocMemo
          title="Dados pessoais"
          description="Complete os campos abaixo"
        />
      </View>

      <ScrollView keyboardShouldPersistTaps="handled">
        <CompanyForm onSubmit={onSubmit} footer={footer}/>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 15,
    gap: 8
  }
})
