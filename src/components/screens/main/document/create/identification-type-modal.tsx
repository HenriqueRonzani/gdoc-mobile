import { ActivityIndicator, Text } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import { theme } from '@/theme'
import { GdocModal } from '@/components/gdoc-modal'
import { Icon } from 'react-native-paper/src'
import { OptionCard } from '@/components/gdoc-option-card'
import { IdentificationType } from '@/types/service'

type Props = {
  open: boolean
  onChoose: (type: IdentificationType) => void
  onClose: () => void
  loading: boolean
}

export function IdentificationTypeModal({open, onChoose, onClose, loading}: Props) {
  return (
    <GdocModal headerTitle={'Forma de identificação'} open={open} onClose={onClose}>
      {loading
        ? <ActivityIndicator animating={true}/>
        : (
          <View style={style.container}>
            <View style={style.infoContainer}>
              <Icon size={20} source={'information'} color={theme.colors.primary}/>

              <Text style={style.infoText}>
                <Text style={style.infoTextHeader}>Sobre a identificação {'\n'}</Text>
                O processo de identificação possibilita que o usuário escolha se deseja ou não se identificar como
                solicitante.
              </Text>
            </View>


            <View style={style.identificationTypeContainer}>
              <Text style={style.questionText}>Como você gostaria de prosseguir?</Text>
              <OptionCard
                icon={'account'}
                optionName={'Identificado'}
                description={'Todos com acesso à solicitação conseguirão visualizar quem é o solicitante.'}
                onPress={() => onChoose('NOT_CONFIDENTIAL')}
              />

              <OptionCard
                icon={'incognito'}
                optionName={'Anônimo'}
                description={'Nenhum usuário conseguirá visualizar quem é o solicitante.'}
                onPress={() => onChoose('ANONYMOUS')}
              />
            </View>
          </View>
        )
      }
    </GdocModal>
  )
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 4
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
    width: '80%'
  },
  infoText: {
    fontSize: 12,
    color: theme.colors.primaryText
  },
  infoTextHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.primary
  },
  questionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.primaryText,
    textAlign: 'center'
  },
  identificationTypeContainer: {
    padding: 20,
    gap: 4
  }
})
