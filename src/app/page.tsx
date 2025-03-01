"use client";
import styles from "./page.module.css";
import AutocompleteInput from "./components/AutocompleteInput/AutocompleteInput";
import DatePicker from "./components/DatePicker/DatePicker";
import Button from "./components/Button/Button";
import Slider from "./components/Slider/Slider";
import { useSearch } from "./useSearch";
import RideCard from "./components/RideCard/RideCard";

const Search = () => {
  const {
    setOrigin,
    setDestination,
    searchResults,
    date,
    setDate,
    radius,
    setRadius,
    handleSearch,
    shouldShowSearchResults,
  } = useSearch();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Find Available Rides</h1>

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
          <DatePicker value={date} onChange={setDate} required />
          <Slider value={radius} max={10} onChange={setRadius} />
          <Button
            fullWidth
            type="submit"
            variant="blue"
            size="large"
            onClick={handleSearch}
          >
            Search Rides
          </Button>
        </div>
      </div>

      <div className={styles.ridesList}>
        {shouldShowSearchResults ? (
          searchResults.map((ride, index) => (
            <div key={index} className={styles.rideItem}>
              <RideCard
                key={index}
                rideId={ride._id}
                date={ride.rideTime.formattedData.date}
                time={ride.rideTime.formattedData.time}
                numberOfSeats={ride.seats}
                origin={ride.origin?.formatted_address || ""}
                destination={ride.destination?.formatted_address || ""}
              />
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            {"No rides found. Try searching for available rides!"}
          </div>
        )}
      </div>
    </main>
  );
};

export default Search;
