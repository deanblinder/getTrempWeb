"use client";
import styles from "./rides.module.css";
import RideCard from "../components/RideCard/RideCard";
import { useUserRides } from "../hooks/useUserRides";

const Rides = () => {
  const { rides } = useUserRides();

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
            rideId={ride._id}
            avatarImage="/vercel.svg"
            driver={ride.driver}
            origin={ride.origin?.formatted_address || ""}
            destination={ride.destination?.formatted_address || ""}
            date={ride.rideTime.formattedData.date}
            time={ride.rideTime.formattedData.time}
            numberOfSeats={ride.seats}
          />
        ))}
      </div>
    </main>
  );
};

export default Rides;
