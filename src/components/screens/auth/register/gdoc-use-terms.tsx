
import { ScrollView, StyleSheet, View } from 'react-native'
import { GdocPageTitle } from '@/components/gdoc-page-title'
import { Text } from 'react-native-paper'

export function GdocUseTerms () {
  return (
    <View style={styles.termsWrapper}>
      <ScrollView contentContainerStyle={styles.termsContent} showsVerticalScrollIndicator={false}>
        <GdocPageTitle>Termos de uso</GdocPageTitle>
        <Text style={{fontSize: 12, padding: 2}}>
          A Global Tecnologia é uma Startup que desenvolve software para órgãos públicos com o objetivo de promover a
          transformação digital nos municípios, gerando economia, transparência e eficiência.
          A Global Tecnologia está comprometida em respeitar sua privacidade e seus dados pessoais, garantindo que
          todas as informações que você nos forneça será armazenada com segurança e processada de acordo com a
          legislação de proteção de dados e nossa política de privacidade.
          Este “Termo de Uso” rege seu uso do G-Doc e Procon Digital, sendo aplicada a todos os usuários cadastrados.
          Ao continuar utilizando as SOLUÇÕES da Global Tecnologia você confirma que leu, entendeu e concordou com os
          Termos de Uso e consente que utilizamos a sua informação conforme detalhado em nossa Política de Privacidade
          de Dados.
          Não cobramos pelo uso dos serviços disponíveis para Cidadãos e Fornecedores no G-Doc e Procon Digital, em
          vez disso, o ente público nos paga para oferecer os serviços de forma digital, usamos seus dados pessoais
          para ajudar a determinar quais serviços disponibilizar.
          Trabalhamos constantemente para aperfeiçoar nossos serviços e desenvolver novos recursos para tornar nossos
          Produtos melhores para você e para nossa comunidade. Como resultado, poderemos atualizar estes Termos
          periodicamente para que eles reflitam de forma precisa nossos serviços e práticas.
          Nossa missão é promover a Transformação Digital no Setor Público garantindo uma melhoria na qualidade dos
          serviços prestados à população, disponibilizando todos os serviços de forma online ao cidadão, eliminando
          filas na entidade e diminuindo o tempo dos processos de atendimento.
          Queremos que toda comunidade consuma nossos serviços e se sintam bem-vindas e seguras, com isso, se
          entendemos que você violou nossos Termos ou Políticas de forma manifesta, poderemos suspender ou desativar
          permanentemente o acesso a sua conta. Poderemos também suspender ou desativar sua conta se você violar
          recorrentemente os direitos de propriedade intelectual de outra pessoa ou quando formos obrigados por
          motivos legais.
          Os usuários concordam que a propriedade intelectual e os direitos autorais, bem como as informações do banco
          de dados é da Global Tecnologia e sua titularidade não é objeto do presente instrumento
          A Global Tecnologia não será responsável por quaisquer perdas de dados dos usuários, inclusive decorrentes
          de caso fortuito, força maior, ocorridas em virtude de invasões e quebra de segurança por parte de terceiros
          não autorizados.
          O período de retenção dos seus dados pessoais pela Global Tecnologia será o necessário para satisfazer as
          finalidades para as quais eles foram coletados ou até revogação do consentimento, se não houver obrigação
          legal de manter estes dados armazenados. Em se tratando de nossas soluções, será o mesmo da vigência do
          contrato público ou do termo de cooperação, com o objetivo de atender às obrigações contratuais, solicitação
          de autoridade competente, ou ainda por imposição legal ou judicial. Inexistindo impedimento legal, ao final
          do contrato ou termo de cooperação, suas informações serão apagadas e não estarão mais disponíveis para o
          tratamento.
          Você pode entrar em contato conosco pelo WhatsApp: +55 48 9 9137-8767.
        </Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  termsWrapper: {
    flex: 1,
    width: '100%',
    borderWidth: 2,
    borderColor: '#BBBBBB',
    borderRadius: 5,
    marginVertical: 10,
    overflow: 'hidden'
  },
  termsContent: {
    padding: 10
  }
})
