"use client";

import Link from "next/link";
import styles from "./Navigation.module.css";
import { NavigationItem } from "./MobileNavigation";
import { useSession } from "next-auth/react";
import i18next from "i18next";

interface NavigationProps {
  navItems: NavigationItem[];
  onShowRegisterModal?: () => void;
}

const Navigation = ({ navItems, onShowRegisterModal }: NavigationProps) => {
  const { data: session } = useSession();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    if (!session && path !== "/") {
      e.preventDefault();
      onShowRegisterModal?.();
    }
  };

  return (
    <>
      <nav className={styles.desktopNav}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            {i18next.t("common:app.name")}
          </Link>
          <div className={styles.navLinks}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={styles.navLink}
                onClick={(e) => handleNavClick(e, item.path)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
