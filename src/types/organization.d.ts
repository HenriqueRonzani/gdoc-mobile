export interface Address {
  id: number;
  city: string;
  complement: string | null;
  neighborhood: string;
  number: string;
  street: string;
  state: string;
  zip: string;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface DefaultRole {
  id: number;
  name: string;
  description: string;
  is_default: boolean;
  sector_id: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ServiceLetterRoot {
  id: number;
  name: string;
  description: string | null;
  type: string;
  display_mode: string;
  isRoot: boolean;
  is_external_app: boolean;
  external_app_name: string | null;
  external_app_url: string | null;
  node_path: string;
  icon_name: string | null;
  icon_color: string | null;
  icon_size: string;
  background_icon_color: string | null;
  hide_from_search: boolean;
  keywords: string | null;
  announcement: string | null;
  terms_acceptance_mandatory: boolean | null;
  visibility_type: string;
  visibility_value: any | null;
  service_letter_id: number;
  parent_service_id: number | null;
  sector_responsible_id: number | null;
  document_settings_id: number | null;
  document_subject_id: number | null;
  allowed_login_types: string[] | any[];
  allowed_users_ids: number[] | null;
  service_channel: any[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ServiceLetter {
  id: number;
  name: string;
  description: string | null;
  root: ServiceLetterRoot;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface PrintLayout {
  id: number;
  version: number;
  bg_image_remote_file_key: string;
  body_html: string;
  content: string;
  cover: string;
  border_color: string;
  border_style: string;
  border_width: string;
  border_radius: number;
  is_border_enabled: boolean;
  cover_margin_top: string;
  cover_margin_right: string;
  cover_margin_bottom: string;
  cover_margin_left: string;
  margin_top: string;
  margin_right: string;
  margin_bottom: string;
  margin_left: string;
  margin_x: string;
  margin_y: string;
  page_width: string;
  page_height: string;
  header_height: string;
  header_html: string | null;
  footer_height: string;
  footer_html: string | null;
  footer_text: string | null;
  page_number_layout: string;
  page_number_position: string;
  show_signers_tag: boolean;
  show_signers_tag_at_bottom_of_page: boolean;
  show_signers_tag_at_left_of_page: boolean;
  show_signers_tag_at_right_of_page: boolean;
  show_signers_tag_at_top_of_page: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Telephone {
  id: number;
  organizationId: number;
  number: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Organization {
  id: number;
  name: string;
  type: string;
  documentNumber: string;
  companySize: string | number | null;
  primary_color: string;
  logoLink: string;
  logo_remote_file_key: string;
  timezone: string | null;

  addressId: number;
  address: Address;
  telephones: Telephone[];

  is_edoc: boolean;
  is_facebook_login_enable: boolean;
  is_google_login_enable: boolean;
  is_govbr_login_enable: boolean;
  is_icp_login_enable: boolean;
  is_ged_module_enabled: boolean;
  is_moodle_enabled: boolean;
  enable_govbr_signatures: boolean;
  enable_sms_notifications: boolean;
  enable_allow_free_forward_to_any_sector_permission: boolean;
  convert_word_files_on_upload: boolean;
  limit_days_to_first_login: number;
  login_images: any[];

  signature_application_id: string;
  signature_organization_token: string;

  paperPrice: string;
  printPrice: string;

  document_print_layout_id: number;
  print_layout: PrintLayout;
  edoc_environment_id: number | null;

  default_role: DefaultRole;
  external_service_letter_id: number;
  external_service_letter: ServiceLetter;
  internal_service_letter_id: number;
  internal_service_letter: ServiceLetter;
  ged_app_url: string | null;

  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
