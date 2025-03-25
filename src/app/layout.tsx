"use client";
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
import { useLayout } from "./useLayout";
import Head from "next/head";

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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Get Ride" />
        <link rel="apple-touch-icon" href="/appIcon.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/appIcon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
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
