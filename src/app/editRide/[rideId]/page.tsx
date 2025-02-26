"use client";
import React, { useState } from "react";
import styles from "./editRide.module.css";
import Image from "next/image";
import GoogleMapWrapper from "@/app/components/GoogleMap/GoogleMapWrapper";
import AutocompleteInput from "@/app/components/AutocompleteInput/AutocompleteInput";
import { useRouter } from "next/navigation";

const EditRide = () => {
  const router = useRouter();
  // Example ride data - this would typically come from an API based on rideId
  const [rideData, setRideData] = useState({
    avatarImage: "/vercel.svg",
    driverName: "John Doe",
    origin: "Tel Aviv",
    destination: "Jerusalem",
    date: "2024-01-20",
    time: "14:00",
    numberOfSeats: 3,
  });

  const handleSave = () => {
    // Here you would typically make an API call to save the changes
    console.log("Saving changes:", rideData);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className={styles.container}>
      <div className={styles.rideDetails}>
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
            <AutocompleteInput
              placeholder="Origin"
              className={styles.locationInput}
              //   initialValue={rideData.origin}
              onPlaceSelected={(place) =>
                setRideData({
                  ...rideData,
                  origin:
                    place.geometry?.location?.lat() +
                    "," +
                    place.geometry?.location?.lng(),
                })
              }
            />
          </div>
          <div className={styles.locationItem}>
            <span className={styles.label}>To:</span>
            <AutocompleteInput
              placeholder="Destination"
              className={styles.locationInput}
              //   initialValue={rideData.destination}
              onPlaceSelected={(place) =>
                setRideData({
                  ...rideData,
                  destination:
                    place.geometry?.location?.lat() +
                    "," +
                    place.geometry?.location?.lng(),
                })
              }
            />
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Date:</span>
            <input
              type="date"
              value={rideData.date}
              onChange={(e) =>
                setRideData({ ...rideData, date: e.target.value })
              }
              className={styles.input}
            />
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Time:</span>
            <input
              type="time"
              value={rideData.time}
              onChange={(e) =>
                setRideData({ ...rideData, time: e.target.value })
              }
              className={styles.input}
            />
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Available Seats:</span>
            <input
              type="number"
              value={rideData.numberOfSeats}
              onChange={(e) =>
                setRideData({
                  ...rideData,
                  numberOfSeats: Math.max(
                    1,
                    Math.min(8, parseInt(e.target.value) || 1)
                  ),
                })
              }
              min="1"
              max="8"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
          <button className={styles.saveButton} onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>

      <div className={styles.mapContainer}>
        <GoogleMapWrapper />
      </div>
    </div>
  );
};

export default EditRide;
