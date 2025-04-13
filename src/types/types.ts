import type { UniqueIdentifier } from '@dnd-kit/core'

export interface TranslationItemType {
  id: UniqueIdentifier;
  keyword: string;
  translations: Record<string, string>;
} 