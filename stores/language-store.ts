import { create } from "zustand";
import { persist } from "zustand/middleware";

type Language = "en" | "ar";

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      language: "en",

      setLanguage: (lang) => {
        set({ language: lang });
      },

      toggleLanguage: () => {
        set((state) => ({
          language: state.language === "en" ? "ar" : "en",
        }));
      },
    }),
    {
      name: "amanoon-language",
      skipHydration: true,
    }
  )
);
