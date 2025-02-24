'use client';
import { useState } from 'react';
import styles from './page.module.css';
import { useSession } from "next-auth/react";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const session = useSession();

  console.log('SESS',session);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual search logic here
    // For now, we'll just simulate some results
    setSearchResults([]);
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Find Available Rides</h1>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <button type="submit" className={styles.searchButton}>
          Search Rides
        </button>
      </form>

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
}

export default Search;