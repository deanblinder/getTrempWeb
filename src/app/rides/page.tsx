"use client";
import styles from "./rides.module.css";
import RideCard from "../components/RideCard/RideCard";
import { useUserRides } from "../hooks/useUserRides";
import { useState } from "react";
import Modal from "../components/Modal/Modal";
import DriverModalContent from "../components/DriverModalContent";
import { useSession } from "next-auth/react";
import { Ride } from "@/models/rides";

const Rides = () => {
  const { rides } = useUserRides();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRideId, setSelectedRideId] = useState<string | null>(null);
  const [driverId, setDriverId] = useState<string | null>(null);
  const { data: session } = useSession();

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
    setSelectedRideId(null);
    setDriverId(null);
  };

  const handleAvatarClick = (userId: string, ride: Ride) => {
    setSelectedUserId(userId);
    setSelectedRideId(ride._id);
    setDriverId(ride.driver.id);
    setIsModalOpen(true);
  };

  if (rides.length === 0) {
    return (
      <main className={styles.container}>
        <h1 className={styles.title}>My Upcoming Rides</h1>
        <div className={styles.emptyState}>
          <h2>{"No Rides Found"}</h2>
          <p>
            {
              "You don't have any upcoming rides. Create a new ride or join an existing one!"
            }
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>My Upcoming Rides</h1>
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
