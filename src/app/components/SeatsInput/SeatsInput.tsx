"use client";

import styles from "./styles.module.css";

interface SeatsInputProps {
  value?: number;
  onChange: (value: number) => void;
  required?: boolean;
  className?: string;
  showTitle?: boolean;
}

const SeatsInput = ({
  value = 0,
  onChange,
  required,
  className,
  showTitle = true,
}: SeatsInputProps) => {
  const handleIncrement = () => {
    onChange(Math.min(8, value + 1));
  };

  const handleDecrement = () => {
    onChange(Math.max(1, value - 1));
  };

  return (
    <div className={`${styles.container} ${className || ""}`}>
      {showTitle && (
        <label htmlFor="seats" className={styles.label}>
          Available Seats:
        </label>
      )}
      <div className={styles.inputContainer}>
        <button
          onClick={handleDecrement}
          className={styles.button}
          type="button"
        >
          -
        </button>
        <input
          id="seats"
          value={value}
          className={styles.input}
          min="1"
          max="8"
          required={required}
        />
        <button
          onClick={handleIncrement}
          className={styles.button}
          type="button"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SeatsInput;
