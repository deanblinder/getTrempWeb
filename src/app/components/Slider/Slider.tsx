"use client";

import React from "react";
import styles from "./styles.module.css";

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  className?: string;
  required?: boolean;
}

const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 1,
  max = 50,
  step = 1,
  label = "Distance",
  className,
  required = false,
}) => {
  return (
    <div className={`${styles.container} ${className || ""}`}>
      <div className={styles.labelContainer}>
        <label className={styles.label}>{label}</label>
        <span className={styles.value}>{value} km</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={styles.slider}
        required={required}
      />
    </div>
  );
};

export default Slider;
