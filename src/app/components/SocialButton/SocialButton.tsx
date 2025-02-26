"use client";

import React from "react";
import styles from "./SocialButton.module.css";

export type SocialButtonType = "phone" | "whatsapp" | "instagram" | "facebook";

interface SocialButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  type: SocialButtonType;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  type,
  disabled = false,
  onClick,
  children,
  className,
  ...props
}) => {
  const buttonClasses = [
    styles.socialButton,
    styles[`${type}Button`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default SocialButton;
