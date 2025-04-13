"use client";

import * as React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TranslationItemType } from "../types/types";
import { useTranslation } from "../context/TranslationContext";

// Map of language codes to their display names
const languageNames: Record<string, string> = {
  en: "English",
  fa: "فارسی",
  de: "Deutsch",
  ru: "Русский",
  ar: "العربية",
};

interface Props {
  item: TranslationItemType;
  selectedLanguage: string;
}

export function TranslationItem({ item, selectedLanguage }: Props) {
  const { updateTranslation } = useTranslation();
  const [isEditing, setIsEditing] = React.useState(false);
  const [tempTranslation, setTempTranslation] = React.useState(
    item.translations[selectedLanguage] || ""
  );

  // Update tempTranslation when selectedLanguage changes
  React.useEffect(() => {
    setTempTranslation(item.translations[selectedLanguage] || "");
    setIsEditing(false);
  }, [selectedLanguage, item.translations]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    data: {
      type: "translation-item",
      item,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "all 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
  };

  const handleSaveTranslation = () => {
    const trimmedTranslation = tempTranslation.trim();
    if (trimmedTranslation !== item.translations[selectedLanguage]) {
      updateTranslation(item.id, selectedLanguage, trimmedTranslation);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveTranslation();
    } else if (e.key === "Escape") {
      setTempTranslation(item.translations[selectedLanguage] || "");
      setIsEditing(false);
    }
  };

  const handleInputFocus = () => {
    setIsEditing(true);
    // When focusing, if there's no translation or it's "...", clear the input
    if (!item.translations[selectedLanguage] || tempTranslation === "...") {
      setTempTranslation("");
    }
  };

  const handleInputBlur = () => {
    handleSaveTranslation();
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white p-4 cursor-move border-b-[1px] border-gray-200 
        ${isDragging ? "ring-2 ring-blue-500 ring-opacity-50" : ""}`}
    >
      <div className="grid grid-cols-2 items-start items-center gap-[10px]">
        {/* Keyword */}
        <div
          className={`font-medium text-lg ${
            item.translations[selectedLanguage] ? "text-black" : "text-red-500"
          }`}
        >
          {item.keyword}
        </div>

        {/* Translation Input */}
        <div className="flex-1 w-full">
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={
                  isEditing
                    ? tempTranslation
                    : item.translations[selectedLanguage] || "..."
                }
                onChange={(e) => setTempTranslation(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onKeyDown={handleKeyDown}
                className={`w-full p-2 border rounded transition-all duration-200
                  ${
                    isEditing
                      ? "border-blue-500 ring-1 ring-blue-500 bg-white text-left"
                      : "border-transparent bg-gray-100 text-center"
                  } 
                  ${
                    !item.translations[selectedLanguage] && !isEditing
                      ? "bg-red-400 text-white"
                      : ""
                  }
                  focus:outline-none focus:text-left focus:bg-white focus:border-blue-500`}
              />
              {isEditing && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                  <button
                    onClick={handleSaveTranslation}
                    className="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600 transition-colors duration-200"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
