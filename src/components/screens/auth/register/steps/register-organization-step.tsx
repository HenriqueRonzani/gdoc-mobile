import { GdocText } from '@/components/gdoc-text'
import { GdocPageTitle } from '@/components/gdoc-page-title'
import { StyleSheet, View } from 'react-native'
import { GdocMemo } from '@/components/gdoc-memo'
import { ScrollView } from 'react-native'
import { RegisterOrganizationFormData } from '@/schemas/auth.schema'
import { useRegister } from '@/providers/register-context-provider'
import { useStepper } from '@/providers/stepper-context-provider'
import { GdocStepperProgressBar } from '@/components/stepper/gdoc-stepper-progress-bar'
import { OrganizationForm } from '@/components/screens/auth/register/organization-form'
import { GdocGrayedButton } from '@/components/button/gdoc-grayed-button'

export function RegisterOrganizationStep() {
  const {setStepName} = useStepper()
  const {setRegisterParams} = useRegister()

  const onSubmit = (data: RegisterOrganizationFormData)  => {
    setRegisterParams((prev) => ({
      ...prev, ...data
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
        <OrganizationForm onSubmit={onSubmit} footer={footer}/>
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
