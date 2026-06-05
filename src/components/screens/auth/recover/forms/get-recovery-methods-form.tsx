import { GdocForm } from '@/components/form/gdoc-form'
import { GdocFormItem } from '@/components/form/gdoc-form-item'
import { GdocTextInput } from '@/components/form/gdoc-text-input'
import { GdocFormError } from '@/components/form/gdoc-form-error'
import React from 'react'
import { Masks } from 'react-native-mask-input'
import type { GetRecoveryMethodsFormData} from '@/schemas/auth/recover.schema'
import { GetRecoveryMethodsFormSchema } from '@/schemas/auth/recover.schema'
import { useRecover } from '@/providers/recover-context-provider'
import { StyleSheet, View } from 'react-native'
import { theme } from '@/theme'
import { Text } from 'react-native-paper'

const initialForm = {cpfCnpj: ''}

type Props = {
  onSubmit: (data: GetRecoveryMethodsFormData) => void
  footer: React.ReactNode
  loading: boolean
}

export function GetRecoveryMethodsForm ({onSubmit, footer, loading}: Props) {
  const {recoverParams} = useRecover()
  return (
    <GdocForm
      initial={{...initialForm, ...recoverParams}}
      schema={GetRecoveryMethodsFormSchema}
      onSubmit={onSubmit}
      footer={footer}
      isLoading={loading}
      confirmLabel={'Próximo'}
    >
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Digite seu CPF ou CNPJ</Text>

          <GdocFormItem name={'cpfCnpj'}>
            {field => (
              <>
                <GdocTextInput field={field} label="CPF/CNPJ" placeholder="CPF/CNPJ" mask={Masks.BRL_CPF_CNPJ}/>
                <GdocFormError name={'cpfCnpj'}/>
              </>
            )}
          </GdocFormItem>
        </View>
      </View>

    </GdocForm>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  title: {
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: theme.colors.text,
    borderRadius: 4
  }
})
