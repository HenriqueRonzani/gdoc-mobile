import { GdocForm } from "@/components/form/gdoc-form";
import { GdocFormItem } from "@/components/form/gdoc-form-item";
import { GdocTextInput } from "@/components/form/gdoc-text-input";
import { GdocFormError } from '@/components/form/gdoc-form-error'
import { ProfileEditSchema } from "@/schemas/profile-edit.schema";
import { ProfileEditSchemaType } from "@/schemas/profile-edit.schema";
import React from 'react'
import { Masks } from 'react-native-mask-input'
import { GdocPrimaryButton } from "@/components/button/gdoc-primary-button";

const initialForm = {name:'', cpfCnpj: '', dateOfBirth: '', gender:'' }

type Props = {
  onSubmit: (data: ProfileEditSchemaType) => void
  onClose: () => void; 
}
export function FormProfileEdit({ onSubmit, onClose}: Props){

    return(
        <GdocForm
        initial={initialForm}
        schema={ProfileEditSchema}
        onSubmit={onSubmit}
        confirmLabel={'Salvar alteração'}>
                            <GdocFormItem name="name">
                {field => (
                    <>
                        <GdocTextInput 
                            field={field} 
                            label={'Nome'} 
                            placeholder={'Digite seu nome completo'} 
                        />
                        <GdocFormError name={'name'} />
                    </>
                )}
            </GdocFormItem>

            <GdocFormItem name="cpfCnpj">
                {field => (
                    <>
                        <GdocTextInput 
                            field={field} 
                            label={'CPF/CNPJ'} 
                            placeholder={'000.000.000-00'} 
                            mask={Masks.BRL_CPF}
                        />
                        <GdocFormError name={'cpfCnpj'} />
                    </>
                )}
            </GdocFormItem>

            <GdocFormItem name="dateOfBirth">
                {field => (
                    <>
                        <GdocTextInput 
                            field={field} 
                            label={'Data de Nascimento'} 
                            placeholder={'DD/MM/AAAA'} 
                            mask={Masks.DATE_DDMMYYYY}
                        />
                        <GdocFormError name={'dateOfBirth'} />
                    </>
                )}
            </GdocFormItem>

            <GdocFormItem name="gender">
                {field => (
                    <>
                        <GdocTextInput 
                            field={field} 
                            label={'Gênero'} 
                            placeholder={'Ex: Masculino, Feminino...'} 
                        />
                        <GdocFormError name={'gender'} />
                    </>
                )}
            </GdocFormItem> 
            <GdocPrimaryButton onPress={onClose}>
                Cancelar
            </GdocPrimaryButton>
        </GdocForm>
    )
}