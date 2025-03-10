import { User } from "@/models/user";
import { AddRideFormData } from "../add/useAddRide";
import { Ride } from "@/models/rides";
import { Place } from "../useSearch";

export const rideServices = {
  addRideService: async ({
    formState,
    user,
  }: {
    formState: AddRideFormData;
    user: Partial<User>;
  }) => {
    const response = await fetch("/api/addRide", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        driver: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        origin: formState.origin,
        destination: formState.destination,
        rideTime: {
          timeStemp: new Date(formState.date + " " + formState.time).getTime(),
          formattedData: {
            date: formState.date,
            time: formState.time,
          },
        },
        seats: formState.seats,
        selectedRouteIndex: formState.selectedRouteIndex,
        passengers: {
          requests: [],
          accepted: [],
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    return await response.json();
  },
  searchRidesService: async (searchParams: {
    origin?: Place;
    destination?: Place;
    date?: string;
    radius?: number;
  }) => {
    const response = await fetch("/api/searchRides", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchParams),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch rides");
    }
    return await response.json();
  },
  fetchRideService: async (rideId: string) => {
    const response = await fetch(`/api/rides/${rideId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch ride");
    }
    return await response.json();
  },
  getUserRidesService: async (userId: string) => {
    const response = await fetch(`/api/rides/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch rides");
    }
    return await response.json();
  },

  getUserRideRequestsService: async (userId: string) => {
    const response = await fetch(`/api/rides/rideRequests/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch ride requests");
    }
    return await response.json();
  },
  editRideService: async (rideId: string, updatedRide: Ride) => {
    const response = await fetch(`/api/rides/${rideId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRide),
    });
    if (!response.ok) {
      throw new Error("Failed to update ride");
    }
    return await response.json();
  },
  requestRideService: async (rideId: string, userId: string) => {
    const response = await fetch(`/api/rides/rideRequests/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rideId }),
    });
    if (!response.ok) {
      throw new Error("Failed to request ride");
    }
    return await response.json();
  },
  deleteRideService: async (rideId: string) => {
    const response = await fetch(`/api/rides/${rideId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete ride");
    }
    return await response.json();
  },
  approveRideRequestService: async (rideId: string, userId: string) => {
    const response = await fetch(`/api/rides/approveRequest/${rideId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    if (!response.ok) {
      throw new Error("Failed to approve ride request");
    }
    return await response.json();
  },
  unapproveRideRequestService: async (rideId: string, userId: string) => {
    const response = await fetch(`/api/rides/unApproveRequest/${rideId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    if (!response.ok) {
      throw new Error("Failed to approve ride request");
    }
    return await response.json();
  },
  removePassengerService: async (rideId: string, userId: string) => {
    const response = await fetch(`/api/rides/removePassenger/${rideId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    if (!response.ok) {
      throw new Error("Failed to remove passenger from ride");
    }
    return await response.json();
  },
  removeRequestRideService: async (rideId: string, userId: string) => {
    const response = await fetch(`/api/rides/removeRequest/${rideId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    if (!response.ok) {
      throw new Error("Failed to remove ride request");
    }
    return await response.json();
  },
};
