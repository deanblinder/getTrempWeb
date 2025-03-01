import { User } from "@/models/user";
import { AddRideFormData } from "../add/useAddRide";
import { Place } from "../useSearch";
import {} from "next-auth/react";

const rideActions = {
  addRide: async ({
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
  searchRides: async (searchParams: {
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
  fetchRide: async (rideId: string) => {
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
};

export default rideActions;
