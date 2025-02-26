"use client";

import { signOut, useSession } from "next-auth/react";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import EditProfileModal from "../components/EditProfileModal";
import Avatar from "../components/Avatar";
import Button from "../components/Button/Button";

export interface UserProfile {
  firstName: string;
  lastName: string;
  instagram: string;
  facebook: string;
  image: string;
  phone: string;
}

const Profile = () => {
  const { data: session } = useSession();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    instagram: "",
    facebook: "",
    image: "",
    phone: "",
  });

  useEffect(() => {
    if (session?.user) {
      setUserProfile({
        firstName: session.user.name?.split(" ")[0] || "",
        lastName: session.user.name?.split(" ")[1] || "",
        instagram: "",
        facebook: "",
        image: session.user.image || "",
        phone: "",
      });
    }
  }, [session]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
    setIsEditModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <div className={styles.avatarContainer}>
          <Avatar
            src={userProfile.image}
            alt="Profile Avatar"
            size={120}
            className={styles.avatar}
          />
        </div>
        <h2 className={styles.userName}>
          {userProfile.firstName} {userProfile.lastName}
        </h2>
        {/* <div className={styles.socialButtons}>
          <button
            onClick={() => handleSocialMediaClick("instagram")}
            className={`${styles.socialButton} ${styles.instagramButton}`}
            disabled={!userProfile.instagram}
          >
            Instagram
          </button>
          <button
            onClick={() => handleSocialMediaClick("facebook")}
            className={`${styles.socialButton} ${styles.facebookButton}`}
            disabled={!userProfile.facebook}
          >
            Facebook
          </button>
        </div> */}
        {/* <button onClick={handleEditProfile} className={styles.editButton}>
          Edit Profile
        </button> */}
        {/* <Button fullWidth size="large" onClick={handleEditProfile}>
          Edit Profile
        </Button> */}

        <div className={styles.buttonContainer}>
          <Button fullWidth size="large" onClick={handleEditProfile}>
            Edit Profile
          </Button>

          <Button
            fullWidth
            size="large"
            variant="red"
            outline
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userProfile={userProfile}
        onUpdateProfile={handleUpdateProfile}
      />
    </div>
  );
};

export default Profile;
