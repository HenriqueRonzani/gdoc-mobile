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
    name: profile.person.name || '',
    gender: profile.person?.gender
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
        <GdocFormItem name={'gender'}>
          {field => (
            <>
              <GdocDropdown placeholder="Gênero" items={genreOptions} field={field} />
              <GdocFormError name={'gender'} />
            </>
          )}
        </GdocFormItem>
      </GdocForm>
    </GdocModal>
  )
}
