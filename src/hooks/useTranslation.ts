import { useCallback, useMemo } from 'react';

import {
  defaultLanguage,
  getTexts,
  LanguageCode,
  TranslationKey,
  translations,
} from '@/constants/texts';
import { useSettingsStore } from '@/store';

interface UseTranslationResult {
  t: (key: TranslationKey) => string;
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  availableLanguages: LanguageCode[];
}

export const useTranslation = (): UseTranslationResult => {
  const language = useSettingsStore((state) => state.language);
  const setLanguage = useSettingsStore((state) => state.setLanguage);

  const dictionary = useMemo(() => getTexts(language), [language]);

  const fallbackDictionary = useMemo(() => getTexts(defaultLanguage), []);

  const t = useCallback(
    (key: TranslationKey): string =>
      dictionary[key] ?? fallbackDictionary[key] ?? key,
    [dictionary, fallbackDictionary],
  );

  const availableLanguages = useMemo(
    () => Object.keys(translations) as LanguageCode[],
    [],
  );

  return {
    t,
    language,
    setLanguage,
    availableLanguages,
  };
};
