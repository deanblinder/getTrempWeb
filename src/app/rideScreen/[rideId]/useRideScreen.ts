"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useFetchRide } from "@/app/hooks/useFetchRide";
import rideActions from "@/app/actions/rideActions";
import { useSession } from "next-auth/react";

export const useRideScreen = () => {
  const [showDriverModal, setShowDriverModal] = useState(false);
  const params = useParams();
  const rideId = params.rideId as string;
  const { rideData } = useFetchRide(rideId);
  const { data: session } = useSession();
  const handleRequestToJoin = async () => {
    // Here you would typically make an API call to request joining the ride
    rideActions.requestRide(rideId, session!.user.id);
  };

  return {
    showDriverModal,
    setShowDriverModal,
    rideData,
    handleRequestToJoin,
  };
};
