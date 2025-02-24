'use client';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      {/* Search Container */}
      <div className={styles.searchContainer}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Origin"
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Destination"
            className={styles.input}
          />
        </div>
      </div>

      {/* Map Container */}
      <div className={styles.mapContainer}>
        {/* Map placeholder - You can integrate your map library here */}
        
      </div>
    </main>
  );
}