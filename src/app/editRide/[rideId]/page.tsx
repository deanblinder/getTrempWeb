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
import i18next from "i18next";
import GoogleMapsProvider from "@/app/components/GoogleMapsProvider/GoogleMapsProvider";
import { capitalize } from "lodash";
import ErrorScreen from "@/app/components/ErrorScreen/ErrorScreen";

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

  if (!session?.user) return <ErrorScreen />;

  return (
    <GoogleMapsProvider>
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
                  {capitalize(session?.user.firstName)}{" "}
                  {capitalize(session?.user?.lastName)}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.locations}>
            <div className={styles.locationItem}>
              <span className={styles.label}>
                {i18next.t("common:edit-ride-screen.from")}
              </span>
              <AutocompleteInput
                initialValue={ride?.origin}
                placeholder={i18next.t(
                  "common:edit-ride-screen.origin.placeholder"
                )}
                className={styles.locationInput}
                onPlaceSelected={setOrigin}
              />
            </div>
            <div className={styles.locationItem}>
              <span className={styles.label}>
                {i18next.t("common:ride-card.to")}
              </span>
              <AutocompleteInput
                placeholder={i18next.t(
                  "common:edit-ride-screen.destination.placeholder"
                )}
                className={styles.locationInput}
                initialValue={ride?.destination}
                onPlaceSelected={setDestination}
              />
            </div>
          </div>

          <div className={styles.details}>
            <div className={styles.detailItem}>
              <span className={styles.label}>
                {i18next.t("common:edit-ride-screen.date")}
              </span>
              <DatePicker
                value={ride?.rideTime?.formattedData?.date}
                onChange={updateDate}
                required
              />
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>
                {i18next.t("common:edit-ride-screen.time")}
              </span>
              <TimePicker
                value={ride?.rideTime?.formattedData?.time}
                onChange={updateTime}
              />
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>
                {i18next.t("common:edit-ride-screen.seats")}
              </span>
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
              {i18next.t("common:edit-ride-screen.delete-ride.button")}
            </button>
            <button className={styles.saveButton} onClick={handleSave}>
              {i18next.t("common:edit-ride-screen.save-ride.button")}
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
    </GoogleMapsProvider>
  );
};

export default EditRide;
