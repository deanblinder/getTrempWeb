"use client";

import { useCallback, useState } from "react";
import styles from "./styles.module.css";
import GoogleLoginButton from "../googleLoginButton/GoogleLoginButton";
import i18next from "i18next";
import { signIn } from "next-auth/react";
import { biEvent, ANALYTICS_EVENTS } from "../../../utils/analytics";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectUrl?: string;
}

const RegisterModal = ({
  isOpen,
  onClose,
  redirectUrl,
}: RegisterModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    biEvent.track(ANALYTICS_EVENTS.GOOGLE_SIGNUP_CLICKED);
    setIsLoading(true);
    await signIn("google", { callbackUrl: redirectUrl || "/" });
    setIsLoading(false);
  };

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
          <h2 className={styles.title}>{i18next.t("common:register.title")}</h2>
          <p className={styles.description}>
            {i18next.t("common:register.subtitle")}
          </p>
          <GoogleLoginButton
            isLoading={isLoading}
            onClick={handleGoogleLogin}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
