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
import i18next from "i18next";
import GoogleMapsProvider from "../components/GoogleMapsProvider/GoogleMapsProvider";

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
    <GoogleMapsProvider>
      <main className={styles.container}>
        <h1 className={styles.title}>{i18next.t("common:add.title")}</h1>
        <div className={styles.searchContainer}>
          <form
            className={styles.inputContainer}
            onSubmit={(e) => {
              e.preventDefault();
              handleAddRide();
            }}
          >
            <AutocompleteInput
              placeholder={i18next.t("common:add.origin")}
              className={styles.input}
              onPlaceSelected={setOrigin}
              required
            />
            <AutocompleteInput
              placeholder={i18next.t("common:add.destination")}
              className={styles.input}
              onPlaceSelected={setDestination}
              required
            />
            <DatePicker value={formState.date} onChange={setDate} required />
            <TimePicker value={formState.time} onChange={setTime} required />
            <SeatsInput value={formState.seats} onChange={setSeats} required />
            <Button fullWidth size="large" type="submit">
              {i18next.t("common:add.add-button")}
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
          description={i18next.t("common:profile.edit.modal.descriptions")}
        />
      </main>
    </GoogleMapsProvider>
  );
};

export default Add;
