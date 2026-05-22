type Subject = {
  background_icon_color: string | null
  display_mode: string
  document_settings_id: number
  document_subject_id: number | null
  external_app_name: string | null
  external_app_url: string | null
  has_announcement: boolean
  icon_color: string
  icon_name: string
  id: number
  is_external_app: boolean
  name: string
  parent_service: {
    id: number
    name: string
  }
  sector_responsible: {
    id: number
    name: string
    symbol: string
  } | null
  sector_responsible_id: number | null
  service_channel: string[] | null
  type: 'CATEGORY' | 'SERVICE'
}

export type Service = Subject
export type Category = Subject