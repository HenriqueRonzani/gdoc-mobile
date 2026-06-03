import React, { useState } from 'react'
import { GdocGrayedButton } from '@/components/button/gdoc-grayed-button'
import { useStepper } from '@/providers/stepper-context-provider'
import { VerifyRecoveryCodeForm } from '../forms/verify-recovery-code-form'
import { VerifyRecoveryCodeFormData } from '@/schemas/auth/recover.schema'
import { verifyRecoveryCode } from '@/services/api/auth.service'
import { useRecover } from '@/providers/recover-context-provider'
import { useSnackbar } from '@/providers/snackbar-provider'
import { handleRequestError } from '@/services/request-error.helper'

export function VerifyRecoveryCodeStep() {
  const {setStepName} = useStepper()
  const {recoverParams, setRecoverParams} = useRecover()
  const [loading, setLoading] = useState<boolean>(false)
  const {toastError} = useSnackbar()

  const onSubmit = async (data: VerifyRecoveryCodeFormData) => {
    try {
      setLoading(true)
      const response = await verifyRecoveryCode({
        verification_token: recoverParams.verification_token,
        verification_code: data.verification_code
      })

      if (!response.is_valid) {
        toastError('Código invalido')
        return
      }

      setRecoverParams({
        ...recoverParams,
        verification_code: data.verification_code
      })
      setStepName('finish_reset_password')
    } catch (error: unknown) {
      handleRequestError(error, toastError, 'Houve um erro')
    } finally {
      setLoading(false)
    }
  }
  return (
    <VerifyRecoveryCodeForm
      onSubmit={onSubmit}
      loading={loading}
      footer={(
        <GdocGrayedButton onPress={() => setStepName('request_recovery_code')}>
          Voltar
        </GdocGrayedButton>
      )}
    />
  )
}
