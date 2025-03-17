"use client";
import "./globals.css";
import Navigation from "@/app/components/Navigation/Navigation";
import styles from "./layout.module.css";
import MobileNavigation from "./components/Navigation/MobileNavigation";
import RegisterModal from "./components/RegisterModal";
import { SessionProvider } from "next-auth/react";
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import ReduxProvider from "./store/reduxProvider";
import { initReactI18next } from "react-i18next";
import enTranslations from "@/locales/en/common.json";
import heTranslations from "@/locales/he/common.json";
import { useLayout } from "./useLayout";

const storedLang =
  typeof window !== "undefined"
    ? localStorage.getItem("currentLang") || "he"
    : "he";

i18n.use(initReactI18next).init({
  resources: {
    en: { common: enTranslations },
    he: { common: heTranslations },
  },
  lng: storedLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showRegisterModal, setShowRegisterModal, currentLang, navItems } =
    useLayout();

  return (
    <html lang={currentLang} dir={currentLang === "he" ? "rtl" : "ltr"}>
      <body>
        <I18nextProvider i18n={i18n}>
          <ReduxProvider>
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
          </ReduxProvider>
        </I18nextProvider>
      </body>
    </html>
  );
}
