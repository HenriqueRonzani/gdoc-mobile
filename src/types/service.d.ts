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
  | "*"

export type StringBool = 'false' | 'true'
export type FieldType =
  | 'string'
  | 'checkbox'
  | 'radio'
  | 'select'
  | 'date'
  | 'file'

type BaseCustomFieldConfig = {
  id: string | number;
  name: string;
  is_required: 'true' | '';
};

type CommonOptions = {
  mask: '' | string;
  defaultvalue: string | null;
  maxchar: '';
  minvalue: '';
  maxvalue: '';
  dateformat: '';
  readonly: StringBool;
  date_range: StringBool;
  initial_date: string | null;
  final_date: string | null;
  optional_message_error_validation: string | '';
  position: null;
  select_searchable: null;
  select_multiple: null;
};

export type ChoiceFieldConfig = BaseCustomFieldConfig & {
  type: 'checkbox' | 'radio' | 'select';
  options: CommonOptions & {
    values: string[];
    extensions: extension[] | null;
  };
};

export type FileFieldConfig = BaseCustomFieldConfig & {
  type: 'file';
  options: CommonOptions & {
    values: string[] | null;
    extensions: extension[];
  };
};

export type StandardFieldConfig = BaseCustomFieldConfig & {
  type: 'string' | 'date';
  options: CommonOptions & {
    values: string[] | null;
    extensions: extension[] | null;
  };
};

export type CustomFieldConfig = ChoiceFieldConfig | FileFieldConfig | StandardFieldConfig;

export type IdentificationType = 'ANONYMOUS' | 'CONFIDENTIAL' | 'NOT_CONFIDENTIAL'

export type RecipientOption = {
  sector_id: number
  responsible_id: number | null,
  recipient_name: string
}

export type Service = {
  id: string | number
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

export type FileValue = {
  uri: string,
  name: string
  type: string
}

export type CheckboxValue = string

export type StringValue = string

type FieldCreation = {
  id: number | string
  value: StringValue | CheckboxValue | FileValue
}
