import { AddRideFormData } from "../add/useAddRide";
import { Place } from "../useSearch";

const rideActions = {
  addRide: async (formState: AddRideFormData) => {
    await fetch("/api/ride", {
      method: "POST",
      body: JSON.stringify({
        id: "",
        driverId: "",
        origin: formState.origin,
        destination: formState.destination,
        date: formState.date,
        time: formState.time,
        seats: formState.seats,
        selectedRouteIndex: formState.selectedRouteIndex,
        passengers: {
          requests: [],
          accepted: [],
        },
      }),
    });
  },
  searchRides: async (searchParams: {
    origin?: Place;
    destination?: Place;
    rideTime?: {
      timeStemp: number;
      formattedData: {
        time: string;
        date: string;
      };
    };
    radius?: number;
  }) => {
    const response = await fetch("/api/ride/search", {
      method: "GET",
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
};

export default rideActions;
