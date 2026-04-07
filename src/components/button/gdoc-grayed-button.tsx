import { Button, ButtonProps } from 'react-native-paper'
import { theme } from '@/theme'
import React from 'react'

type Props = ButtonProps & {
  children: React.ReactNode
}

export function GdocGrayedButton({children, ...rest}: Props) {
  return (
    <Button
      {...rest}
      buttonColor={theme.colors.gray}
      textColor={theme.colors.text}
      style={{borderRadius: 5}}>
      Voltar
    </Button>
  )
}
