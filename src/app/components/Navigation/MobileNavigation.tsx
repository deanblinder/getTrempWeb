"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./MobileNavigation.module.css";
import { useSession } from "next-auth/react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useTranslation } from "react-i18next";

export interface NavigationItem {
  name: string;
  path: string;
  icon?: string;
}

interface MobileNavigationProps {
  navItems: NavigationItem[];
  onShowRegisterModal?: () => void;
}

const MobileNavigation = ({
  navItems,
  onShowRegisterModal,
}: MobileNavigationProps) => {
  const { data: session } = useSession();
  const { t } = useTranslation("common");

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ): void => {
    if (!session && path !== "/") {
      e.preventDefault();
      onShowRegisterModal?.();
    }
    setIsMobileMenuOpen(false);
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsMobileMenuOpen(false);
    }
  };

  const mobileTabItems = [
    { name: t("navigation.search"), path: "/", icon: <SearchIcon /> },
    { name: t("navigation.add"), path: "/add", icon: <AddIcon /> },
    { name: t("navigation.rides"), path: "/rides", icon: <DirectionsCarIcon /> },
  ];

  return (
    <div className={styles.mobileNav}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <Link href="/" className={styles.logo}>
          GetTremp
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={styles.menuButton}
        >
          <div className={styles.menuIcon}></div>
          <div className={styles.menuIcon}></div>
          <div className={styles.menuIcon}></div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.overlay} onClick={handleClickOutside}>
          <div className={`${styles.mobileMenu} ${styles.open}`}>
            <div className={styles.menuLinks}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                  className={styles.menuLink}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Tabs */}
      <div className={styles.bottomTabs}>
        <div className={styles.tabsGrid}>
          {mobileTabItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={(e) => handleNavClick(e, item.path)}
              className={styles.tabLink}
            >
              <span className={styles.tabIcon}>{item.icon}</span>
              <span className={styles.tabLabel}>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
