"use client";

import styles from "./styles.module.css";
import { UserProfile } from "@/app/profile/page";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateProfile: (updatedProfile: UserProfile) => void;
}

const EditProfileModal = ({
  isOpen,
  onClose,
  userProfile,
  onUpdateProfile,
}: EditProfileModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Edit Profile</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            onUpdateProfile({
              firstName: formData.get("firstName") as string,
              lastName: formData.get("lastName") as string,
              instagram: formData.get("instagram") as string,
              facebook: formData.get("facebook") as string,
              image: userProfile.image,
            });
          }}
        >
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            defaultValue={userProfile.firstName}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            defaultValue={userProfile.lastName}
            required
          />
          <input
            type="url"
            name="instagram"
            placeholder="Instagram URL"
            defaultValue={userProfile.instagram}
          />
          <input
            type="url"
            name="facebook"
            placeholder="Facebook URL"
            defaultValue={userProfile.facebook}
          />
          <div className={styles.modalButtons}>
            <button type="submit" className={styles.saveButton}>
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
