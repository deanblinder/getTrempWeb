"use client";
import { useState } from "react";
import "./globals.css";
import Navigation from "@/app/components/Navigation/Navigation";
import styles from "./layout.module.css";
import MobileNavigation from "./components/Navigation/MobileNavigation";
import RegisterModal from "./components/RegisterModal";

// export const metadata: Metadata = {
//   title: "GetRide - Your Ride Sharing Platform",
//   description: "Find and share rides easily with GetRide",
// };

import { SessionProvider } from "next-auth/react";

const navItems = [
  { name: "Search", path: "/" },
  { name: "Add", path: "/add" },
  { name: "Rides", path: "/rides" },
  { name: "Profile", path: "/profile" },
  { name: "Settings", path: "/settings" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <html lang="en">
      <body>
        <SessionProvider>
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
      </body>
    </html>
  );
}
