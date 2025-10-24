// SearchWithSuggest Molecular Component

"use client";

import { SuggestionGroup } from "@/lib/types/templates";
import { KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import styles from "./SearchWithSuggest.module.scss";

interface SearchWithSuggestProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  suggestions: SuggestionGroup[];
  onSuggestionSelect?: (item: SuggestionGroup["items"][number]) => void;
  onBackspaceAtEmpty?: () => void;
  placeholder?: string;
  className?: string;
}

export default function SearchWithSuggest({
  value,
  onChange,
  onSubmit,
  suggestions,
  onSuggestionSelect,
  onBackspaceAtEmpty,
  placeholder = "Search use cases, methodology, integrations...",
  className = ""
}: SearchWithSuggestProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [filteredSuggestions, setFilteredSuggestions] = useState<SuggestionGroup[]>(suggestions);
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  // Check if mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Dynamic placeholder based on screen size
  const dynamicPlaceholder = isMobile ? "Search use cases..." : placeholder;

  // Filter suggestions based on input
  useEffect(() => {
    if (!value.trim()) {
      setFilteredSuggestions(suggestions);
      return;
    }

    const filtered = suggestions.map(group => ({
      ...group,
      items: group.items.filter(item =>
        item.label.toLowerCase().includes(value.toLowerCase())
      )
    })).filter(group => group.items.length > 0);

    setFilteredSuggestions(filtered);
  }, [value, suggestions]);

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value && onBackspaceAtEmpty) {
      onBackspaceAtEmpty();
      return;
    }

    if (!isOpen) {
      if (e.key === 'Enter') {
        onSubmit(value);
        return;
      }
      if (e.key === 'ArrowDown') {
        setIsOpen(true);
        setActiveIndex(0);
        return;
      }
      return;
    }

    const totalItems = filteredSuggestions.reduce((acc, group) => acc + group.items.length, 0);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => (prev + 1) % totalItems);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => prev <= 0 ? totalItems - 1 : prev - 1);
        break;
      case 'Tab':
        setIsOpen(false);
        setActiveIndex(-1);
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0) {
          const item = getItemByIndex(activeIndex);
          if (item) {
            handleSuggestionClick(item);
          }
        } else {
          onSubmit(value);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setActiveIndex(-1);
        inputRef.current?.blur();
        break;
      default:
        break;
    }
  };

  const getItemByIndex = (index: number) => {
    let currentIndex = 0;
    for (const group of filteredSuggestions) {
      for (const item of group.items) {
        if (currentIndex === index) {
          return item;
        }
        currentIndex++;
      }
    }
    return null;
  };

  const handleSuggestionClick = (item: { label: string; value: string; type: 'segment' | 'methodology' }) => {
    onChange("");
    setIsOpen(false);
    setActiveIndex(-1);
    onSuggestionSelect?.(item);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    setActiveIndex(-1);
  };

  const handleInputBlur = () => {
    // Delay to allow click events on suggestions
    setTimeout(() => {
      setIsOpen(false);
      setActiveIndex(-1);
    }, 150);
  };

  return (
    <div className={`${styles.searchContainer} ${className}`}>
      <div className="position-relative">
        <input
          ref={inputRef}
          role="combobox"
          aria-expanded={isOpen && filteredSuggestions.length > 0}
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-activedescendant={activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={dynamicPlaceholder}
          className={styles.searchInput}
        />
        <div className={styles.searchIcon}>
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && filteredSuggestions.length > 0 && (
        <div
          ref={listRef}
          id={listboxId}
          className={styles.suggestions}
          role="listbox"
        >
          {filteredSuggestions.map((group, groupIndex) => (
            <div
              key={group.label}
              className={styles.group}
              role="group"
              aria-label={group.label}
            >
              <div className={styles.groupLabel} id={`${listboxId}-group-${groupIndex}`}>
                {group.label}
              </div>
              {group.items.map((item, itemIndex) => {
                const globalIndex = filteredSuggestions
                  .slice(0, groupIndex)
                  .reduce((acc, g) => acc + g.items.length, 0) + itemIndex;
                
                return (
                  <button
                    key={`${group.label}-${item.value}`}
                    onClick={() => handleSuggestionClick(item)}
                    className={`${styles.suggestionItem} ${activeIndex === globalIndex ? styles.active : ''}`}
                    role="option"
                    id={`${listboxId}-option-${globalIndex}`}
                    aria-selected={activeIndex === globalIndex}
                    tabIndex={-1}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
