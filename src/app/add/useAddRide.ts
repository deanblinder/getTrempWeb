"use client";
import { useState } from "react";
import { Place } from "../useSearch";
import rideActions from "../actions/rideActions";
type PlaceResult = google.maps.places.PlaceResult;

export interface AddRideFormData {
  origin: Place | undefined;
  destination: Place | undefined;
  date: string;
  time: string;
  seats: number;
  selectedRouteIndex: number;
}

export const useAddRide = () => {
  const [formState, setFormState] = useState<AddRideFormData>({
    origin: undefined,
    destination: undefined,
    date: "",
    time: "",
    seats: 1,
    selectedRouteIndex: 0,
  });

  const setOrigin = (place: PlaceResult) => {
    setFormState((prev) => {
      if (!place.geometry?.location || !place.formatted_address) {
        return prev;
      }

      return {
        ...prev,
        origin: {
          geometry: {
            location: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
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
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
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
  console.log("formState", formState);
  const handleAddRide = async () => {
    rideActions.addRide(formState);
  };

  return {
    formState,
    setOrigin,
    setDestination,
    setDate,
    setTime,
    setSeats,
    setSelectedRouteIndex,
    handleAddRide,
  };
};
