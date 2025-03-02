"use client";

import { ChangeEvent } from "react";
import styles from "./DatePicker.module.css";

interface DatePickerProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
  style?: React.CSSProperties;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const DatePicker = ({
  value,
  onChange,
  className,
  required = false,
  style,
  inputProps,
}: DatePickerProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="date"
      placeholder="Select date"
      value={value}
      onChange={handleChange}
      className={`${styles.input} ${className || ""}`}
      required={required}
      min={new Date().toISOString().split("T")[0]}
      style={style}
      {...inputProps}
    />
  );
};

export default DatePicker;
