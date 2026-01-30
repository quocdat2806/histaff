import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { defaultLanguage, LanguageCode } from '@/constants/texts';

interface SettingsState {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  resetSettings: () => void;
  companyCode: string;
  setCompanyCode: (companyCode: string) => void;
}

const settingsStorageKey = 'settings-storage';

export const useSettingsStore = create<SettingsState>()(
  persist(
    set => ({
      language: defaultLanguage,
      setLanguage: language =>
        set(() => ({
          language,
        })),
      resetSettings: () =>
        set(() => ({
          language: defaultLanguage,
        })),
      companyCode: '',
      setCompanyCode: companyCode =>
        set(() => ({
          companyCode,
        })),
    }),
    {
      name: settingsStorageKey,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
