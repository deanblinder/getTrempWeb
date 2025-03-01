"use client";
import { useState } from "react";
import rideActions from "./actions/rideActions";
import { Ride } from "@/models/rides";
import { useSession } from "next-auth/react";
type PlaceResult = google.maps.places.PlaceResult;

export interface Place {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  place_id: string;
  formatted_address: string;
}

interface SearchFormState {
  origin: Place | undefined;
  destination: Place | undefined;
  date: string;
  radius: number;
}

const updatePlace = (place: PlaceResult): Place | undefined => {
  if (
    !place?.geometry?.location ||
    !place?.formatted_address ||
    !place?.place_id
  ) {
    return undefined;
  }

  return {
    geometry: {
      location: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      },
    },
    place_id: place.place_id,
    formatted_address: place.formatted_address,
  };
};

export const useSearch = () => {
  const { data: session } = useSession();

  const [formState, setFormState] = useState<SearchFormState>({
    origin: undefined,
    destination: undefined,
    date: "",
    radius: 5,
  });

  const [searchResults, setSearchResults] = useState<Ride[]>([]);

  const setRadius = (radius: number) => {
    setFormState((prev) => ({
      ...prev,
      radius,
    }));
  };

  const setOrigin = (place: PlaceResult) => {
    setFormState((prev: SearchFormState) => {
      const updatedPlace = updatePlace(place);
      if (!updatedPlace) return prev;

      return {
        ...prev,
        origin: updatedPlace,
      };
    });
  };

  const setDestination = (place: PlaceResult) => {
    setFormState((prev: SearchFormState): SearchFormState => {
      const updatedPlace = updatePlace(place);
      if (!updatedPlace) return prev;

      return {
        ...prev,
        destination: updatedPlace,
      };
    });
  };

  const setDate = (date: string) => {
    setFormState((prev) => ({
      ...prev,
      date,
    }));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const rides = await rideActions.searchRides(formState);
    const filterdRides = rides.filter((ride: Ride) => {
      return ride._id === session?.user.id;
    });

    setSearchResults(filterdRides);
  };

  return {
    origin: formState.origin,
    setOrigin,
    destination: formState.destination,
    setDestination,
    radius: formState.radius,
    setRadius,
    searchResults,
    date: formState.date,
    setDate,
    handleSearch,
    shouldShowSearchResults: searchResults.length > 0,
  };
};
