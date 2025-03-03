"use client";

import userActions from "@/app/actions/userActions";
import Button from "../Button/Button";
import styles from "./styles.module.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { User } from "@/models/user";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileModal = ({ isOpen, onClose }: EditProfileModalProps) => {
  const { data: session } = useSession();
  const [userDetails, setUserDetails] = useState<Partial<User>>({
    firstName: session?.user.firstName ?? "",
    lastName: session?.user.lastName ?? "",
    instagramUrl: session?.user.instagramUrl ?? "",
    facebookUrl: session?.user.facebookUrl ?? "",
    profilePicture: session?.user.image ?? "",
    phoneNumber: session?.user.phoneNumber ?? "",
  });

  useEffect(() => {
    if (session) {
      setUserDetails({
        firstName: session?.user.firstName ?? "",
        lastName: session?.user.lastName ?? "",
        instagramUrl: session?.user.instagramUrl ?? "",
        facebookUrl: session?.user.facebookUrl ?? "",
        profilePicture: session?.user.image ?? "",
        phoneNumber: session?.user.phoneNumber ?? "",
      });
    }
  }, [session]);

  const handleSave = async () => {
    if (session) await userActions.updateUser(session?.user.id, userDetails);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Edit Profile</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            defaultValue={userDetails.firstName}
            required
            onChange={(e) =>
              setUserDetails({ ...userDetails, firstName: e.target.value })
            }
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            defaultValue={userDetails.lastName}
            required
            onChange={(e) =>
              setUserDetails({ ...userDetails, lastName: e.target.value })
            }
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            defaultValue={userDetails.phoneNumber}
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit phone number"
            onChange={(e) =>
              setUserDetails({ ...userDetails, phoneNumber: e.target.value })
            }
          />
          <input
            type="url"
            name="instagram"
            placeholder="Instagram URL"
            defaultValue={userDetails.instagramUrl}
            onChange={(e) =>
              setUserDetails({ ...userDetails, instagramUrl: e.target.value })
            }
          />
          <input
            type="url"
            name="facebook"
            placeholder="Facebook URL"
            defaultValue={userDetails.facebookUrl}
            onChange={(e) =>
              setUserDetails({ ...userDetails, facebookUrl: e.target.value })
            }
          />

          <div className={styles.modalButtons}>
            <Button type="submit" fullWidth onClick={handleSave}>
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
