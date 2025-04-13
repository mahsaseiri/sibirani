"use client";

import * as React from "react";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { useState } from "react";

export interface TranslationItem {
  id: UniqueIdentifier;
  keyword: string;
  translations: {
    [key: string]: string;
  };
}

interface TranslationState {
  items: TranslationItem[];
  languages: string[];
  selectedLanguage: string;
}

interface TranslationContextType extends TranslationState {
  addKeyword: (keyword: string, translation: string) => void;
  updateTranslation: (
    id: UniqueIdentifier,
    language: string,
    translation: string
  ) => void;
  setSelectedLanguage: (language: string) => void;
  reorderItems: (
    activeId: UniqueIdentifier,
    overId: UniqueIdentifier | undefined
  ) => void;
  addTranslation: (newTranslation: TranslationItem) => void;
}

const initialState: TranslationState = {
  items: [
    {
      id: "1",
      keyword: "hello",
      translations: {
        en: "hello",
        fa: "",
        de: "hallo",
        ru: "привет",
        ar: "مرحبا",
      },
    },
    {
      id: "2",
      keyword: "world",
      translations: {
        en: "world",
        fa: "جهان",
        de: "welt",
        ru: "мир",
        ar: "عالم",
      },
    },
    {
      id: "3",
      keyword: "apple",
      translations: {
        en: "apple",
        fa: "سیب",
        de: "apfel",
        ru: "яблоко",
        ar: "تفاحة",
      },
    },
    {
      id: "4",
      keyword: "book",
      translations: {
        en: "book",
        fa: "کتاب",
        de: "buch",
        ru: "книга",
        ar: "كتاب",
      },
    },
  ],
  languages: ["en", "fa", "de", "ru", "ar"],
  selectedLanguage: "fa",
};

const TranslationContext = React.createContext<
  TranslationContextType | undefined
>(undefined);

export const TranslationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mounted, setMounted] = React.useState<boolean>(false);
  const [state, setState] = React.useState<TranslationState>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("translationState");
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (error) {
        console.error("Error loading from localStorage:", error);
      }
    }
    return initialState;
  });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem("translationState", JSON.stringify(state));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }
  }, [state, mounted]);

  const addKeyword = (keyword: string, translation: string) => {
    const newItem: TranslationItem = {
      id: Date.now().toString(),
      keyword,
      translations: Object.fromEntries(
        state.languages.map((lang: string) => [
          lang,
          lang === state.selectedLanguage ? translation : "",
        ])
      ),
    };

    setState((prev: TranslationState) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const updateTranslation = (
    id: UniqueIdentifier,
    language: string,
    translation: string
  ) => {
    setState((prev: TranslationState) => ({
      ...prev,
      items: prev.items.map((item: TranslationItem) =>
        item.id === id
          ? {
              ...item,
              translations: {
                ...item.translations,
                [language]: translation,
              },
            }
          : item
      ),
    }));
  };

  const setSelectedLanguage = (language: string) => {
    setState((prev: TranslationState) => ({
      ...prev,
      selectedLanguage: language,
    }));
  };

  const reorderItems = (
    activeId: UniqueIdentifier,
    overId: UniqueIdentifier | undefined
  ) => {
    if (!overId) return;

    setState((prev: TranslationState) => {
      const oldIndex = prev.items.findIndex(
        (item: TranslationItem) => item.id === activeId
      );
      const newIndex = prev.items.findIndex(
        (item: TranslationItem) => item.id === overId
      );

      const newItems = [...prev.items];
      const [removed] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, removed);

      return {
        ...prev,
        items: newItems,
      };
    });
  };

  const addTranslation = (newTranslation: TranslationItem) => {
    setState((prev: TranslationState) => ({
      ...prev,
      items: [...prev.items, newTranslation],
    }));
  };

  return (
    <TranslationContext.Provider
      value={{
        ...state,
        addKeyword,
        updateTranslation,
        setSelectedLanguage,
        reorderItems,
        addTranslation,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = React.useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
