import { useState } from "react";
import RegisterModal from "../RegisterModal";
import styles from "./styles.module.css";
import i18next from "i18next";

export default function ErrorScreen() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLogin = () => {
    setShowRegisterModal(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          {i18next.t("common:error.screen.title")}
        </h1>
        <p className={styles.message}>
          {i18next.t("common:error.screen.description")}
        </p>
        <button onClick={handleLogin} className={styles.loginButton}>
          {i18next.t("common:error.screen.login-button")}
        </button>

        <RegisterModal
          isOpen={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
        />
      </div>
    </div>
  );
}
