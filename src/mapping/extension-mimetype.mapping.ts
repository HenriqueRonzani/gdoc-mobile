import { extension } from '@/types/service'

export const EXTENSION_MIMETYPE_MAPPING: Record<extension, string | string[]> = {
  '.pdf': 'application/pdf',
  '.txt': 'text/plain',
  '.png': 'image/png',
  '.wav': 'audio/wav',
  '.webm': [
    'video/webm',
    'audio/webm',
  ],
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.csv': 'text/csv',
  '.xls': 'application/vnd.ms-excel',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.ogg': [
    'audio/ogg',
    'video/ogg'
  ],
  '*': '*/*'
};
