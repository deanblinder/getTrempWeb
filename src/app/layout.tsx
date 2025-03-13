"use client";
import { useState } from "react";
import "./globals.css";
import Navigation from "@/app/components/Navigation/Navigation";
import styles from "./layout.module.css";
import MobileNavigation from "./components/Navigation/MobileNavigation";
import RegisterModal from "./components/RegisterModal";
import { SessionProvider } from "next-auth/react";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "@/locales/en/common.json";
import heTranslations from "@/locales/he/common.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { common: enTranslations },
    he: { common: heTranslations },
  },
  lng: "he",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

const navItems = [
  { name: i18n.t("common:navigation.search"), path: "/" },
  { name: i18n.t("common:navigation.add"), path: "/add" },
  { name: i18n.t("common:navigation.rides"), path: "/rides" },
  { name: i18n.t("common:navigation.profile"), path: "/profile" },
  { name: i18n.t("common:navigation.settings"), path: "/settings" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [currentLang] = useState("he");

  return (
    <html lang={currentLang} dir={currentLang === "he" ? "rtl" : "ltr"}>
      <body>
        <I18nextProvider i18n={i18n}>
          <SessionProvider refetchInterval={0} refetchOnWindowFocus={true}>
            <Navigation
              navItems={navItems}
              onShowRegisterModal={() => setShowRegisterModal(true)}
            />
            <RegisterModal
              isOpen={showRegisterModal}
              onClose={() => setShowRegisterModal(false)}
            />
            <div className={styles.mainContent}>{children}</div>
            <MobileNavigation
              navItems={navItems}
              onShowRegisterModal={() => setShowRegisterModal(true)}
            />
          </SessionProvider>
        </I18nextProvider>
      </body>
    </html>
  );
}
