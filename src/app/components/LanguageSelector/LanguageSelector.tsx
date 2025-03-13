"use client";

import { useRouter } from "next/navigation";
import styles from "./LanguageSelector.module.css";
import i18next from "i18next";

const LanguageSelector = () => {
  const router = useRouter();
  const currentLanguage = i18next.language;

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const language = event.target.value;
    i18next.changeLanguage(language);
    router.refresh();
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        {i18next.t("common:settings.language.title")}
      </h3>
      <select
        className={styles.select}
        value={currentLanguage}
        onChange={handleLanguageChange}
      >
        <option value="he">
          {" "}
          {i18next.t("common:settings.language.hebrew")}
        </option>
        <option value="en">
          {" "}
          {i18next.t("common:settings.language.english")}
        </option>
      </select>
    </div>
  );
};

export default LanguageSelector;
