"use client";

import { useCallback } from "react";
import styles from "./styles.module.css";
import GoogleLoginButton from "../googleLoginButton/GoogleLoginButton";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal = ({ isOpen, onClose }: RegisterModalProps) => {
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.content}>
          <h2 className={styles.title}>Register</h2>
          <p className={styles.description}>
            Join GetRide to start sharing and finding rides!
          </p>
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
