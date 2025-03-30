"use client";

import LanguageSelector from "../components/LanguageSelector/LanguageSelector";
import { useRideRequests } from "../hooks/useRideRequests";
import styles from "./settings.module.css";
import i18next from "i18next";

const Settings = () => {
  useRideRequests();
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        {i18next.t("common:navigation.settings")}
      </h1>
      <LanguageSelector />
    </main>
  );
};

export default Settings;
