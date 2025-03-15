"use client";
import styles from "./RideCard.module.css";
import { useRouter } from "next/navigation";
import Avatar from "../Avatar";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Loader from "../Loader/Loader";
import { useUser } from "@/app/hooks/useUser";
import { Ride } from "@/models/rides";
import AvatarList from "../AvatarList/AvatarList";
import i18next from "i18next";

interface RideCardProps {
  ride: Ride;
  onAvatarClick?: (userId: string) => void;
}

const RideCard = ({ ride, onAvatarClick }: RideCardProps) => {
  const router = useRouter();
  const session = useSession();
  const [shouldShowAccepted] = useState(ride.passengers.accepted.length > 0);
  const [shouldShowRequests] = useState(ride.passengers.requests.length > 0);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser(ride.driver.id);

  const handleCardClick = () => {
    const isUserDriver = session?.data?.user?.id === ride.driver.id;
    setIsLoading(true);
    setTimeout(() => {}, 1000);
    if (isUserDriver) {
      router?.push(`/editRide/${ride._id}`);
    } else {
      router?.push(`/rideScreen/${ride._id}`);
    }
  };

  const isDriver = session?.data?.user?.id === ride.driver.id;

  return (
    <div className={styles.card}>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Loader />
        </div>
      )}

      <div className={styles.header} onClick={handleCardClick}>
        <div className={styles.avatarContainer}>
          <Avatar src={user?.profilePicture} alt="Driver's avatar" size={40} />
          <span className={styles.driverName}>
            {user?.firstName + " " + user?.lastName}
          </span>
        </div>
        <div className={styles.locations}>
          <div className={styles.location}>
            <span className={styles.label}>
              {i18next.t("common:ride-card.from")}
            </span>
            <span className={styles.locationText}>
              {ride.origin?.formatted_address || ""}
            </span>
          </div>
          <div className={styles.location}>
            <span className={styles.label}>
              {i18next.t("common:ride-card.to")}
            </span>
            <span className={styles.locationText}>
              {ride.destination?.formatted_address || ""}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.timeInfo}>
          <div className={styles.detail}>
            <span className={styles.label}>
              {i18next.t("common:ride-card.date")}
            </span>
            <span>{ride.rideTime.formattedData.date}</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.label}>
              {i18next.t("common:ride-card.time")}
            </span>
            <span>{ride.rideTime.formattedData.time}</span>
          </div>
        </div>
        {isDriver && shouldShowRequests && (
          <AvatarList
            title={i18next.t("common:ride-card.requests")}
            userIds={ride.passengers.requests.map((request) => request.userId)}
            rideId={ride._id}
            onAvatarClick={onAvatarClick}
          />
        )}
        {isDriver && shouldShowAccepted && (
          <AvatarList
            rideId={ride._id}
            title={i18next.t("common:ride-card.accepted")}
            userIds={ride.passengers.accepted.map(
              (accepted) => accepted.userId
            )}
            onAvatarClick={onAvatarClick}
          />
        )}
        <div className={styles.seats}>
          <span className={styles.label}>
            {i18next.t("common:ride-card.seats")}
          </span>
          <span className={styles.seatsNumber}>{ride.seats}</span>
        </div>
      </div>
    </div>
  );
};

export default RideCard;
