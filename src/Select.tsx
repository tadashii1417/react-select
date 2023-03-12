import styles from './Select.module.css';
import {useEffect, useRef, useState} from 'react';

export type SelectOption = {
  label: string
  value: string | number
}

type SingleSelectProps = {
  multiple: false
  value?: SelectOption
  onChange: (value: SelectOption | undefined) => void
}

type MultipleSelectProps = {
  multiple: true
  value: SelectOption[]
  onChange: (value: SelectOption[]) => void
}

type SelectProps = {
  options: SelectOption[]
} & (SingleSelectProps | MultipleSelectProps)

export function Select({multiple, value, options, onChange}: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const clearOptions = () => {
    multiple ? onChange([]) : onChange(undefined);
  };

  const selectOption = (option: SelectOption) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter(o => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  };

  function isOptionSelected(option: SelectOption) {
    return multiple ? value.includes(option) : option === value;
  }

  useEffect(() => {
    setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const keyboardHandler = (e:KeyboardEvent) => {
      switch (e.code) {
        case "Enter":
          setIsOpen(prev => !prev);
          if(isOpen) selectOption(options[highlightedIndex]);
          break;
        case "ArrowDown": {
          const nextIndex = highlightedIndex + 1;
          if (nextIndex < options.length) setHighlightedIndex(nextIndex);
          break;
        }
        case "ArrowUp": {
          const nextIndex = highlightedIndex - 1;
          if (nextIndex >= 0) setHighlightedIndex(nextIndex);
          break;
        }
        case "Escape":
          setIsOpen(false);
          break;
        default:
          break;
      }
    };
    containerRef?.current?.addEventListener('keydown', keyboardHandler);
    return () => containerRef?.current?.removeEventListener('keydown', keyboardHandler);
  }, [isOpen, highlightedIndex, options]);

  return (
      <div tabIndex={0} className={styles.container}
           ref={containerRef}
           onClick={() => setIsOpen(prev => !prev)}
           onBlur={() => setIsOpen(false)}
      >
        <span className={styles.value}>{multiple
            ? value.map(val => <button
                key={val.value}
                className={styles['option-badge']}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(val);
                }}>
              {val.label}
              <span className={styles['remove-btn']}>&times;</span>
            </button>)
            : value?.label}</span>

        <div className={styles['clear-btn']} onClick={e => {
          e.stopPropagation();
          clearOptions();
        }}>&times;</div>
        <div className={styles.divider}/>
        <div className={styles.caret}/>

        <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
          {options.map((option, index) => (
              <li key={option.value}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={e => {
                    e.stopPropagation();
                    selectOption(option);
                    setIsOpen(false);
                  }}
                  className={`${styles.option} ${isOptionSelected(option)
                      ? styles.selected
                      : ''} ${index === highlightedIndex
                      ? styles.highlighted
                      : ''}`}>{option.label}</li>
          ))}
        </ul>
      </div>
  );
}