"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Ride } from "@/models/rides";
import rideActions from "@/app/actions/rideActions";

export const useRideScreen = () => {
  const [showDriverModal, setShowDriverModal] = useState(false);
  const params = useParams();
  const rideId = params.rideId as string;
  const [rideData, setRideData] = useState<Ride>();

  const fetchRideData = async () => {
    if (rideId) {
      const data = await rideActions.fetchRide(rideId);
      console.log("data: ", data);
      setRideData(data);
    }
  };

  useEffect(() => {
    fetchRideData();
  }, [rideId]);

  const handleRequestToJoin = async () => {
    // Here you would typically make an API call to request joining the ride
    console.log(`Requesting to join ride ${rideId}`);
  };

  return {
    showDriverModal,
    setShowDriverModal,
    rideData,
    setRideData,
    handleRequestToJoin,
  };
};
