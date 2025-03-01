"use client";
import { useState, useEffect } from "react";
import { Ride } from "@/models/rides";
import rideActions from "@/app/actions/rideActions";

export const useFetchRide = (rideId: string) => {
  const [rideData, setRideData] = useState<Ride>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRideData = async () => {
    if (!rideId) return;

    try {
      setLoading(true);
      const data = await rideActions.fetchRide(rideId);
      setRideData(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch ride');
      console.error('Error fetching ride:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRideData();
  }, [rideId]);

  return {
    rideData,
    loading,
    error,
    refetch: fetchRideData
  };
};