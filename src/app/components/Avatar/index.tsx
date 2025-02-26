"use client";

import Image from "next/image";
import styles from "./styles.module.css";

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

const Avatar = ({ src, alt, size = 120, className }: AvatarProps) => {
  return (
    <div className={`${styles.avatarContainer} ${className || ""}`}>
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={styles.avatar}
      />
    </div>
  );
};

export default Avatar;
