"use client";
import GoogleMapWrapper from "../components/GoogleMap/GoogleMapWrapper";
import styles from "./page.module.css";
import AutocompleteInput from "../components/AutocompleteInput/AutocompleteInput";
import DatePicker from "../components/DatePicker/DatePicker";
import TimePicker from "../components/TimePicker/TimePicker";
import SeatsInput from "../components/SeatsInput/SeatsInput";
import Button from "../components/Button/Button";
import { useAddRide } from "./useAddRide";
import EditProfileModal from "../components/EditProfileModal";

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
    isEditModalOpen,
    setIsEditModalOpen,
  } = useAddRide();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Add Rides</h1>
      <div className={styles.searchContainer}>
        <form
          className={styles.inputContainer}
          onSubmit={(e) => {
            e.preventDefault();
            handleAddRide();
          }}
        >
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
          <Button fullWidth size="large" type="submit">
            Add Ride
          </Button>
        </form>
      </div>
      <div className={styles.mapContainer}>
        <GoogleMapWrapper
          origin={formState.origin}
          destination={formState.destination}
          showRoute={true}
          selectedRouteIndex={formState.selectedRouteIndex}
          onRouteChange={setSelectedRouteIndex}
          showRouteButton={true}
        />
      </div>
      <EditProfileModal
        onClose={() => setIsEditModalOpen(false)}
        isOpen={isEditModalOpen}
        description="Please add your phone number to create a ride. This helps other riders contact you."
      />
    </main>
  );
};

export default Add;
