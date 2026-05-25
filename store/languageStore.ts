import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Language } from "@/types/learning";

interface LanguageState {
  selectedLanguage: Language | null;
  hasHydrated: boolean;
  setSelectedLanguage: (language: Language) => void;
  clearSelectedLanguage: () => void;
  setHasHydrated: (v: boolean) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selectedLanguage: null,
      hasHydrated: false,
      setSelectedLanguage: (language) => set({ selectedLanguage: language }),
      clearSelectedLanguage: () => set({ selectedLanguage: null }),
      setHasHydrated: (v) => set({ hasHydrated: v }),
    }),
    {
      name: "lingua-language",
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist the language — hasHydrated is runtime-only
      partialize: (state) => ({ selectedLanguage: state.selectedLanguage }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
