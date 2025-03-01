"use client";
import styles from "./RideCard.module.css";
import { useRouter } from "next/navigation";
import Avatar from "../Avatar";

interface RideCardProps {
  avatarImage?: string;
  driverName?: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  numberOfSeats: number;
  rideId: string;
}

const RideCard = ({
  avatarImage,
  driverName,
  origin,
  destination,
  date,
  time,
  numberOfSeats,
  rideId,
}: RideCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    if (true) {
      return router?.push(`/rideScreen/${rideId}`);
    } else {
      return router?.push(`/editRide/${rideId}`);
    }
  };
  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.header}>
        <div className={styles.avatarContainer}>
          <Avatar src={avatarImage} alt="Driver's avatar" size={40} />
          <span className={styles.driverName}>{driverName}</span>
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
