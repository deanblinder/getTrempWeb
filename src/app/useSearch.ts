"use client";
import { useState } from "react";
type PlaceResult = google.maps.places.PlaceResult;

export interface Place {
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
  formatted_address: string;
}

interface SearchFormState {
  origin: Place | undefined;
  destination: Place | undefined;
  date: string;
}

export const useSearch = () => {
  const [formState, setFormState] = useState<SearchFormState>({
    origin: undefined,
    destination: undefined,
    date: "",
  });

  const [searchResults] = useState([]);

  console.log({ formState });

  const setOrigin = (place: PlaceResult) => {
    console.log({ place });
    setFormState((prev) => {
      if (!place.geometry?.location || !place.formatted_address) {
        return prev;
      }

      return {
        ...prev,
        origin: {
          geometry: {
            location: {
              lat: () => place.geometry!.location!.lat(),
              lng: () => place.geometry!.location!.lng(),
            },
          },
          formatted_address: place.formatted_address,
        },
      };
    });
  };

  const setDestination = (place: PlaceResult) => {
    setFormState((prev) => {
      if (!place.geometry?.location || !place.formatted_address) {
        return prev;
      }

      return {
        ...prev,
        destination: {
          geometry: {
            location: {
              lat: () => place.geometry!.location!.lat(),
              lng: () => place.geometry!.location!.lng(),
            },
          },
          formatted_address: place.formatted_address,
        },
      };
    });
  };

  const setDate = (date: string) => {
    setFormState((prev) => ({
      ...prev,
      date,
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulating search results for now
  };

  return {
    origin: formState.origin,
    setOrigin,
    destination: formState.destination,
    setDestination,
    searchResults,
    date: formState.date,
    setDate,
    handleSearch,
    shouldShowSearchResults: searchResults.length > 0,
  };
};
