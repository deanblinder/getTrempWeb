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
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestToJoin = async () => {
    setIsLoading(true);
    await rideActions.requestRide(rideId, session!.user.id);
    setIsLoading(false);
  };

  const { user: driver } = useUser(rideData?.driver.id || "");

  const rideRequested = rideData?.passengers.requests.includes(
    session?.user.id || ""
  );
  const rideAccepted = rideData?.passengers.accepted.includes(
    session?.user.id || ""
  );

  const getButtonContent = () => {
    if (rideRequested) {
      return "Requested";
    }
    if (rideAccepted) {
      return "Accepted";
    }
    return "Request to Join";
  };

  return {
    showDriverModal,
    setShowDriverModal,
    rideData,
    handleRequestToJoin,
    driver,
    isLoading,
    rideRequested,
    rideAccepted,
    buttonContent: getButtonContent(),
  };
};
