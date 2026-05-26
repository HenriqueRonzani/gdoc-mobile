export type Subject = {
  id: number
  name: string
  type: 'CATEGORY' | 'SERVICE'
  description: string
  services_count: number
  sector_responsible: string
  icon_name: string
  icon_color: string
}

export type extension =
  | ".pdf"
  | ".txt"
  | ".png"
  | ".wav"
  | ".webm"
  | ".doc"
  | ".docx"
  | ".csv"
  | ".xls"
  | ".xlsx"
  | ".jpeg"
  | ".jpg"
  | ".mp3"
  | ".mp4"
  | ".ogg"

type StringBool = 'false' | 'true'

export type CustomFieldConfig = {
  id: string
  type: 'string' | 'checkbox' | 'radio' | 'select' | 'date' | file
  name: string
  is_required: 'true' | ''
  options: {
    mask: '' | string
    defaultvalue: string | null
    'maxchar': ''
    'minvalue': ''
    'maxvalue': ''
    'dateformat': ''
    'values': string[] | null
    'readonly': StringBool
    'date_range': StringBool
    'initial_date': string | null
    'final_date': string | null
    'optional_message_error_validation': string | ''
    'extensions': extension[] | null
    'position': null
    'select_searchable': null
    'select_multiple': null
  }
}

export type IdentificationType = 'ANONYMOUS' | 'CONFIDENTIAL' | 'NOT_CONFIDENTIAL'

export type RecipientOption = {
  sector_id: number
  responsible_id: number | null,
  recipient_name: string
}

export type CreationSubject = {
  id: 1190
  name: string
  type: string
  fields: CustomFieldConfig[]
  description: string | null
  recipient_options: RecipientOption[]
  sector_responsible: string
  identification_type: IdentificationType[]
}

type Recipients = {
  sector_id: number
  responsible_id: number
}

type FieldCreation = {
  id: number
  value: string
}

export type CreateSubjectRequest = {
  service_id: number
  recipients: Recipients[]
  identification_type: IdentificationType
  field: FieldCreation
  is_test: boolean
}
