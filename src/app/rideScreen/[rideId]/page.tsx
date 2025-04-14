"use client";
import React from "react";
import styles from "./rideScreen.module.css";
import GoogleMapWrapper from "@/app/components/GoogleMap/GoogleMapWrapper";
import Avatar from "@/app/components/Avatar";
import Button from "@/app/components/Button/Button";
import { useRideScreen } from "./useRideScreen";
import Loader from "@/app/components/Loader/Loader";
import DriverModalContent from "@/app/components/DriverModalContent";
import Modal from "@/app/components/Modal/Modal";
import i18next from "i18next";
import GoogleMapsProvider from "@/app/components/GoogleMapsProvider/GoogleMapsProvider";
import { capitalize } from "lodash";
import EditProfileModal from "@/app/components/EditProfileModal";

const RideScreen = () => {
  const {
    showDriverModal,
    setShowDriverModal,
    rideData,
    driver,
    handleRideRequest,
    isLoading,
    buttonContent,
    session,
    isEditProfileModalOpen,
    setIsEditProfileModalOpen,
  } = useRideScreen();

  return (
    <GoogleMapsProvider>
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
                  {capitalize(driver?.firstName) +
                    " " +
                    capitalize(driver?.lastName)}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.locations}>
            <div className={styles.locationItem}>
              <span className={styles.label}>
                {" "}
                {i18next.t("common:ride-screen.from")}
              </span>
              <span className={styles.locationText}>
                {rideData?.origin?.formatted_address}
              </span>
            </div>
            <div className={styles.locationItem}>
              <span className={styles.label}>
                {i18next.t("common:ride-screen.to")}
              </span>
              <span className={styles.locationText}>
                {rideData?.destination?.formatted_address}
              </span>
            </div>
          </div>

          <div className={styles.details}>
            <div className={styles.detailItem}>
              <span className={styles.label}>
                {i18next.t("common:ride-screen.date")}
              </span>
              <span>{rideData?.rideTime.formattedData.date}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>
                {i18next.t("common:ride-screen.time")}
              </span>
              <span>{rideData?.rideTime.formattedData.time}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>
                {i18next.t("common:ride-screen.seats")}
              </span>
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
              {i18next.t("common:ride-screen.connect-driver.button")}
            </Button>
            <Button fullWidth size="large" onClick={handleRideRequest}>
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
          <Modal
            isOpen={showDriverModal}
            onClose={() => setShowDriverModal(false)}
            title={"User Profile"}
            subtitle="Contact Information"
            content={
              <DriverModalContent
                userId={rideData.driver.id}
                rideId={rideData?._id}
                isOwner={session?.user.id === rideData.driver.id}
              />
            }
          />
        )}
      </div>
      <EditProfileModal 
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)} 
        description={i18next.t("common:profile.edit.modal.descriptions")} />
    </GoogleMapsProvider>
  );
};

export default RideScreen;
