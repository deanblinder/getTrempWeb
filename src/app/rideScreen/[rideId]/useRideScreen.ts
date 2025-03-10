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
  const { rideData, refetch } = useFetchRide(rideId);
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    if (rideRequested) {
      await rideActions.removeRequestRide(rideId, session!.user.id);
    } else if (rideAccepted) {
      await rideActions.removePassenger(rideId, session!.user.id);
    } else {
      await rideActions.requestRide(rideId, session!.user.id);
    }
    refetch();
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
      return "Cancel Request";
    }
    if (rideAccepted) {
      return "Cancel Ride";
    }
    return "Request to Join";
  };

  return {
    showDriverModal,
    setShowDriverModal,
    rideData,
    handleClick,
    driver,
    isLoading,
    buttonContent: getButtonContent(),
    session,
  };
};
