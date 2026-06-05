import React from 'react'
import { GdocForm } from '@/components/form/gdoc-form'
import { GdocFormItem } from '@/components/form/gdoc-form-item'
import { GdocTextInput } from '@/components/form/gdoc-text-input'
import { GdocFormError } from '@/components/form/gdoc-form-error'
import type { FinishResetPasswordFormData} from '@/schemas/auth/recover.schema'
import { FinishResetPasswordFormSchema } from '@/schemas/auth/recover.schema'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { theme } from '@/theme'

const initialForm = {password: '', confirm_password: ''}

type Props = {
  onSubmit: (data: FinishResetPasswordFormData) => void
  footer: React.ReactNode
  loading: boolean
}

export function FinishResetPasswordForm({onSubmit, footer, loading}: Props) {
  return (
    <GdocForm
      initial={initialForm}
      schema={FinishResetPasswordFormSchema}
      onSubmit={onSubmit}
      footer={footer}
      confirmLabel={'Próximo'}
      isLoading={loading}
    >
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Digite sua nova senha</Text>

          <GdocFormItem name={'password'}>
            {field => (
              <>
                <GdocTextInput field={field} label={'Senha'} placeholder={'Senha'} secureTextEntry={true}/>
                <GdocFormError name={'password'}/>
              </>
            )}
          </GdocFormItem>
          <GdocFormItem name={'confirm_password'}>
            {field => (
              <>
                <GdocTextInput field={field} label={'Confirme a senha'} placeholder={'Confirme a senha'}
                  secureTextEntry={true}/>
                <GdocFormError name={'confirm_password'}/>
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
