import { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select option...",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target != containerRef.current) return;

      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen && highlightedIndex >= 0) {
            onChange(options[highlightedIndex].value);
          }
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
        case "Escape":
          setIsOpen(false);
          break;
      }
    };

    containerRef.current?.addEventListener("keydown", handler);

    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    };
  }, [isOpen, highlightedIndex, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      tabIndex={0}
      className="relative w-[100px] min-h-[40px]  rounded-lg  cursor-pointer"
    >
      {/* Selected Value Display */}
      <div className="flex items-center gap-2 p-3 outline-none">
        <span
          className={`border-[6px] border-transparent ${
            isOpen ? "border-b-gray-400  mb-2" : "border-t-gray-300 mt-2"
          }`}
        />
        <span
          className={`flex-grow ${
            !selectedOption ? "text-gray-400" : "text-gray-400"
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
      </div>

      {/* Options List */}
      <ul
        className={`absolute w-full rounded-lg bg-white mt-1 shadow-lg border border-gray-200 max-h-60 overflow-y-auto z-50 
        ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        } 
        transition-all duration-200 ease-in-out`}
      >
        {options.map((option, index) => (
          <li
            key={option.value}
            className={`px-4 py-2.5 transition-colors duration-200
              ${index === highlightedIndex ? "bg-blue-50" : ""} 
              ${
                option.value === value
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700"
              } 
              hover:bg-blue-50 cursor-pointer`}
            onClick={(e) => {
              e.stopPropagation();
              onChange(option.value);
              setIsOpen(false);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
