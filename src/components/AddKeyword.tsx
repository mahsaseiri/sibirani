import React, { useState } from "react";

interface AddKeywordProps {
  selectedLanguage: string;
  languageNames: { [key: string]: string };
  onAddKeyword: (keyword: string, translation: string) => void;
}

const AddKeyword: React.FC<AddKeywordProps> = ({
  selectedLanguage,
  languageNames,
  onAddKeyword,
}) => {
  const [newKeyword, setNewKeyword] = useState("");
  const [newTranslation, setNewTranslation] = useState("");

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newKeyword.trim() && newTranslation.trim()) {
      console.log("Adding new keyword:", {
        keyword: newKeyword.trim(),
        translation: newTranslation.trim(),
      });
      onAddKeyword(newKeyword.trim(), newTranslation.trim());
      setNewKeyword("");
      setNewTranslation("");
    }
  };

  return (
    <form
      onSubmit={handleAddKeyword}
      className="mb-8 bg-white p-4 rounded-lg shadow"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
          placeholder="New keyword"
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="text"
          value={newTranslation}
          onChange={(e) => setNewTranslation(e.target.value)}
          placeholder={`Translation (${
            languageNames[selectedLanguage] || selectedLanguage
          })`}
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={!newKeyword.trim() || !newTranslation.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Add Keyword
        </button>
      </div>
    </form>
  );
};

export default AddKeyword;
