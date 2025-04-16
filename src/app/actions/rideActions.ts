import { User } from "@/models/user";
import { AddRideFormData } from "../add/useAddRide";
import { Place } from "../useSearch";
import {} from "next-auth/react";
import { Ride } from "@/models/rides";
import { rideServices } from "../services/rideServices";
import { ANALYTICS_EVENTS, biEvent } from "@/utils/analytics";

const rideActions = {
  addRide: async ({
    formState,
    user,
  }: {
    formState: AddRideFormData;
    user: Partial<User>;
  }) => {
    return await rideServices.addRideService({ formState, user });
  },
  searchRides: async (searchParams: {
    origin?: Place;
    destination?: Place;
    date?: string;
    radius?: number;
  }) => {
    biEvent.track(ANALYTICS_EVENTS.SEARCH_RIDE, {searchParams});
    return await rideServices.searchRidesService(searchParams);
  },
  fetchRide: async (rideId: string) => {
    return await rideServices.fetchRideService(rideId);
  },
  getUserRides: async (userId: string) => {
    return await rideServices.getUserRidesService(userId);
  },
  editRide: async (rideId: string, updatedRide: Ride) => {
    return await rideServices.editRideService(rideId, updatedRide);
  },
  getUserRideRequests: async (userId: string) => {
    return await rideServices.getUserRideRequestsService(userId);
  },
  requestRide: async (rideId: string, userId: string) => {
    return await rideServices.requestRideService(rideId, userId);
  },
  deleteRide(rideId: string) {
    return rideServices.deleteRideService(rideId);
  },
  approveRideRequest: async (rideId: string, userId: string) => {
    return await rideServices.approveRideRequestService(rideId, userId);
  },
  removePassenger: async (rideId: string, userId: string) => {
    return await rideServices.removePassengerService(rideId, userId);
  },
  removeRequestRide: async (rideId: string, userId: string) => {
    return await rideServices.removeRequestRideService(rideId, userId);
  },
};

export default rideActions;
