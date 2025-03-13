"use client";

import userActions from "@/app/actions/userActions";
import Button from "../Button/Button";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { User } from "@/models/user";
import { useSessionUpdate } from "@/app/hooks/useSessionUpdate";
import { useSession } from "next-auth/react";
import { useUserRides } from "@/app/hooks/useUserRides";
import i18next from "i18next";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  description?: string;
}

const EditProfileModal = ({
  isOpen,
  onClose,
  description,
}: EditProfileModalProps) => {
  const { updateSessionData } = useSessionUpdate();
  const { data: session } = useSession();
  const { rides } = useUserRides();
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
    if (session) {
      await userActions.updateUser(session?.user.id, userDetails);
      await updateSessionData(userDetails);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>{i18next.t("common:profile.edit.modal.title")}</h3>
        {description && <h4>{description}</h4>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <input
            type="text"
            name="firstName"
            placeholder={i18next.t(
              "common:profile.edit.modal.first-name.placeholder"
            )}
            defaultValue={userDetails.firstName}
            required
            onChange={(e) =>
              setUserDetails({ ...userDetails, firstName: e.target.value })
            }
          />
          <input
            type="text"
            name="lastName"
            placeholder={i18next.t(
              "common:profile.edit.modal.last-name.placeholder"
            )}
            defaultValue={userDetails.lastName}
            required
            onChange={(e) =>
              setUserDetails({ ...userDetails, lastName: e.target.value })
            }
          />
          <input
            type="tel"
            name="phone"
            placeholder={i18next.t(
              "common:profile.edit.modal.phone.placeholder"
            )}
            defaultValue={userDetails.phoneNumber}
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit phone number"
            required={rides.length > 0}
            onChange={(e) =>
              setUserDetails({ ...userDetails, phoneNumber: e.target.value })
            }
          />
          <input
            type="url"
            name="instagram"
            placeholder={i18next.t(
              "common:profile.edit.modal.instegram.placeholder"
            )}
            defaultValue={userDetails.instagramUrl}
            onChange={(e) =>
              setUserDetails({ ...userDetails, instagramUrl: e.target.value })
            }
          />
          <input
            type="url"
            name="facebook"
            placeholder={i18next.t(
              "common:profile.edit.modal.facebook.placeholder"
            )}
            defaultValue={userDetails.facebookUrl}
            onChange={(e) =>
              setUserDetails({ ...userDetails, facebookUrl: e.target.value })
            }
          />

          <div className={styles.modalButtons}>
            <Button type="submit" fullWidth>
              {i18next.t("common:profile.edit.modal.save-button")}
            </Button>
            <Button
              type="button"
              size="large"
              variant="red"
              fullWidth
              onClick={onClose}
            >
              {i18next.t("common:profile.edit.modal.cancel-button")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
