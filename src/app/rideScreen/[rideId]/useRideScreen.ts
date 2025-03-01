"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useFetchRide } from "@/app/hooks/useFetchRide";

export const useRideScreen = () => {
  const [showDriverModal, setShowDriverModal] = useState(false);
  const params = useParams();
  const rideId = params.rideId as string;
  const { rideData } = useFetchRide(rideId);

  const handleRequestToJoin = async () => {
    // Here you would typically make an API call to request joining the ride
    console.log(`Requesting to join ride ${rideId}`);
  };

  return {
    showDriverModal,
    setShowDriverModal,
    rideData,
    handleRequestToJoin,
  };
};
