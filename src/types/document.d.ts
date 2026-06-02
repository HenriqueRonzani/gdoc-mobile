export type CreateDocumentRequest = {
  service_id: number
  recipients?: number[]
  identification_type: IdentificationType
  fields: FieldCreation[]
  is_test: boolean
}

export type Attachment = {
  name: string
  size: number
  type: string // mimetype
  url: string
}

export type TimelineDispatch = {
  dispatch_number: number
  created_by: string
  created_by_sector: string
  created_at: string // isostring
  url: string
  attachments: Attachment[]
}

export type DocumentInfo = {
  "number": string
  "uuid": string
  "created_at": string
  "created_by": string
  "status": string
  "request_type": string
  "subject_type": string
}
