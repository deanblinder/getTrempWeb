"use client";
import React from "react";
import styles from "./rideScreen.module.css";
import GoogleMapWrapper from "@/app/components/GoogleMap/GoogleMapWrapper";
import DriverModal from "@/app/components/DriverModal/DriverModal";
import Avatar from "@/app/components/Avatar";
import Button from "@/app/components/Button/Button";
import { useRideScreen } from "./useRideScreen";
import Loader from "@/app/components/Loader/Loader";

const RideScreen = () => {
  const {
    showDriverModal,
    setShowDriverModal,
    rideData,
    driver,
    handleClick,
    isLoading,
    buttonContent,
  } = useRideScreen();
  return (
    <div className={styles.container}>
      <div className={styles.rideDetails}>
        <div onClick={() => setShowDriverModal(true)}>
          <div className={styles.header}>
            <div className={styles.driverInfo}>
              <Avatar
                src={driver?.profilePicture}
                alt="Driver's avatar"
                size={60}
              />
              <span className={styles.driverName}>
                {driver?.firstName + " " + driver?.lastName}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.locations}>
          <div className={styles.locationItem}>
            <span className={styles.label}>From:</span>
            <span className={styles.locationText}>
              {rideData?.origin?.formatted_address}
            </span>
          </div>
          <div className={styles.locationItem}>
            <span className={styles.label}>To:</span>
            <span className={styles.locationText}>
              {rideData?.destination?.formatted_address}
            </span>
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.label}>Date:</span>
            <span>{rideData?.rideTime.formattedData.date}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Time:</span>
            <span>{rideData?.rideTime.formattedData.time}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.label}>Available Seats:</span>
            <span>{rideData?.seats}</span>
          </div>
        </div>
        <div className={styles.buttons}>
          <Button
            fullWidth
            size="large"
            onClick={() => setShowDriverModal(true)}
            variant="green"
          >
            {"Connect Driver"}
          </Button>
          <Button fullWidth size="large" onClick={handleClick}>
            {isLoading ? <Loader /> : buttonContent}
          </Button>
        </div>
      </div>
      <div className={styles.mapContainer}>
        <div className={styles.mapPlaceholder}>
          <GoogleMapWrapper
            origin={rideData?.origin}
            destination={rideData?.destination}
            showRoute
            selectedRouteIndex={0}
            showRouteButton={false}
          />
        </div>
      </div>
      {rideData && (
        <DriverModal
          isOpen={showDriverModal}
          onClose={() => setShowDriverModal(false)}
          driverId={rideData?.driver?.id}
        />
      )}
    </div>
  );
};

export default RideScreen;
