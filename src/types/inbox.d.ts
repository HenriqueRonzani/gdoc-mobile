export type InboxDocument = {
  allow_external_archievement: boolean;
  created_at: string;
  created_by: string;
  document_status_class: string;
  document_status_name: string;
  document_type_icon: string;
  document_type_name: string;
  document_type_type: string;
  email_uuid: string;
  has_update: boolean;
  number: string;
  subject_name: string;
  user_has_pending_signature: boolean;
  users_can_reopen_document: boolean;
};
