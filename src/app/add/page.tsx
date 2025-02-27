"use client";
import GoogleMapWrapper from "../components/GoogleMap/GoogleMapWrapper";
import styles from "./page.module.css";
import AutocompleteInput from "../components/AutocompleteInput/AutocompleteInput";
import DatePicker from "../components/DatePicker/DatePicker";
import TimePicker from "../components/TimePicker/TimePicker";
import SeatsInput from "../components/SeatsInput/SeatsInput";
import Button from "../components/Button/Button";
import { useAddRide } from "./useAddRide";

const Add = () => {
  const {
    formState,
    setOrigin,
    setDestination,
    setDate,
    setTime,
    setSeats,
    setSelectedRouteIndex,
    handleAddRide,
  } = useAddRide();

  return (
    <main className={styles.container}>
      <div className={styles.searchContainer}>
        <div className={styles.inputContainer}>
          <AutocompleteInput
            placeholder="Origin"
            className={styles.input}
            onPlaceSelected={setOrigin}
            required
          />
          <AutocompleteInput
            placeholder="Destination"
            className={styles.input}
            onPlaceSelected={setDestination}
            required
          />
          <DatePicker value={formState.date} onChange={setDate} required />
          <TimePicker value={formState.time} onChange={setTime} required />
          <SeatsInput value={formState.seats} onChange={setSeats} required />
          <Button fullWidth size="large" onClick={handleAddRide}>
            Add Ride
          </Button>
        </div>
      </div>
      <div className={styles.mapContainer}>
        <GoogleMapWrapper
          origin={formState.origin}
          destination={formState.destination}
          showRoute={true}
          selectedRouteIndex={formState.selectedRouteIndex}
          onRouteChange={setSelectedRouteIndex}
        />
      </div>
    </main>
  );
};

export default Add;
