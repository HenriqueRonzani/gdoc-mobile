import { useNavigation } from '@react-navigation/native'
import type { NavigatorType } from '@/types/navigation'
import React, { useState } from 'react'
import { FinishResetPasswordForm } from '../forms/finish-reset-password-form'
import { GdocGrayedButton } from '@/components/button/gdoc-grayed-button'
import type { FinishResetPasswordFormData } from '@/schemas/auth/recover.schema'
import { finishResetPassword } from '@/services/api/auth.service'
import { useRecover } from '@/providers/recover-context-provider'
import { useSnackbar } from '@/providers/snackbar-provider'
import { handleRequestError } from '@/services/request-error.helper'

export function FinishResetPasswordStep() {
  const navigation = useNavigation<NavigatorType>()
  const {recoverParams, clearRecoverParams} = useRecover()
  const {toast, toastError} = useSnackbar()
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (data: FinishResetPasswordFormData) => {
    try {
      setLoading(true)
      const response = await finishResetPassword({
        password: data.password,
        verification_code: recoverParams.verification_code,
        verification_token: recoverParams.verification_token
      })
      toast(response.message)

      clearRecoverParams()
      navigation.navigate('Login')
    } catch (error: any) {
      handleRequestError(error, toastError, 'Houve um erro no registro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <FinishResetPasswordForm onSubmit={onSubmit} loading={loading} footer={(
      <GdocGrayedButton onPress={() => navigation.navigate('Login')}>
        Voltar
      </GdocGrayedButton>
    )}
    />
  )
}
