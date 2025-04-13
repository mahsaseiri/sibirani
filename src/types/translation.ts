export interface Translation {
  [key: string]: string;
}

export interface TranslationItem {
  id: string;
  keyword: string;
  translations: {
    [language: string]: string;
  };
}

export interface TranslationState {
  items: TranslationItem[];
  languages: string[];
  selectedLanguage: string;
}

export interface TranslationContextType extends TranslationState {
  addKeyword: (keyword: string, translation: string) => void;
  updateTranslation: (id: string, language: string, translation: string) => void;
  setSelectedLanguage: (language: string) => void;
  reorderItems: (startIndex: number, endIndex: number) => void;
} 