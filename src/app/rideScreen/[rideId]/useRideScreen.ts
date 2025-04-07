"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useFetchRide } from "@/app/hooks/useFetchRide";
import rideActions from "@/app/actions/rideActions";
import { useSession } from "next-auth/react";
import { useUser } from "@/app/hooks/useUser";
import i18next from "i18next";

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

  const rideRequested = rideData?.passengers.requests.some(
    (request) => request.userId === session?.user.id
  );
  const rideAccepted = rideData?.passengers.accepted.some(
    (accepted) => accepted.userId === session?.user.id
  );

  const getButtonContent = () => {
    if (rideRequested) {
      return i18next.t("common:ride-screen.cancel-request-join-ride.button");
    }
    if (rideAccepted) {
      return i18next.t("common:ride-screen.cancel-ride.button");
    }
    return i18next.t("common:ride-screen.request-join-ride.button");
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
