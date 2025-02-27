"use client";
import React, { useState } from "react";
import styles from "./editRide.module.css";
import GoogleMapWrapper from "@/app/components/GoogleMap/GoogleMapWrapper";
import AutocompleteInput from "@/app/components/AutocompleteInput/AutocompleteInput";
import { useRouter } from "next/navigation";
import TimePicker from "@/app/components/TimePicker/TimePicker";
import DatePicker from "@/app/components/DatePicker/DatePicker";
import Avatar from "@/app/components/Avatar";
import SeatsInput from "@/app/components/SeatsInput/SeatsInput";

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
            <Avatar
              src={rideData.avatarImage}
              alt="Driver's avatar"
              size={60}
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
            <DatePicker
              value={rideData.date}
              onChange={(date) => setRideData({ ...rideData, date })}
              required
            />
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Time:</span>
            <TimePicker
              value={rideData.time}
              onChange={(time) => setRideData({ ...rideData, time })}
            />
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Available Seats:</span>
            <SeatsInput
              value={rideData.numberOfSeats}
              onChange={(numberOfSeats) =>
                setRideData({ ...rideData, numberOfSeats })
              }
              showTitle={false}
              required
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
