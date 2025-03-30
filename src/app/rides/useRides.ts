"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useUserRides } from "../hooks/useUserRides";
import { Ride } from "@/models/rides";
import { RootState, useAppDispatch } from "../store/store";
import { setShowNotification } from "../store/slices/notificationSlice";
import { useSelector } from "react-redux";

export const useRides = () => {
  const { rides } = useUserRides();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRideId, setSelectedRideId] = useState<string | null>(null);
  const [driverId, setDriverId] = useState<string | null>(null);
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const shouldShowNotification = useSelector(
    (state: RootState) => state.notification.shouldShowNotification
  );

  useEffect(() => {
    if (shouldShowNotification) dispatch(setShowNotification(false));
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
    setSelectedRideId(null);
    setDriverId(null);
  };

  const handleAvatarClick = (userId: string, ride: Ride) => {
    setSelectedUserId(userId);
    setSelectedRideId(ride._id);
    setDriverId(ride.driver.id);
    setIsModalOpen(true);
  };

  return {
    rides,
    selectedUserId,
    isModalOpen,
    selectedRideId,
    driverId,
    session,
    handleModalClose,
    handleAvatarClick,
  };
};
