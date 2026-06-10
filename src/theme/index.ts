import { MD3LightTheme } from 'react-native-paper'
import { DefaultTheme as NavTheme } from '@react-navigation/native'

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    'primary': '#023452',
    'secondary': '#00CE84',
    'gray': '#F0F0F0',
    'error': '#B00020',
    'background': '#FFFFFF',
    'onPrimary': '#FFFFFF',
    'onSecondary': '#FFFFFF',

    'text': '#7C7C7C',
    'primaryText': '#565656',
    'component-on': '#F0F0F0',
    'component-off': '#D3D3D3'
  }
}

export const navTheme = {
  ...NavTheme,
  colors: {
    ...NavTheme.colors,
    primary: theme.colors.primary,
    background: theme.colors.background,
    text: theme.colors.onSurface
  }
}
