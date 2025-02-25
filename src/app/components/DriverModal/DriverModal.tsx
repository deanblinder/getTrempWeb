"use client";

import React from "react";
import Image from "next/image";
import styles from "./DriverModal.module.css";

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
            {driver.phone && (
              <div className={styles.infoItem}>
                <span className={styles.label}>📞 Phone</span>
                <a href={`tel:${driver.phone}`} className={styles.value}>
                  {driver.phone}
                </a>
              </div>
            )}

            {driver.whatsapp && (
              <div className={styles.infoItem}>
                <span className={styles.label}>💬 WhatsApp</span>
                <a
                  href={`https://wa.me/${driver.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.value}
                >
                  Message
                </a>
              </div>
            )}

            {driver.instagram && (
              <div className={styles.infoItem}>
                <span className={styles.label}>📸 Instagram</span>
                <a
                  href={driver.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.value}
                >
                  Profile
                </a>
              </div>
            )}

            {driver.facebook && (
              <div className={styles.infoItem}>
                <span className={styles.label}>👤 Facebook</span>
                <a
                  href={driver.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.value}
                >
                  Profile
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverModal;
