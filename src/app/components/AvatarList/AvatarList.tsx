"use client";
import { useUser } from "@/app/hooks/useUser";
import Avatar from "../Avatar";
import styles from "./AvatarList.module.css";

interface AvatarListProps {
  userIds: string[];
  title: string;
  size?: number;
  maxDisplay?: number;
  rideId: string;
  onAvatarClick?: (userId: string) => void;
}

const AvatarList = ({
  userIds,
  title,
  size = 32,
  onAvatarClick,
}: AvatarListProps) => {
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
                onAvatarClick?.(userId);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AvatarList;
