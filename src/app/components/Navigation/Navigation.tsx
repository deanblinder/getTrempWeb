"use client";

import Link from "next/link";
import styles from "./Navigation.module.css";
import { NavigationItem } from "./MobileNavigation";
import { useSession } from "next-auth/react";
import i18next from "i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import notificationStyles from "./NotificationIndicator.module.css";
import Avatar from "../Avatar";
import { ANALYTICS_EVENTS, biEvent } from "@/utils/analytics";
import { useAnalytics } from "@/app/hooks/useAnalytics";

interface NavigationProps {
  navItems: NavigationItem[];
  onShowRegisterModal?: () => void;
}

const Navigation = ({ navItems, onShowRegisterModal }: NavigationProps) => {
  const { data: session } = useSession();
  useAnalytics();

  const shouldShowNotification = useSelector(
    (state: RootState) => state.notification.shouldShowNotification
  );

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    biEvent.track(ANALYTICS_EVENTS.NAVIGATION_PRESS, {path})
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
            <Link
              href="/profile"
              className={styles.avatarLink}
              onClick={(e) => handleNavClick(e, "/profile")}
            >
              <Avatar
                src={session?.user?.image}
                alt="User Avatar"
                size={32}
                className={styles.navAvatar}
              />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
