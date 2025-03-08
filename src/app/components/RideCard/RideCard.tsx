"use client";
import styles from "./RideCard.module.css";
import { useRouter } from "next/navigation";
import Avatar from "../Avatar";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Loader from "../Loader/Loader";
import { useUser } from "@/app/hooks/useUser";

interface RideCardProps {
  driver: {
    firstName: string;
    lastName: string;
    id: string;
  };
  origin: string;
  destination: string;
  date: string;
  time: string;
  numberOfSeats: number;
  rideId: string;
}

const RideCard = ({
  driver,
  origin,
  destination,
  date,
  time,
  numberOfSeats,
  rideId,
}: RideCardProps) => {
  const router = useRouter();
  const session = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser(driver.id);

  const handleCardClick = () => {
    const isUserDriver = session?.data?.user?.id === driver?.id;
    setIsLoading(true);
    setTimeout(() => {}, 1000);
    if (isUserDriver) {
      router?.push(`/editRide/${rideId}`);
    } else {
      router?.push(`/rideScreen/${rideId}`);
    }
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
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

      <div className={styles.header}>
        <div className={styles.avatarContainer}>
          <Avatar src={user?.profilePicture} alt="Driver's avatar" size={40} />
          <span className={styles.driverName}>
            {user?.firstName + " " + user?.lastName}
          </span>
        </div>
        <div className={styles.locations}>
          <div className={styles.location}>
            <span className={styles.label}>From:</span>
            <span className={styles.locationText}>{origin}</span>
          </div>
          <div className={styles.location}>
            <span className={styles.label}>To:</span>
            <span className={styles.locationText}>{destination}</span>
          </div>
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.timeInfo}>
          <div className={styles.detail}>
            <span className={styles.label}>Date:</span>
            <span>{date}</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.label}>Time:</span>
            <span>{time}</span>
          </div>
        </div>
        <div className={styles.seats}>
          <span className={styles.label}>Available Seats:</span>
          <span className={styles.seatsNumber}>{numberOfSeats}</span>
        </div>
      </div>
    </div>
  );
};

export default RideCard;
