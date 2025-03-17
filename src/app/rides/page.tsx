"use client";
import styles from "./rides.module.css";
import RideCard from "../components/RideCard/RideCard";
import Modal from "../components/Modal/Modal";
import DriverModalContent from "../components/DriverModalContent";
import i18next from "i18next";
import { useRides } from "./useRides";

const Rides = () => {
  const {
    rides,
    selectedUserId,
    isModalOpen,
    selectedRideId,
    driverId,
    session,
    handleModalClose,
    handleAvatarClick,
  } = useRides();

  if (rides.length === 0) {
    return (
      <main className={styles.container}>
        <h1 className={styles.title}>{i18next.t("common:rides.title")}</h1>
        <div className={styles.emptyState}>
          <h2>{i18next.t("common:rides.emptyState.title")}</h2>
          <p>{i18next.t("common:rides.emptyState.description")}</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{i18next.t("common:rides.title")}</h1>
      <div className={styles.ridesList}>
        {rides.map((ride) => (
          <RideCard
            key={ride._id}
            ride={ride}
            onAvatarClick={(userId) => handleAvatarClick(userId, ride)}
          />
        ))}
      </div>
      {selectedUserId && selectedRideId && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          title={"User Profile"}
          subtitle="Contact Information"
          content={
            <DriverModalContent
              userId={selectedUserId}
              rideId={selectedRideId}
              isOwner={session?.user.id === driverId}
            />
          }
        />
      )}
    </main>
  );
};

export default Rides;
