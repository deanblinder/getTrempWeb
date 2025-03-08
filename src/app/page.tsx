"use client";
import styles from "./page.module.css";
import AutocompleteInput from "./components/AutocompleteInput/AutocompleteInput";
import DatePicker from "./components/DatePicker/DatePicker";
import Button from "./components/Button/Button";
import Slider from "./components/Slider/Slider";
import RideCard from "./components/RideCard/RideCard";
import { useSearch } from "./useSearch";
import Loader from "./components/Loader/Loader";

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
    isLoading,
  } = useSearch();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Find Available Rides</h1>
      <div className={styles.searchContainer}>
        <form className={styles.inputContainer} onSubmit={handleSearch}>
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
          <Slider value={radius} max={10} onChange={setRadius} required />
          <Button fullWidth type="submit" variant="blue" size="large">
            {isLoading ? <Loader /> : "Search Rides"}
          </Button>
        </form>
      </div>

      <div className={styles.ridesList}>
        {shouldShowSearchResults ? (
          searchResults.map((ride) => (
            <div key={ride._id} className={styles.rideItem}>
              <RideCard ride={ride} />
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
