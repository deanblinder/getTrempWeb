"use client";

import { ChangeEvent } from "react";
import styles from "./TimePicker.module.css";
import useDevice from "@/app/hooks/useDevice";

interface TimePickerProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  required?: boolean;
  style?: React.CSSProperties;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const TimePicker = ({
  value,
  onChange,
  className,
  required = false,
  style,
  inputProps,
}: TimePickerProps) => {
  const { isMobile } = useDevice();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      {isMobile && <label htmlFor="time">Time:</label>}
      <input
        type="time"
        placeholder="Select Time"
        value={value}
        onChange={handleChange}
        className={`${styles.input} ${className || ""}`}
        required={required}
        min={new Date().toISOString().slice(11, 16)}
        style={style}
        {...inputProps}
      />
    </div>
  );
};

export default TimePicker;
