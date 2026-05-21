import type { ImageProps } from 'react-native'
import { Image, StyleSheet } from 'react-native'
import { useOrganization } from '@/providers/organization-provider'

export function ClientLogo({...rest}: ImageProps) {
  const {organization} = useOrganization()
  return <Image
    {...rest}
    source={{uri: organization.logoLink}}
    style={[style.logo, rest.style]}
    resizeMode="contain"
  />
}

const style = StyleSheet.create({
  logo: {
    width: 120,
    height: 120,
    marginVertical: 10
  }
})
