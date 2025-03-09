"use client";
import { useUser } from "@/app/hooks/useUser";
import Avatar from "../Avatar";
import styles from "./AvatarList.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import DriverModalContent from "../DriverModalContent";

interface AvatarListProps {
  userIds: string[];
  title: string;
  size?: number;
  maxDisplay?: number;
  rideId: string;
}

const AvatarList = ({ userIds, title, size = 32, rideId }: AvatarListProps) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

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
                setSelectedUserId(userId);
                setIsModalOpen(true);
              }}
            />
          </div>
        );
      })}
      {selectedUserId && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          title={"User Profile"}
          subtitle="Contact Information"
          content={
            <DriverModalContent
              userId={selectedUserId}
              rideId={rideId}
              isOwner
            />
          }
        />
      )}
    </div>
  );
};

export default AvatarList;
