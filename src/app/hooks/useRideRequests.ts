"use client";

import { useEffect, useState } from "react";
import userActions from "../actions/userActions";

export const useRideRequests = (userId: string | undefined) => {
  const [hasNewRequests, setHasNewRequests] = useState(false);
  const [requests, setRequests] = useState<string[]>([]);

  const checkRequests = async () => {
    try {
      const requests = await userActions.getUserRequests(userId!);

      // Get the cached requests string
      const cachedRequestsString = localStorage.getItem("rideRequestsString");

      // Update state based on comparison with cached data
      if (cachedRequestsString !== requests.requestsString) {
        setHasNewRequests(true);
      }

      // Update the cache and state
      localStorage.setItem("rideRequestsString", requests.requestsString);
      setRequests(requests.requests);
    } catch (error) {
      console.error("Error fetching ride requests:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      checkRequests();
    }
  }, [userId]);

  const clearNewRequestsFlag = () => {
    setHasNewRequests(false);
  };

  return {
    requests,
    hasNewRequests,
    clearNewRequestsFlag,
  };
};
