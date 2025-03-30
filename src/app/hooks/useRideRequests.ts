"use client";
import { useEffect } from "react";
import userActions from "../actions/userActions";
import { useSession } from "next-auth/react";
import { useAppDispatch } from "../store/store";
import { setShowNotification } from "../store/slices/notificationSlice";

export const useRideRequests = () => {
  const { data: session } = useSession();

  const dispatch = useAppDispatch();

  const getLastRequest = () => {
    if (session) {
      const lastRequest = localStorage.getItem("lastRequest");
      if (lastRequest) {
        return JSON.parse(lastRequest).timestamp;
      }
      return 0;
    }
    return -1;
  };

  const getUserRequets = async () => {
    if (session) {
      const { requests: rideRequests } = await userActions.getUserRequests(
        session.user.id
      );

      if (rideRequests.length > 0) {
        const latestRequest = rideRequests[rideRequests.length - 1];
        const lastStoredTimestamp = getLastRequest();

        if (
          lastStoredTimestamp === 0 ||
          latestRequest.timestamp > lastStoredTimestamp
        ) {
          dispatch(setShowNotification(true));
          localStorage.setItem("lastRequest", JSON.stringify(latestRequest));
        }
      }
    }
  };

  useEffect(() => {
    getUserRequets();
  }, [session]);

  return {};
};
