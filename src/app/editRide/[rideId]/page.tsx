"use client";
import React from "react";
import styles from "./editRide.module.css";
import GoogleMapWrapper from "@/app/components/GoogleMap/GoogleMapWrapper";
import AutocompleteInput from "@/app/components/AutocompleteInput/AutocompleteInput";
import { useParams } from "next/navigation";
import TimePicker from "@/app/components/TimePicker/TimePicker";
import DatePicker from "@/app/components/DatePicker/DatePicker";
import Avatar from "@/app/components/Avatar";
import SeatsInput from "@/app/components/SeatsInput/SeatsInput";
import { useEditRide } from "./useEditRide";

const EditRide = () => {
  const params = useParams();
  const rideId = params.rideId as string;

  const {
    ride,
    setDestination,
    setOrigin,
    updateDate,
    updateTime,
    updateSeats,
    updateSelectedRouteIndex,
    handleSave,
    handleCancel,
    handleDelete,
    session,
  } = useEditRide(rideId);

  return (
    <div className={styles.container}>
      <div className={styles.rideDetails}>
        <div className={styles.header}>
          <div>
            <button className={styles.closeButton} onClick={handleCancel}>
              ✕
            </button>
            <div className={styles.driverInfo}>
              <Avatar
                src={session?.user.profilePicture}
                alt="Driver's avatar"
                size={60}
                className={styles.avatar}
              />
              <span className={styles.driverName}>
                {session?.user.firstName} {session?.user?.lastName}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.locations}>
          <div className={styles.locationItem}>
            <span className={styles.label}>From:</span>
            <AutocompleteInput
              initialValue={ride?.origin}
              placeholder="Origin"
              className={styles.locationInput}
              onPlaceSelected={setOrigin}
            />
          </div>
          <div className={styles.locationItem}>
            <span className={styles.label}>To:</span>
            <AutocompleteInput
              placeholder="Destination"
              className={styles.locationInput}
              initialValue={ride?.destination}
              onPlaceSelected={setDestination}
            />
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Date:</span>
            <DatePicker
              value={ride?.rideTime?.formattedData?.date}
              onChange={updateDate}
              required
            />
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Time:</span>
            <TimePicker
              value={ride?.rideTime?.formattedData?.time}
              onChange={updateTime}
            />
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Available Seats:</span>
            <SeatsInput
              value={ride?.seats}
              onChange={updateSeats}
              showTitle={false}
              required
            />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={handleDelete}>
            Delete Ride
          </button>
          <button className={styles.saveButton} onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>

      <div className={styles.mapContainer}>
        <GoogleMapWrapper
          origin={ride?.origin}
          destination={ride?.destination}
          showRoute={true}
          selectedRouteIndex={ride?.selectedRouteIndex}
          onRouteChange={updateSelectedRouteIndex}
          showRouteButton={true}
        />
      </div>
    </div>
  );
};

export default EditRide;
