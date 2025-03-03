"use client";
import { useState, useEffect } from "react";
import { Ride } from "@/models/rides";
import { useFetchRide } from "@/app/hooks/useFetchRide";
import { Place } from "@/app/useSearch";
import rideActions from "@/app/actions/rideActions";
import { useRouter } from "next/navigation";
type PlaceResult = google.maps.places.PlaceResult;

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

export const useEditRide = (rideId: string) => {
  const { rideData: initialRideData, loading, error } = useFetchRide(rideId);
  const [ride, setRide] = useState<Ride | undefined>(initialRideData);
  const router = useRouter();

  useEffect(() => {
    if (initialRideData) {
      setRide(initialRideData);
    }
  }, [initialRideData]);

  const handleDelete = () => {
    rideActions.deleteRide(rideId);
    router.back();
  };

  const handleSave = async () => {
    if (!ride) return;
    await rideActions.editRide(rideId, ride);
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  const setOrigin = (place: PlaceResult) => {
    setRide((prev: Ride | undefined): Ride | undefined => {
      if (!prev) return prev;
      const updatedPlace = updatePlace(place);
      if (!updatedPlace) return prev;

      return {
        ...prev,
        origin: updatedPlace,
      };
    });
  };

  const setDestination = (place: PlaceResult) => {
    setRide((prev: Ride | undefined): Ride | undefined => {
      if (!prev) return prev;
      const updatedPlace = updatePlace(place);
      if (!updatedPlace) return prev;

      return {
        ...prev,
        destination: updatedPlace,
      };
    });
  };

  const updateDate = (date: string) => {
    setRide((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        rideTime: {
          ...prev.rideTime,
          formattedData: {
            ...prev.rideTime.formattedData,
            date,
          },
        },
      };
    });
  };

  const updateTime = (time: string) => {
    setRide((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        rideTime: {
          ...prev.rideTime,
          formattedData: {
            ...prev.rideTime.formattedData,
            time,
          },
        },
      };
    });
  };

  const updateSeats = (seats: number) => {
    setRide((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        seats,
      };
    });
  };

  const updateSelectedRouteIndex = (selectedRouteIndex: number) => {
    setRide((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        selectedRouteIndex,
      };
    });
  };

  return {
    ride,
    setRide,
    loading,
    error,
    setOrigin,
    setDestination,
    updateDate,
    updateTime,
    updateSeats,
    updateSelectedRouteIndex,
    handleSave,
    handleDelete,
    handleCancel,
  };
};
