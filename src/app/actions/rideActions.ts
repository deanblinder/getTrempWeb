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
    biEvent.track(ANALYTICS_EVENTS.ADD_RIDE, {formState})
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
    biEvent.track(ANALYTICS_EVENTS.FETCH_RIDE, {rideId})
    return await rideServices.fetchRideService(rideId);
  },
  getUserRides: async (userId: string) => {
    biEvent.track(ANALYTICS_EVENTS.FETCH_USER_RIDES)
    return await rideServices.getUserRidesService(userId);
  },
  editRide: async (rideId: string, updatedRide: Ride) => {
    biEvent.track(ANALYTICS_EVENTS.UPDATE_RIDE, {rideId,updatedRide})
    return await rideServices.editRideService(rideId, updatedRide);
  },
  getUserRideRequests: async (userId: string) => {
    biEvent.track(ANALYTICS_EVENTS.FETCH_USER_REQUESTS)
    return await rideServices.getUserRideRequestsService(userId);
  },
  requestRide: async (rideId: string, userId: string) => {
    biEvent.track(ANALYTICS_EVENTS.REQUEST_RIDE, {rideId})
    return await rideServices.requestRideService(rideId, userId);
  },
  deleteRide: async (rideId: string) => {
    biEvent.track(ANALYTICS_EVENTS.DELETE_RIDE, {rideId})
    return await rideServices.deleteRideService(rideId);
  },
  approveRideRequest: async (rideId: string, userId: string) => {
    biEvent.track(ANALYTICS_EVENTS.APPROVE_RIDE_REQUEST, {rideId})
    return await rideServices.approveRideRequestService(rideId, userId);
  },
  removePassenger: async (rideId: string, userId: string) => {
    biEvent.track(ANALYTICS_EVENTS.REMOVE_PASSANGER, {rideId})
    return await rideServices.removePassengerService(rideId, userId);
  },
  removeRequestRide: async (rideId: string, userId: string) => {
    biEvent.track(ANALYTICS_EVENTS.REMOVE_RIDE_REQUEST, {rideId})
    return await rideServices.removeRequestRideService(rideId, userId);
  },
};

export default rideActions;
