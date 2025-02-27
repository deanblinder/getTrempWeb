"use client";
import { useState } from "react";
import { Place } from "../useSearch";
type PlaceResult = google.maps.places.PlaceResult;

interface FormData {
  origin: Place | undefined;
  destination: Place | undefined;
  date: string;
  time: string;
  seats: number;
  selectedRouteIndex: number;
}

export const useAddRide = () => {
  const [formState, setFormState] = useState<FormData>({
    origin: undefined,
    destination: undefined,
    date: "",
    time: "",
    seats: 1,
    selectedRouteIndex: 0,
  });

  console.log("###", formState);
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

  const setTime = (time: string) => {
    setFormState((prev) => ({
      ...prev,
      time,
    }));
  };

  const setSeats = (seats: number) => {
    setFormState((prev) => ({
      ...prev,
      seats,
    }));
  };

  const setSelectedRouteIndex = (selectedRouteIndex: number) => {
    setFormState((prev) => ({
      ...prev,
      selectedRouteIndex,
    }));
  };

  return {
    formState,
    setOrigin,
    setDestination,
    setDate,
    setTime,
    setSeats,
    setSelectedRouteIndex,
  };
};
