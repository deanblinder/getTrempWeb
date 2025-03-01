"use client";

import { useEffect, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import styles from "./styles.module.css";
import { Place } from "@/app/useSearch";
import { useLoadScript } from "@react-google-maps/api";
type PlaceResult = google.maps.places.PlaceResult;

interface AutocompleteInputProps {
  placeholder: string;
  onPlaceSelected: (place: PlaceResult) => void;
  className?: string;
  required?: boolean;
  initialValue?: Place;
}

const AutocompleteInput = ({
  placeholder,
  onPlaceSelected,
  className,
  required,
  initialValue,
}: AutocompleteInputProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [defaultValue, setDefaultValue] = useState("");

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  useEffect(() => {
    setIsMounted(true);
    if (initialValue?.formatted_address) {
      setDefaultValue(initialValue.formatted_address);
    }
  }, [initialValue]);

  if (!isMounted || !isLoaded) {
    return (
      <input
        type="text"
        placeholder={placeholder}
        className={className || styles.input}
        required={required}
        disabled
      />
    );
  }

  return (
    <Autocomplete
      options={{
        componentRestrictions: { country: "IL" },
        types: ["geocode"],
      }}
      defaultValue={defaultValue}
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
