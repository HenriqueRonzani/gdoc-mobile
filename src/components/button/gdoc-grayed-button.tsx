import type { ButtonProps } from 'react-native-paper'
import { Button } from 'react-native-paper'
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
      {children}
    </Button>
  )
}
