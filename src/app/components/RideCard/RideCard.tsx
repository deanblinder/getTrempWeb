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
            <span className={styles.label}>From:</span>
            <span className={styles.locationText}>
              {ride.origin?.formatted_address || ""}
            </span>
          </div>
          <div className={styles.location}>
            <span className={styles.label}>To:</span>
            <span className={styles.locationText}>
              {ride.destination?.formatted_address || ""}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.timeInfo}>
          <div className={styles.detail}>
            <span className={styles.label}>Date:</span>
            <span>{ride.rideTime.formattedData.date}</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.label}>Time:</span>
            <span>{ride.rideTime.formattedData.time}</span>
          </div>
        </div>
        {shouldShowRequests && (
          <AvatarList
            title={"Requests"}
            userIds={ride.passengers.requests}
            rideId={ride._id}
            onAvatarClick={onAvatarClick}
          />
        )}
        {shouldShowAccepted && (
          <AvatarList
            title={"Accepted"}
            userIds={ride.passengers.accepted}
            rideId={ride._id}
            onAvatarClick={onAvatarClick}
          />
        )}
        <div className={styles.seats}>
          <span className={styles.label}>Available Seats:</span>
          <span className={styles.seatsNumber}>{ride.seats}</span>
        </div>
      </div>
    </div>
  );
};

export default RideCard;
