import { GdocDataRenderer, RenderConfig } from "@/components/gdoc-data-renderer"
import { GENDER_ENUM } from "@/enum/gender.enum"
import { ProfileType } from "@/types/profile"
import { StyleSheet, View } from "react-native"


export function ProfileAreas({ profile }: { profile: ProfileType }) {

    const exampleData: RenderConfig = [
        {
            title: 'Nome',
            value: profile.person.name
        },
        {
            title: 'CPF',
            value: profile.person.cpfCnpj
        },
        {
            title: 'Data de Nascimento',
            value: profile.person.dateOfBirth
        },
        {
            title: 'Gênero',
            value: GENDER_ENUM[profile.person.gender]
        }
    ]

    const contatos: RenderConfig = [
        {
            title: 'E-mails',
            value: profile.person.email,
            customActions: [
                {
                    icon: 'plus',
                    onPress: () => console.log('Adicionar')
                },
                {
                    icon: 'pencil',
                    onPress: () => console.log('Editar')
                },
                {
                    icon: 'trash-can',
                    onPress: () => console.log('Excluir')
                }
            ]
        },
        {
            title: 'Telefone',
            value: profile.person.cellphone,
            customActions: [
                {
                    icon: 'plus',
                    onPress: () => console.log('Adicionar')
                },
                {
                    icon: 'pencil',
                    onPress: () => console.log('Editar')
                },
                {
                    icon: 'trash-can',
                    onPress: () => console.log('Excluir')
                }
            ]
        }
    ]

    const endereco: RenderConfig = [
        {
            title: 'CEP',
            value: profile.person.address?.zip
        },
        {
            title: 'Cidade',
            value: profile.person.address?.city
        },
        {
            title: 'UF',
            value: profile.person.address?.state
        },
        {
            title: 'Logradouro',
            value: profile.person.address?.street
        },
        {
            title: 'Número',
            value: profile.person.address?.number
        }
    ]
    return (
        <View style={style.contentContainer}>
            <GdocDataRenderer
                renderConfig={exampleData}
                headerTitle={'Dados Pessoais'}
                headerAction={{
                    title: 'Editar',
                    onPress: () => console.log('Editar Header')
                }}
            />

            <GdocDataRenderer
                renderConfig={contatos}
                headerTitle={'Contatos'}
            />

            <GdocDataRenderer
                renderConfig={endereco}
                headerTitle={'Endereço'}
                headerAction={{
                    title: 'Editar',
                    onPress: () => console.log('Editar Header')
                }}
            />
        </View>

    )
}
const style = StyleSheet.create({

    contentContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        gap: 15
    }

})