import { MD3LightTheme, MD3Theme } from 'react-native-paper'
import { DefaultTheme as NavTheme } from '@react-navigation/native'

export const theme = {
  ...MD3LightTheme,
  colors: {
    primary: '#023452',
    secondary: '#00CE84',
    background: '#FFFFFF',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    "component-on": "#F0F0F0",
    "component-off": "#D3D3D3"
  }
}

export const navTheme = {
  ...NavTheme,
  colors: {
    ...NavTheme.colors,
    primary: theme.colors.primary,
    background: theme.colors.background
  }
}