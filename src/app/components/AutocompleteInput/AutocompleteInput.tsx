"use client";

import Autocomplete from "react-google-autocomplete";
import styles from "./styles.module.css";
type PlaceResult = google.maps.places.PlaceResult;

interface AutocompleteInputProps {
  placeholder: string;
  onPlaceSelected: (place: PlaceResult) => void;
  className?: string;
  required?: boolean;
}

const AutocompleteInput = ({
  placeholder,
  onPlaceSelected,
  className,
  required,
}: AutocompleteInputProps) => {
  return (
    <Autocomplete
      options={{
        componentRestrictions: { country: "IL" },
        types: ["geocode"],
      }}
      debounce={300}
      type="text"
      placeholder={placeholder}
      className={className || styles.input}
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      onPlaceSelected={onPlaceSelected}
      required={required}
    />
  );
};

export default AutocompleteInput;
