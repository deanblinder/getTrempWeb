"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useFetchRide } from "@/app/hooks/useFetchRide";
import rideActions from "@/app/actions/rideActions";
import { useSession } from "next-auth/react";
import { useUser } from "@/app/hooks/useUser";

export const useRideScreen = () => {
  const [showDriverModal, setShowDriverModal] = useState(false);
  const params = useParams();
  const rideId = params.rideId as string;
  const { rideData } = useFetchRide(rideId);
  const { data: session } = useSession();
  const handleRequestToJoin = async () => {
    rideActions.requestRide(rideId, session!.user.id);
  };

  const { user: driver } = useUser(rideData?.driver.id || "");

  return {
    showDriverModal,
    setShowDriverModal,
    rideData,
    handleRequestToJoin,
    driver,
  };
};
