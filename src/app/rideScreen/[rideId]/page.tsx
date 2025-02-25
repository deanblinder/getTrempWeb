"use client";
import React, { useState } from "react";
import styles from "./rideScreen.module.css";
import Image from "next/image";
import GoogleMapWrapper from "@/app/components/GoogleMap/GoogleMapWrapper";
import DriverModal from "@/app/components/DriverModal/DriverModal";

const RideScreen = () => {
  const [showDriverModal, setShowDriverModal] = useState(false);
  // const params = useParams();
  // const rideId = params.rideId;

  // Example ride data - this would typically come from an API
  const rideData = {
    avatarImage: "/vercel.svg",
    driverName: "John Doe",
    origin: "Tel Aviv",
    destination: "Jerusalem",
    date: "2024-01-20",
    time: "14:00",
    numberOfSeats: 3,
  };

  return (
    <div className={styles.container}>
      <div className={styles.rideDetails}>
        <div onClick={() => setShowDriverModal(true)}>
          <div className={styles.header}>
            <div className={styles.driverInfo}>
              <Image
                src={rideData.avatarImage}
                alt="Driver's avatar"
                width={60}
                height={60}
                className={styles.avatar}
              />
              <span className={styles.driverName}>{rideData.driverName}</span>
            </div>
          </div>

          <div className={styles.locations}>
            <div className={styles.locationItem}>
              <span className={styles.label}>From:</span>
              <span className={styles.locationText}>{rideData.origin}</span>
            </div>
            <div className={styles.locationItem}>
              <span className={styles.label}>To:</span>
              <span className={styles.locationText}>
                {rideData.destination}
              </span>
            </div>
          </div>

          <div className={styles.details}>
            <div className={styles.detailItem}>
              <span className={styles.label}>Date:</span>
              <span>{rideData.date}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Time:</span>
              <span>{rideData.time}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Available Seats:</span>
              <span>{rideData.numberOfSeats}</span>
            </div>
          </div>
        </div>
        <button className={styles.joinButton}>Request To Join</button>
      </div>

      <div className={styles.mapContainer}>
        {/* Map component will be added here */}
        <div className={styles.mapPlaceholder}>
          <GoogleMapWrapper></GoogleMapWrapper>
        </div>
      </div>
      <DriverModal
        isOpen={showDriverModal}
        onClose={() => setShowDriverModal(false)}
        // need to removedriverProp
        driver={{
          avatarImage: rideData.avatarImage,
          name: rideData.driverName,
          phone: "0501234567",
          instagram: "asd",
          facebook: "asd",
          whatsapp: "asd",
        }}
      />
    </div>
  );
};

export default RideScreen;
