"use client";
import GoogleMapWrapper from "../components/GoogleMap/GoogleMapWrapper";
import styles from "./page.module.css";
import AutocompleteInput from "../components/AutocompleteInput/AutocompleteInput";
import { useState } from "react";

const Add = () => {
  const [seats, setSeats] = useState(1);
  const [origin] = useState({ lat: 32.0853, lng: 34.7818 }); // Tel Aviv
  const [destination] = useState({ lat: 32.794, lng: 34.9896 }); // Haifa
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);

  return (
    <main className={styles.container}>
      <div className={styles.searchContainer}>
        <div className={styles.inputContainer}>
          <AutocompleteInput
            placeholder="Origin"
            className={styles.input}
            onPlaceSelected={(place) => console.log(place)}
            required
          />
          <AutocompleteInput
            placeholder="Destination"
            className={styles.input}
            onPlaceSelected={(place) => console.log(place)}
            required
          />
          <input
            id="date"
            type="date"
            className={styles.input}
            min={new Date().toISOString().slice(0, 10)}
          />
          <input
            id="time"
            type="time"
            className={styles.input}
            min={new Date().toISOString().slice(11, 16)}
          />
          <div className={styles.seatsContainer}>
            <label htmlFor="seats">Available Seats:</label>
            <div className={styles.seatsInput}>
              <button
                onClick={() => setSeats(Math.max(1, seats - 1))}
                className={styles.seatButton}
              >
                -
              </button>
              <input
                id="seats"
                type="number"
                value={seats}
                onChange={(e) =>
                  setSeats(
                    Math.max(1, Math.min(8, parseInt(e.target.value) || 1))
                  )
                }
                className={styles.seatsNumber}
                min="1"
                max="8"
              />
              <button
                onClick={() => setSeats(Math.min(8, seats + 1))}
                className={styles.seatButton}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <button className={styles.addButton}>Add Ride</button>
      </div>

      {/* Map Container */}
      <div className={styles.mapContainer}>
        <GoogleMapWrapper
          origin={origin}
          destination={destination}
          showRoute={true}
          selectedRouteIndex={selectedRouteIndex}
          onRouteChange={(index) => {
            setSelectedRouteIndex(index);
          }}
        />
      </div>
    </main>
  );
};

export default Add;
