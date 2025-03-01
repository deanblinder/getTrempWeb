"use client";

import React from "react";
import styles from "./DriverModal.module.css";
import SocialButton from "../SocialButton/SocialButton";
import { useUser } from "@/app/hooks/useUser";
import Avatar from "../Avatar";

interface DriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  driverId: string;
}

const DriverModal: React.FC<DriverModalProps> = ({
  isOpen,
  onClose,
  driverId,
}) => {
  const { user: driver } = useUser(driverId);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.content}>
          <div className={styles.header}>
            <Avatar
              src={driver?.profilePicture}
              alt="Driver's avatar"
              size={100}
              className={styles.avatar}
            />
            <h2 className={styles.name}>
              {driver?.firstName + " " + driver?.lastName}
            </h2>
          </div>

          <div className={styles.info}>
            <SocialButton
              type="phone"
              onClick={() =>
                driver?.phoneNumber &&
                window.open(`tel:${driver.phoneNumber}`, "_blank")
              }
              disabled={!driver?.phoneNumber}
            >
              Phone
            </SocialButton>

            <SocialButton
              type="whatsapp"
              onClick={() =>
                driver?.phoneNumber &&
                window.open(`https://wa.me/${driver.phoneNumber}`, "_blank")
              }
              disabled={!driver?.phoneNumber}
            >
              WhatsApp
            </SocialButton>

            <SocialButton
              type="instagram"
              onClick={() => window.open(driver?.instagramUrl, "_blank")}
              disabled={!driver?.instagramUrl}
            >
              Instagram
            </SocialButton>

            <SocialButton
              type="facebook"
              onClick={() => window.open(driver?.facebookUrl, "_blank")}
              disabled={!driver?.facebookUrl}
            >
              Facebook
            </SocialButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverModal;
