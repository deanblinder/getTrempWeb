"use client";
import { useState } from "react";
import styles from "./page.module.css";
// import { useSession } from "next-auth/react";
import AutocompleteInput from "./components/AutocompleteInput/AutocompleteInput";
import DatePicker from "./components/DatePicker/DatePicker";
import Button from "./components/Button/Button";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [date, setDate] = useState("");
  // const session = useSession();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual search logic here
    // For now, we'll just simulate some results
    setSearchResults([]);
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Find Available Rides</h1>

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
        {searchResults.length > 0 ? (
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
