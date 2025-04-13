"use client";

import * as React from "react";
import { useTranslation } from "../context/TranslationContext";
import CustomSelect from "./CustomSelect";

// Map of language codes to their display names
const languageNames: Record<string, string> = {
  en: "English",
  fa: "فارسی",
  de: "Deutsch",
  ru: "Русский",
  ar: "العربية",
};

export default function PublicView() {
  const { items, languages, selectedLanguage, setSelectedLanguage } =
    useTranslation();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }
  const languageOptions = languages.map((lang) => ({
    value: lang,
    label: languageNames[lang] || lang,
  }));
  return (
    <div className="py-8 px-4">
      <div className="w-full  mb-2 mx-auto bg-white p-[20px] rounded-md">
        <div className="flex flex-row justify-between items-center mb-8">
          <h1 className="text-lg font-bold">Word Translations</h1>
          <div className="flex items-center gap-2">
            <CustomSelect
              options={languageOptions}
              value={selectedLanguage}
              onChange={setSelectedLanguage}
              placeholder="Select language..."
            />
          </div>
        </div>

        <div className="space-y-2 max-h-[500px] overflow-y-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-3 rounded-lg border border-gray-300"
            >
              <div className="text-lg font-medium mb-1">{item.keyword}</div>
              <div className="flex items-center gap-2">
                <div className="text-gray-700">
                  {item.translations[selectedLanguage] || (
                    <span className="text-gray-400 italic">
                      No translation yet
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
