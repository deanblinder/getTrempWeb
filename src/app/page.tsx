"use client";
import styles from "./page.module.css";
import AutocompleteInput from "./components/AutocompleteInput/AutocompleteInput";
import DatePicker from "./components/DatePicker/DatePicker";
import Button from "./components/Button/Button";
import { useSearch } from "./useSearch";

const Search = () => {
  const {
    setOrigin,
    setDestination,
    searchResults,
    date,
    setDate,
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
              {/* Ride details will go here */}
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
