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
