"use client";

import Button from "../Button/Button";
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
              phone: formData.get("phone") as string,
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

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            defaultValue={userProfile.phone}
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit phone number"
          />
          <div className={styles.modalButtons}>
            <Button type="submit" fullWidth>
              Save
            </Button>
            <Button
              type="button"
              size="large"
              variant="red"
              fullWidth
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
