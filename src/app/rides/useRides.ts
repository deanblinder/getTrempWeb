"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useUserRides } from "../hooks/useUserRides";
import { Ride } from "@/models/rides";

export const useRides = () => {
  const { rides } = useUserRides();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRideId, setSelectedRideId] = useState<string | null>(null);
  const [driverId, setDriverId] = useState<string | null>(null);
  const { data: session } = useSession();

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
