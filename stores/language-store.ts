import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? window.localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
    }
  )
);
