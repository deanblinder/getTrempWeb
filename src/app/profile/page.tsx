"use client";

import { signOut } from "next-auth/react";
import styles from "./page.module.css";

const Profile = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className={styles.container}>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
};
export default Profile;
