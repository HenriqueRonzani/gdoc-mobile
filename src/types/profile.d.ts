import type { GENDER_ENUM } from '@/enum/gender.enum'

export type Address = {
  zip: string | null
  city: string | null
  state: string | null
  street: string | null
  number: string | null
}

export type Contact = {
  id: number
  name: string | null
  value: string
  type: string
  is_verified: boolean
}

export type ExternalNotificationSettings = {
  id: number
  people_id: number
  enable_request_signature: boolean
  enable_reply_internal_email: boolean
}

export type Role = {
  id: number
  name: string
  description: string
}

export type Sector = {
  id: number
  name: string;
}

export type UserPreferences = {
  id: number
  user_id: number
  default_inbox_sort: string
  created_at: string
}

export type Person = {
  id: number
  inboxId: number
  addressId: number
  address: Address
  cellphone: string
  companyName: string | null
  contactOrganizationId: number | null
  cpfCnpj: string
  created_at: string
  dateOfBirth: string
  deleted_at: string | null
  email: string
  external_notification_settings: ExternalNotificationSettings
  gender: keyof typeof GENDER_ENUM
  internalEmail: string | null
  lastAccessDate: string | null
  mainContactName: string | null
  mother_name: string | null
  name: string
  nationality: string
  occupation: string | null
  pending_policies: boolean
  photoLink: string | null
  photo_link: string | null
  place_of_birth: string | null
  profession: string | null
  profile_remote_file_key: string | null
  profile_remote_thumbnail_file_key: string | null
  registration: string | null
  responsibility: string | null
  secondary_cpf_cnpj: string | null
  showCellPhone: boolean
  textualSignature: string
  type: string | null
  updated_at: string
  user: UserProfile
  user_has_certificate: boolean
};

export type ProfileType = {
  id: number
  peopleId: number
  roleId: number | null
  verificationToken: string | null
  accountVerifiedAt: string | null
  auth_token: string
  contacts: Contact[]
  counter_password: number | string | null
  created_at: string
  deleted_at: string | null
  external_user_type: string | null
  first_access_limit_date: string | null
  ged_user_id: number | string | null
  hasInternal: boolean
  has_been_logged: boolean
  has_internal_access: boolean
  isAnonymous: boolean
  is_federal_employee: boolean
  last_contact_update: string | null
  last_password_update: string | null
  last_password_update_check: string | null
  login_origin: string
  login_type: string
  moodle_id_number: string | number | null
  moodle_user_id: string | number | null
  need_update_contacts: boolean
  need_update_password: boolean
  nps_already_answered: boolean
  origin: string | null
  passwordVerificationToken: string | null
  passwordVerificationTokenExpiresAt: string | null
  permissions: unknown[]
  person: Person
  reset_password_on_login: boolean
  returns_in: string | null
  roles: Role[]
  sectors: Sector[]
  status: string
  updated_at: string
  user_has_own_email: boolean
  user_preferences: UserPreferences
  user_type: string
  uuid: string
}
