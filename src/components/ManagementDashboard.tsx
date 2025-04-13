"use client";

import * as React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  defaultDropAnimation,
  DragOverEvent,
  MeasuringStrategy,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useTranslation } from "../context/TranslationContext";
import { TranslationItem } from "./TranslationItem";
import CustomSelect from "./CustomSelect";
import AddKeyword from "./AddKeyword";

// Map of language codes to their display names
const languageNames: Record<string, string> = {
  en: "English",
  fa: "فارسی",
  de: "Deutsch",
  ru: "Русский",
  ar: "العربية",
};

const dropAnimation = {
  ...defaultDropAnimation,
  dragSourceOpacity: 0.5,
};

export default function ManagementDashboard() {
  const {
    items,
    languages,
    selectedLanguage,
    addKeyword,
    reorderItems,
    setSelectedLanguage,
    addTranslation,
  } = useTranslation();
  const [newKeyword, setNewKeyword] = React.useState("");
  const [newTranslation, setNewTranslation] = React.useState("");
  const [activeId, setActiveId] = React.useState<string | number | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [filterLanguage, setFilterLanguage] = React.useState(selectedLanguage);
  const [mounted, setMounted] = React.useState(false);
  const [isAddingKeyword, setIsAddingKeyword] = React.useState(false);

  // Handle client-side hydration
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Update filter language when selected language changes
  React.useEffect(() => {
    if (mounted) {
      setFilterLanguage(selectedLanguage);
    }
  }, [selectedLanguage, mounted]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required before drag starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
    setIsDragging(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      reorderItems(active.id, over?.id);
    }
    setActiveId(null);
    setIsDragging(false);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setIsDragging(false);
  };

  const handleDragOver = (event: DragOverEvent) => {
    // You can add custom logic here for drag over effects
  };

  const handleAddKeyword = (keyword: string, translation: string) => {
    console.log("ManagementDashboard handling new keyword:", {
      keyword,
      translation,
      selectedLanguage,
    });

    const newId = `translation_${Date.now()}`;
    const newTranslation = {
      id: newId,
      keyword: keyword,
      translations: {
        [selectedLanguage]: translation,
      },
    };

    console.log("Adding new translation:", newTranslation);
    addTranslation(newTranslation);
  };

  const handleLanguageFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilterLanguage(e.target.value);
  };

  const activeItem = activeId
    ? items.find((item) => item.id === activeId)
    : null;

  // Prevent rendering until client-side hydration is complete
  if (!mounted) {
    return null;
  }
  const languageOptions = languages.map((lang) => ({
    value: lang,
    label: languageNames[lang] || lang,
  }));
  return (
    <div className="py-4 px-4 mb-2">
      <div className="w-full  mx-auto m-2">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold ">Translation Management</h1>

          <div className="flex items-center gap-2">
            <CustomSelect
              options={languageOptions}
              value={selectedLanguage}
              onChange={setSelectedLanguage}
              placeholder="Select language..."
            />
          </div>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
          onDragOver={handleDragOver}
          measuring={{
            droppable: {
              strategy: MeasuringStrategy.Always,
            },
          }}
        >
          <SortableContext
            items={items.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div
              className={`w-full mb-4 p-2 bg-white rounded-md overflow-y-auto max-h-[500px] p-2 transition-opacity duration-200 ${
                isDragging ? "opacity-70" : "opacity-100"
              }`}
            >
              {items.map((item) => (
                <TranslationItem
                  key={item.id}
                  item={item}
                  selectedLanguage={selectedLanguage}
                />
              ))}
            </div>
          </SortableContext>

          <DragOverlay dropAnimation={dropAnimation}>
            {activeItem ? (
              <TranslationItem
                item={activeItem}
                selectedLanguage={filterLanguage}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      {!isAddingKeyword ? (
        <button
          className="w-full bg-blue-800 text-white p-2 rounded-md"
          onClick={() => setIsAddingKeyword(true)}
        >
          Add Keyword
        </button>
      ) : (
        <AddKeyword
          selectedLanguage={selectedLanguage}
          languageNames={languageNames}
          onAddKeyword={handleAddKeyword}
        />
      )}
    </div>
  );
}
