import type { RecaptchaRef } from 'react-native-recaptcha-that-works'
import Recaptcha from 'react-native-recaptcha-that-works'
import React, { useRef, useState } from 'react'
import { GdocPrimaryButton } from '@/components/button/gdoc-primary-button'
import { View } from 'react-native'

type Props = {
  onSubmit: (token: string) => void | Promise<void>
  onCancel?: () => void
  loading?: boolean
}

export const GdocConfirmRecaptcha = ({onSubmit, onCancel, loading}: Props) => {
  const recaptchaRef = useRef<RecaptchaRef | null>(null)
  const [isVerifying, setIsVerifying] = useState<boolean>(false)

  const localOnCancel = () => {
    setIsVerifying(false)
    if (onCancel) {
      onCancel()
    }
  }

  const onVerify = async (token: string) => {
    try {
      await onSubmit(token)
    } finally {
      setIsVerifying(false)
    }
  }

  const openRecaptcha = () => {
    setIsVerifying(true)
    recaptchaRef.current?.open()
  }

  const buttonBusy = isVerifying || loading

  return (
    <View>
      <Recaptcha
        size={'normal'}
        ref={recaptchaRef}
        siteKey={process.env.EXPO_PUBLIC_RECAPTCHA_KEY}
        baseUrl={process.env.EXPO_PUBLIC_GDOC_BACKEND}
        onVerify={onVerify}
        onClose={localOnCancel}
        onError={localOnCancel}
      />

      <GdocPrimaryButton
        onPress={openRecaptcha}
        loading={buttonBusy}
        disabled={buttonBusy}
      >
        Confirmar
      </GdocPrimaryButton>
    </View>
  )
}
