import { IconButton, Text } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import { theme } from '@/theme'

type CustomAction = {
  icon: string
  onPress: () => void
}

type FieldConfig = {
  title: string
  value?: string | null
  customActions?: CustomAction[]
}

export type RenderConfig = FieldConfig[]

type prop = {
  renderConfig: RenderConfig
  headerTitle: string
  headerAction?: {
    title?: string
    onPress?: () => void
  }
}

const CustomActions = ({actionsConfig}: { actionsConfig: CustomAction[] }) => {
  return (
    <View style={style.iconsContainer}>
      {actionsConfig.map((config, index) => (
        <IconButton key={index} icon={config.icon} size={15} style={style.actionIcon} iconColor={theme.colors.primaryText} onPress={config.onPress}/>
      ))}
    </View>
  )
}

export function GdocDataRenderer({renderConfig, headerTitle, headerAction}: prop) {
  return (
    <View style={style.rendererContainer}>
      <View style={style.headerContainer}>
        <Text style={style.headerTitleText}>{headerTitle}</Text>
        {headerAction && <Text style={style.headerActionText} onPress={headerAction.onPress}>{headerAction.title}</Text>}
      </View>
      <View style={style.fieldsContainer}>
        {renderConfig.map((config, index) => (
          <View key={index}>
            <Text style={style.titleText}>{config.title}</Text>
            <View style={style.valueContainer}>
              <Text style={style.valueText}>{config.value}</Text>
              {config.customActions && <CustomActions actionsConfig={config.customActions}/>}
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  actionIcon: {
    width: 15,
    height: 15
  },
  iconsContainer: {
    flexDirection: 'row'
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 14,
    color: theme.colors.text,
    fontWeight: 'bold'
  },
  valueText: {
    fontSize: 12,
    color: theme.colors.text
  },
  fieldsContainer: {
    gap: 10
  },
  rendererContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.text + 80,
    padding: 10,
    gap: 10
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerTitleText: {
    fontSize: 16,
    color: theme.colors.primaryText,
    fontWeight: 'bold'
  },
  headerActionText: {
    fontSize: 14,
    color: theme.colors.primary
  }
})
