"use client";
import styles from "./rides.module.css";
import RideCard from "../components/RideCard/RideCard";

const Rides = () => {
  // Example ride data - this would typically come from an API or database
  const exampleRide = {
    avatarImage: "/vercel.svg", // Placeholder image
    origin: "Tel Aviv",
    destination: "Jerusalem",
    date: "2024-01-20",
    time: "14:00",
    numberOfSeats: 3,
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>My Upcoming Rides</h1>
      <div className={styles.ridesList}>
        <RideCard {...exampleRide} />
      </div>
    </main>
  );
};

export default Rides;
