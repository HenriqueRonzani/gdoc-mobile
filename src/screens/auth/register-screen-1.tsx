import { GdocText } from '@/components/gdoc-text';
import { GdocPageTitle } from '@/components/gdoc-page-title';
import { GdocStepper } from '@/components/gdoc-stepper';
import { StyleSheet, View } from 'react-native'
import { GdocRegisterInformation } from '@/components/gdoc-register-information';
import { OptionCard } from '@/components/gdoc-option-card';
import individual from "@/assets/individual-icon.png"
import legal from "@/assets/legal-entity-icon.png"
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { UseRegister } from '@/contexts/use-register';
import { NavigatorType } from '@/types/navigation';


export function RegisterScreen1() {
  const navigation = useNavigation<NavigatorType>()

  const {setRegisterParams} = UseRegister();

  function ChooseType(type: string) {
    console.log("ola")
    setRegisterParams((prev) => ({
      ...prev,
      type: type
    }));

    navigation.navigate("RegisterIndividual2")
  }

  return (
    <View style={styles.container}>
        <GdocPageTitle>Criação de conta Gdoc</GdocPageTitle>
        <GdocText>Escolha o tipo da sua conta</GdocText>

        <GdocStepper 
          actualStepper={1} 
          finalStepper={4}
        />

        <GdocRegisterInformation 
          title='Tipo de conta' 
          description='Complete os campos abaixo'
        />

        <View style={styles.optionCardSection}>
          <OptionCard 
            onPress={()=>ChooseType("Individual")} 
            optionName='Pessoa Física' 
            imageSource={individual}
          />
          <OptionCard 
            onPress={()=>ChooseType("Legal")} 
            optionName='Pessoa Jurídica' 
            imageSource={legal}
          />
        </View>

        <Button 
          onPress={()=> navigation.navigate("Login")} 
          textColor='#7E7E7E' 
          style={styles.button}>
            Voltar
        </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 15,
    alignItems: 'center'
  },
  optionCardSection: {
    gap: 19,
    marginBottom: 33
  },
  button: {
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    width: 350,
    fontSize: 20
  }
});