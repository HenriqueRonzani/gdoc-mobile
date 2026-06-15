import type { GENDER_ENUM } from '@/enum/gender.enum'

export interface Contact {
  id: number
  user_id: number
  type: 'email' | 'telephone' | string
  value: string
  name: string | null
  is_primary: boolean
  is_verified: boolean
  is_hidden: boolean
  is_from_sso: boolean
  should_receive_notifications: boolean
  verification_code: string | null
  created_at: string | null
  updated_at: string | null
  deleted_at: string | null
}

export interface Address {
  id: number
  street: string | null
  number: string | null
  complement: string | null
  neighborhood: string | null
  city: string | null
  state: string | null
  zip: string | null
  latitude: number | null
  longitude: number | null
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface ExternalNotificationSettings {
  id: number
  people_id: number
  enable_achievement_internal_email: boolean
  enable_forward_internal_email: boolean
  enable_new_sector_tasks: boolean
  enable_reopen_internal_email: boolean
  enable_reply_internal_email: boolean
  enable_request_signature: boolean
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface NestedUser {
  id: number
  peopleId: number
  roleId: number | null
  status: string
  user_type: string
  reset_password_on_login: boolean
  has_internal_access: boolean
  has_been_logged: boolean
  isAnonymous: boolean
  is_federal_employee: boolean
  user_has_own_email: boolean
  accountVerifiedAt: string | null
  verificationToken: string | null
  passwordVerificationToken: string | null
  passwordVerificationTokenExpiresAt: string | null
  first_access_limit_date: string | null
  ged_user_id: number | null
  external_user_type: any | null
  moodle_user_id: any | null
  moodle_id_number: any | null
  origin: any | null
  returns_in: any | null
  last_contact_update: string | null
  last_password_update: string | null
  last_password_update_check: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface Person {
  id: number
  addressId: number
  inboxId: number
  contactOrganizationId: number | null
  name: string
  email: string
  cellphone: string
  internalEmail: string
  cpfCnpj: string
  secondary_cpf_cnpj: string | null
  dateOfBirth: string
  gender: keyof typeof GENDER_ENUM
  mother_name: string | null
  nationality: string | null
  place_of_birth: string | null
  profession: string | null
  occupation: string | null
  responsibility: string
  registration: string
  companyName: string | null
  mainContactName: string | null
  photoLink: string | null
  photo_link: string
  profile_remote_file_key: string
  profile_remote_thumbnail_file_key: string | null
  textualSignature: string
  showCellPhone: boolean
  pending_policies: boolean
  user_has_certificate: boolean
  address: Address
  external_notification_settings: ExternalNotificationSettings
  user: NestedUser
}

export interface Role {
  id: number
  name: string
  description: string
  is_default: boolean
  sector_id: number | null
  permissions: any[]
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface Sector {
  id: number
  inboxId: number
  parentSectorId: number | null
  manager_id: number | null
  name: string
  symbol: string
  type: 'sector' | 'work-group' | string
  status: string
  color: string
  ramal: string | null
  telephone: string | null
  internalEmail: string
  show_in_organizational_chart: boolean
  has_contact: boolean | null
  access_ged_sector_id: number | null
  primary_ged_sector_id: number | null
  document_print_layout_id: number | null
  ged_resource_id: number | null
  pivot: Record<string, any>
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface UserPreferences {
  id: number
  user_id: number
  default_attachments_display: 'grid' | 'list' | string
  default_editor_type: 'advanced' | string
  default_inbox_sort: 'unread' | string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface UserSessionData {
  id: number
  uuid: string
  peopleId: number
  roleId: number | null
  status: string
  user_type: string
  auth_token: string
  accountVerifiedAt: string
  login_origin: string
  login_type: string

  hasInternal: boolean
  has_been_logged: boolean
  has_internal_access: boolean
  isAnonymous: boolean
  is_federal_employee: boolean
  need_update_contacts: boolean
  need_update_password: boolean
  nps_already_answered: boolean
  reset_password_on_login: boolean
  user_has_own_email: boolean

  last_contact_update: string
  last_password_update: string
  last_password_update_check: string
  first_access_limit_date: string | null
  passwordVerificationToken: string | null
  passwordVerificationTokenExpiresAt: string | null
  verificationToken: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null

  ged_user_id: number | null
  external_user_type: any | null
  moodle_id_number: any | null
  moodle_user_id: any | null
  origin: any | null
  returns_in: any | null

  contacts: Contact[]
  permissions: any[]
  person: Person
  roles: Role[]
  sectors: Sector[]
  user_preferences: UserPreferences
}
