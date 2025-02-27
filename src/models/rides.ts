import { Place } from "@/app/useSearch";
import mongoose from "mongoose";
const { Schema } = mongoose;
export interface Ride {
  _id: string;
  driverId: string;
  origin: Place | undefined;
  destination: Place | undefined;
  rideTime: {
    timeStemp: number;
    formattedData: {
      time: string;
      date: string;
    };
  };
  seats: number;
  selectedRouteIndex: number;
  passengers: {
    requests: string[];
    accepted: string[];
  };
}

const rideSchema = new Schema<Ride>({
  driverId: { type: String, required: true },
  origin: {
    description: { type: String, required: true },
    place_id: { type: String, required: true },
    geometry: {
      location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    },
  },
  destination: {
    description: { type: String, required: true },
    place_id: { type: String, required: true },
    geometry: {
      location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    },
  },
  rideTime: {
    timeStemp: { type: Number, required: true },
    formattedData: {
      time: { type: String, required: true },
      date: { type: String, required: true },
    },
  },
  seats: { type: Number, required: true },
  selectedRouteIndex: { type: Number, required: true },
  passengers: {
    requests: [{ type: String }],
    accepted: [{ type: String }],
  },
});

export default mongoose.model("Ride", rideSchema);
