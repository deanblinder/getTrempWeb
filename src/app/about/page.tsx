"use client";

import { useTranslation } from "react-i18next";
import styles from "./page.module.css";

const AboutPage = () => {
  const { t } = useTranslation("common");


  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("about.title")}</h1>
      <div className={styles.content}>
        <section className={styles.section}>
          <h2>{t("about.mission.title")}</h2>
          <p>{t("about.mission.description")}</p>
        </section>

        <section className={styles.section}>
          <h2>{t("about.social.title")}</h2>
          <p>{t("about.social.description")}</p>
        </section>

        <section className={styles.section}>
          <h2>{t("about.contact.title")}</h2>
          <p>{t("about.contact.description1")}</p>
          <p>{t("about.contact.description2")}</p>
          <a href="mailto:dean.blinder@gmail.com" className={styles.email}>
            deanblinder91@gmail.com
          </a>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
