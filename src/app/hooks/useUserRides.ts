"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Ride } from "@/models/rides";
import rideActions from "../actions/rideActions";

export const useUserRides = () => {
  const { data: session } = useSession();
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRides = async () => {
      if (!session?.user?.id) {
        setLoading(false);
        return;
      }

      try {
        // Fetch rides where user is either driver or passenger
        const userRides = await rideActions.getUserRides(session.user.id);
        setRides(userRides);
        setError(null);
      } catch (err) {
        setError("Failed to fetch rides");
        console.error("Error fetching rides:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserRides();
  }, [session?.user?.id]);

  return {
    rides,
    loading,
    error,
  };
};
