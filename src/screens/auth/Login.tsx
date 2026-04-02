import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { loginUser } from '@/services/authService'
import { useState } from 'react'
import { useSnackbar } from '@/providers/SnackbarProvider'
import GdocTextInput from "@/components/gdoc-form/GdocTextInput";
import GdocForm from "@/components/gdoc-form/GdocForm";
import { z } from "zod";
import GdocFormItem from "@/components/gdoc-form/GdocFormItem";
import _ from "lodash"
import GdocFormError from "@/components/gdoc-form/GdocFormError";

export default function Login() {
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const {toast} = useSnackbar()

  const initialForm = {
    cpf: '',
    password: ''
  }

  const schema = z.object({
    cpf: z.string({coerce: true}).min(5, 'Pelo menos 5 caracteres'),
    password: z.string().min(5, 'Pelo menos 5 caracteres')
  })

  const login = async (formData: typeof schema._type) => {
    try {
      setIsLoading(true)
      toast(`cpf ${formData.cpf} password ${formData.password}`)
      // await loginUser(formData.cpf, formData.password)
    } catch (error) {
      console.log(error)
      toast('Erro ao realizar login!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View>
      <GdocForm initial={initialForm} schema={schema} onSubmit={login}>
        <GdocFormItem name={'cpf'}>
          {(field) => (
            <>
              <GdocTextInput field={field} label={'CPF'} placeholder={'CPF'}/>
              <GdocFormError name={'cpf'}/>
            </>
          )}
        </GdocFormItem>
        <GdocFormItem name={'password'}>
          {(field) => (
            <>
              <GdocTextInput field={field} label={'Senha'} placeholder={'Senha'}/>
              <GdocFormError name={'password'}/>
            </>
          )}
        </GdocFormItem>
      </GdocForm>
      {isLoading && <Text>Loading</Text>}
    </View>
  )
}