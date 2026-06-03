import { StyleSheet, View } from 'react-native'
import React from 'react'
import { GdocForm } from '@/components/form/gdoc-form'
import { GdocFormItem } from '@/components/form/gdoc-form-item'
import { GdocFormError } from '@/components/form/gdoc-form-error'
import { GdocVerificationCodeInput } from '@/components/form/gdoc-verification-code-input'
import { VerifyRecoveryCodeFormData, VerifyRecoveryCodeFormSchema } from '@/schemas/auth/recover.schema'
import { theme } from '@/theme'
import { Text } from 'react-native-paper'

const initialForm = {verification_code: ''}

type Props = {
  onSubmit: (data: VerifyRecoveryCodeFormData) => void
  footer: React.ReactNode
  loading: boolean
}

export const VerifyRecoveryCodeForm = ({onSubmit, footer, loading}: Props) => {
  return (
    <GdocForm
      initial={initialForm}
      schema={VerifyRecoveryCodeFormSchema}
      onSubmit={onSubmit}
      confirmLabel={'Verificar Código'}
      footer={footer}
      isLoading={loading}
    >
      <View style={{width: '100%', alignSelf: 'center'}}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Enviamos um código para henri************@gmail.com</Text>
            <GdocFormItem name={'verification_code'}>
              {field => (
                <>
                  <GdocVerificationCodeInput field={field} codeLength={6} onFinish={onSubmit} numberOnly={true}/>
                  <GdocFormError name={'verification_code'}/>
                </>
              )}
            </GdocFormItem>
          </View>
        </View>
      </View>
    </GdocForm>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
