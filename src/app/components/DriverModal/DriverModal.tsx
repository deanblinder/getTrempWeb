"use client";

import React from "react";
import Image from "next/image";
import styles from "./DriverModal.module.css";
import SocialButton from "../SocialButton/SocialButton";

interface DriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: {
    avatarImage: string;
    name: string;
    phone?: string;
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
}

const DriverModal: React.FC<DriverModalProps> = ({
  isOpen,
  onClose,
  driver,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={styles.content}>
          <div className={styles.header}>
            <Image
              src={driver.avatarImage}
              alt="Driver's avatar"
              width={100}
              height={100}
              className={styles.avatar}
            />
            <h2 className={styles.name}>{driver.name}</h2>
          </div>

          <div className={styles.info}>
            <SocialButton
              type="phone"
              onClick={() =>
                driver.phone && window.open(`tel:${driver.phone}`, "_blank")
              }
              disabled={!driver.phone}
            >
              Phone
            </SocialButton>

            <SocialButton
              type="whatsapp"
              onClick={() =>
                driver.whatsapp &&
                window.open(`https://wa.me/${driver.whatsapp}`, "_blank")
              }
              disabled={!driver.whatsapp}
            >
              WhatsApp
            </SocialButton>

            <SocialButton
              type="instagram"
              onClick={() => window.open(driver.instagram, "_blank")}
              disabled={!driver.instagram}
            >
              Instagram
            </SocialButton>

            <SocialButton
              type="facebook"
              onClick={() => window.open(driver.facebook, "_blank")}
              disabled={!driver.facebook}
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
