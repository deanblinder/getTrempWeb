"use client";

import { signOut, useSession } from "next-auth/react";
import styles from "./page.module.css";
import { useState } from "react";
import EditProfileModal from "../components/EditProfileModal";
import Avatar from "../components/Avatar";
import Button from "../components/Button/Button";
import i18next from "i18next";
import { capitalize } from "lodash";
import { useRideRequests } from "../hooks/useRideRequests";
import ErrorScreen from "../components/ErrorScreen/ErrorScreen";

const Profile = () => {
  const { data: session } = useSession();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useRideRequests();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  if (!session?.user) return <ErrorScreen />;

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <div className={styles.avatarContainer}>
          <Avatar
            src={session?.user?.image ?? undefined}
            alt="Profile Avatar"
            size={120}
            className={styles.avatar}
          />
        </div>
        <h2 className={styles.userName}>
          {capitalize(session?.user.firstName)}{" "}
          {capitalize(session?.user.lastName)}
        </h2>
        <div className={styles.buttonContainer}>
          <Button fullWidth size="large" onClick={handleEditProfile}>
            {i18next.t("common:profile.edit-button")}
          </Button>

          <Button
            fullWidth
            size="large"
            variant="red"
            outline
            onClick={handleLogout}
          >
            {i18next.t("common:profile.logout-button")}
          </Button>
        </div>
      </div>
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};

export default Profile;
