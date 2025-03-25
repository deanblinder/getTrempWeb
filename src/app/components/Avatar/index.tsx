"use client";

import Image from "next/image";
import styles from "./styles.module.css";

interface AvatarProps {
  src?: string | null;
  alt: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const Avatar = ({ src, alt, size = 120, className, onClick }: AvatarProps) => {
  return (
    <div className={`${styles.avatarContainer} ${className || ""}`}>
      <Image
        src={src || "/placeholderAvater.gif"}
        alt={alt}
        width={size}
        height={size}
        className={styles.avatar}
        onClick={onClick}
      />
    </div>
  );
};

export default Avatar;
