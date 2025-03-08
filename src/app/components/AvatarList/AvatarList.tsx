"use client";
import { useUser } from "@/app/hooks/useUser";
import Avatar from "../Avatar";
import styles from "./AvatarList.module.css";
import DriverModal from "../DriverModal/DriverModal";
import { useState } from "react";

interface AvatarListProps {
  userIds: string[];
  title: string;
  size?: number;
  maxDisplay?: number;
}

const AvatarList = ({ userIds, title, size = 32 }: AvatarListProps) => {
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [userId, setUserId] = useState("");

  return (
    <div className={styles.avatarList}>
      {title}
      {userIds.map((userId) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { user } = useUser(userId);

        return (
          <div key={userId} className={styles.avatarWrapper}>
            <Avatar
              src={user?.profilePicture}
              alt={`${user?.firstName || "User"}'s avatar`}
              size={size}
              onClick={() => {
                setUserId(userId);
                setShowDriverModal(true);
              }}
            />
          </div>
        );
      })}
      <DriverModal
        isOpen={showDriverModal}
        onClose={() => setShowDriverModal(false)}
        driverId={userId}
      />
    </div>
  );
};

export default AvatarList;
