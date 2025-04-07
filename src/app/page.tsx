"use client";
import styles from "./page.module.css";
import AutocompleteInput from "./components/AutocompleteInput/AutocompleteInput";
import DatePicker from "./components/DatePicker/DatePicker";
import Button from "./components/Button/Button";
import RideCard from "./components/RideCard/RideCard";
import { useSearch } from "./useSearch";
import Loader from "./components/Loader/Loader";
import i18n from "i18next";
import GoogleMapsProvider from "./components/GoogleMapsProvider/GoogleMapsProvider";
import { useRideRequests } from "./hooks/useRideRequests";

const Search = () => {
  const {
    setOrigin,
    setDestination,
    searchResults,
    date,
    setDate,
    handleSearch,
    shouldShowSearchResults,
    isLoading,
  } = useSearch();

  useRideRequests();

  return (
    <GoogleMapsProvider>
      <main className={styles.container}>
        <h1 className={styles.title}>{i18n.t("common:search.title")}</h1>
        <div className={styles.searchContainer}>
          <form className={styles.inputContainer} onSubmit={handleSearch}>
            <AutocompleteInput
              placeholder={i18n.t("common:search.origin")}
              className={styles.input}
              onPlaceSelected={setOrigin}
              required
            />
            <AutocompleteInput
              placeholder={i18n.t("common:search.destination")}
              className={styles.input}
              onPlaceSelected={setDestination}
              required
            />
            <DatePicker value={date} onChange={setDate} required />
            {/* <Slider
              label={i18n.t("common:search.distance")}
              value={radius}
              max={10}
              onChange={setRadius}
              required
            /> */}
            <Button fullWidth type="submit" variant="blue" size="large">
              {isLoading ? <Loader /> : i18n.t("common:search.search-button")}
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
              {i18n.t("common:search.emptyState")}
            </div>
          )}
        </div>
      </main>
    </GoogleMapsProvider>
  );
};

export default Search;
