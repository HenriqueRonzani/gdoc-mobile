import { GdocDropdown } from '@/components/form/gdoc-dropdown'
import { GdocForm } from '@/components/form/gdoc-form'
import { GdocFormError } from '@/components/form/gdoc-form-error'
import { GdocFormItem } from '@/components/form/gdoc-form-item'
import { GdocTextInput } from '@/components/form/gdoc-text-input'
import { GdocModal } from '@/components/gdoc-modal'
import { useProfile } from '@/providers/profile-provider'
import { UpdateUserProfileSchema, type UpdateUserProfileFormData } from '@/schemas/profile-edit.schema'

type Props = {
  openModal: boolean
  loading: boolean
  onSave: (data: UpdateUserProfileFormData) => void
  onClose: () => void
}

export function PersonModal({openModal, loading, onClose, onSave}: Props) {
  const {profile} = useProfile()

  const initialValues = {
    ...profile.person
  } as UpdateUserProfileFormData

  const genreOptions = [
    { label: 'Masculino', value: 'male' },
    { label: 'Feminino', value: 'female' },
    { label: 'Outro', value: 'other' }
  ]

  return (
    <GdocModal open={openModal} onClose={onClose} headerTitle='Editar dados pessoais'>
      <GdocForm schema={UpdateUserProfileSchema} onSubmit={onSave} confirmLabel="Salvar" initial={initialValues} isLoading={loading}>
        <GdocFormItem name={'name'}>
          {field => (
            <>
              <GdocTextInput field={field} label="Nome completo" placeholder="Nome completo" />
              <GdocFormError name={'name'} />
            </>
          )}
        </GdocFormItem>
        <GdocFormItem name={'cpfCnpj'}>
          {field => (
            <>
              <GdocTextInput field={field} label="CPF/CPNJ" placeholder="CPF/CNPJ" disabled/>
              <GdocFormError name={'cpfCnpj'} />
            </>
          )}
        </GdocFormItem>

        <GdocFormItem name={'gender'}>
          {field => (
            <>
              <GdocDropdown placeholder="Selecione o gênero" items={genreOptions} field={field} />
              <GdocFormError name={'gender'} />
            </>
          )}
        </GdocFormItem>
        <GdocFormItem name={'birthDate'}>
          {field => (
            <>
              <GdocTextInput field={field} label="Data de nascimento" placeholder="Data de nascimento" disabled/>
              <GdocFormError name={'birthDate'} />
            </>
          )}
        </GdocFormItem>
        <GdocFormItem name={'email'}>
          {field => (
            <>
              <GdocTextInput field={field} label="Email" placeholder="Email" disabled/>
              <GdocFormError name={'email'} />
            </>
          )}
        </GdocFormItem>
        <GdocFormItem name={'nationality'}>
          {field => (
            <>
              <GdocTextInput field={field} label="Nacionalidade" placeholder="Nacionalidade"/>
              <GdocFormError name={'nationality'} />
            </>
          )}
        </GdocFormItem>
         <GdocFormItem name={'place_of_birth'}>
          {field => (
            <>
              <GdocTextInput field={field} label="Naturalidadde" placeholder="Naturalidade"/>
              <GdocFormError name={'place_of_birth'} />
            </>
          )}
        </GdocFormItem>
        <GdocFormItem name={'mother_name'}>
          {field => (
            <>
              <GdocTextInput field={field} label="Nome da mãe" placeholder="Nome da mãe"/>
              <GdocFormError name={'mother_name'} />
            </>
          )}
        </GdocFormItem>
      </GdocForm>
    </GdocModal>
  )
}
