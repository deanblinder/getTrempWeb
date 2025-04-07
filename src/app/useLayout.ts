"use client";
import { useEffect, useState } from "react";
import i18n from "i18next";

export const useLayout = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [currentLang, setCurrentLang] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("currentLang") || "he";
    }
    return "he";
  });

  const [navItems, setNavItems] = useState([
    { name: i18n.t("common:navigation.search"), path: "/" },
    { name: i18n.t("common:navigation.add"), path: "/add" },
    { name: i18n.t("common:navigation.rides"), path: "/rides" },
    { name: i18n.t("common:navigation.profile"), path: "/profile" },
    { name: i18n.t("common:navigation.settings"), path: "/settings" },
    { name: i18n.t("common:navigation.about"), path: "/about" },
  ]);

  useEffect(() => {
    setCurrentLang(i18n.language);
    localStorage.setItem("currentLang", i18n.language);
    setNavItems([
      { name: i18n.t("common:navigation.search"), path: "/" },
      { name: i18n.t("common:navigation.add"), path: "/add" },
      { name: i18n.t("common:navigation.rides"), path: "/rides" },
      { name: i18n.t("common:navigation.profile"), path: "/profile" },
      { name: i18n.t("common:navigation.settings"), path: "/settings" },
      { name: i18n.t("common:navigation.about"), path: "/about" },
    ]);
  }, [i18n.language]);

  return {
    showRegisterModal,
    setShowRegisterModal,
    currentLang,
    navItems,
  };
};
