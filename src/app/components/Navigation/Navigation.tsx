"use client";

import Link from "next/link";
import styles from "./Navigation.module.css";
import { NavigationItem } from "./MobileNavigation";
import { useSession } from "next-auth/react";
import i18next from "i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import notificationStyles from "./NotificationIndicator.module.css";

interface NavigationProps {
  navItems: NavigationItem[];
  onShowRegisterModal?: () => void;
}

const Navigation = ({ navItems, onShowRegisterModal }: NavigationProps) => {
  const { data: session } = useSession();
  const shouldShowNotification = useSelector(
    (state: RootState) => state.notification.shouldShowNotification
  );

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
                style={{ position: "relative" }}
              >
                {item.name}
                {shouldShowNotification && item.path === "/rides" && (
                  <div className={notificationStyles.notificationIndicator} />
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
