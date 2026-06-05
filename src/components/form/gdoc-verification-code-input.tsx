import { CodeField, Cursor } from 'react-native-confirmation-code-field'
import { Platform, StyleSheet, Text } from 'react-native'
import React from 'react'
import type { TextInputProps } from 'react-native-paper'
import type { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { theme } from '@/theme'

type Props = {
  field: ControllerRenderProps<FieldValues, string>
  codeLength: number
  numberOnly?: boolean
  onFinish: (data: any) => void | Promise<void>
}

const autoComplete = Platform.select<TextInputProps['autoComplete']>({
  android: 'sms-otp',
  default: 'one-time-code'
})

export function GdocVerificationCodeInput({field, codeLength, numberOnly, onFinish}: Props) {
  const verifyChange = (text: string) => {
    let currentValue = text
    if (numberOnly) {
      currentValue = text.replace(/[^0-9]/g, '')
    }

    field.onChange(currentValue)

    if (currentValue.length === codeLength) {
      onFinish({[field.name]: currentValue})
    }
  }

  return (
    <CodeField
      value={field.value}
      onChangeText={verifyChange}
      cellCount={codeLength}
      rootStyle={styles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      autoComplete={autoComplete}
      renderCell={({index, symbol, isFocused}) => (
        <Text
          key={index}
          style={[styles.cell, isFocused && styles.focusCell]}
        >
          {symbol || (isFocused && <Cursor />)}
        </Text>
      )}
    />
  )
}

const styles = StyleSheet.create({
  codeFieldRoot: {},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: `${theme.colors.primary  }60`,
    textAlign: 'center',
    borderRadius: 10
  },
  focusCell: {
    borderColor: theme.colors.primary
  }
})
