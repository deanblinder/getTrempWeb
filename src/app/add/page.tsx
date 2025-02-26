"use client";
import GoogleMapWrapper from "../components/GoogleMap/GoogleMapWrapper";
import styles from "./page.module.css";
import AutocompleteInput from "../components/AutocompleteInput/AutocompleteInput";
import { useState } from "react";
import DatePicker from "../components/DatePicker/DatePicker";
import TimePicker from "../components/TimePicker/TimePicker";
import SeatsInput from "../components/SeatsInput/SeatsInput";
import Button from "../components/Button/Button";

const Add = () => {
  const [seats, setSeats] = useState(1);
  const [origin] = useState({ lat: 32.0853, lng: 34.7818 }); // Tel Aviv
  const [destination] = useState({ lat: 32.794, lng: 34.9896 }); // Haifa
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

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
          <DatePicker value={date} onChange={setDate} required />
          <TimePicker value={time} onChange={setTime} required />
          <SeatsInput
            value={seats}
            onChange={(val) => setSeats(val)}
            required
          />
          <Button fullWidth size="large">
            Add Ride
          </Button>
        </div>
      </div>
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
