"use client";
import { useState } from "react";
import { Place } from "../useSearch";
import rideActions from "../actions/rideActions";
import { useSession } from "next-auth/react";
import { User } from "@/models/user";
import { useRouter } from "next/navigation";
type PlaceResult = google.maps.places.PlaceResult;

export interface AddRideFormData {
  origin: Place | undefined;
  destination: Place | undefined;
  date: string;
  time: string;
  seats: number;
  selectedRouteIndex: number;
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

export const useAddRide = () => {
  const session = useSession();
  const router = useRouter();
  const [formState, setFormState] = useState<AddRideFormData>({
    origin: undefined,
    destination: undefined,
    date: "",
    time: "00:00",
    seats: 1,
    selectedRouteIndex: 0,
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const setOrigin = (place: PlaceResult) => {
    setFormState((prev: AddRideFormData): AddRideFormData => {
      const updatedPlace = updatePlace(place);
      if (!updatedPlace) return prev;

      return {
        ...prev,
        origin: updatedPlace,
      };
    });
  };

  const setDestination = (place: PlaceResult) => {
    setFormState((prev) => {
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

  const handleAddRide = async () => {
    if (!session.data?.user?.phoneNumber) {
      setIsEditModalOpen(true);
      return;
    }
    await rideActions.addRide({
      formState,
      user: session.data?.user as Partial<User>,
    });
    router.push("/rides");
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
    isEditModalOpen,
    setIsEditModalOpen,
  };
};
