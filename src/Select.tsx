import styles from "./Select.module.css";

type SelectOption = {
  label: string
  value: any
}

type SelectProps = {
  options: SelectOption[]
  value?: SelectOption
  onChange: (value: SelectOption | undefined) => void
}

export function Select({value, options, onChange}: SelectProps) {
  return (
    <div tabIndex={0} className={styles.container}>
      <span className={styles.value}>Ted</span>
      <div className={styles["clear-btn"]}>&times;</div>
      <div className={styles.divider}/>
      <div className={styles.caret}/>

      <ul className={`${styles.options} ${styles.show}`}>
        {options.map(option => (
          <li key={option.label} className={styles.option}>{option.label}</li>
        ))}
      </ul>
    </div>
  );
}