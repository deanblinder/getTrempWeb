'use client';

import Image from 'next/image';
import styles from './RideCard.module.css';

interface RideCardProps {
  avatarImage: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  numberOfSeats: number;
}

const RideCard = ({
  avatarImage,
  origin,
  destination,
  date,
  time,
  numberOfSeats,
}: RideCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatarContainer}>
          <Image
            src={avatarImage}
            alt="Driver's avatar"
            width={40}
            height={40}
            className={styles.avatar}
          />
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