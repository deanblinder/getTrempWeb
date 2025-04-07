import { Place } from "@/app/useSearch";
import Ride from "@/models/rides";
import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";

const isLocationWithinDistance = (
  place1: Place,
  place2: Place,
  radius: number
): boolean => {
  const lat1 = place1.geometry.location.lat;
  const lon1 = place1.geometry.location.lng;
  const lat2 = place2.geometry.location.lat;
  const lon2 = place2.geometry.location.lng;
  // Radius of the Earth in kilometers (mean value)
  const R = 6371.0;

  // Convert latitude and longitude from degrees to radians
  const radLat1 = (Math.PI * lat1) / 180;
  const radLon1 = (Math.PI * lon1) / 180;
  const radLat2 = (Math.PI * lat2) / 180;
  const radLon2 = (Math.PI * lon2) / 180;

  // Haversine formula
  const dLon = radLon2 - radLon1;
  const dLat = radLat2 - radLat1;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance <= radius;
};

export const POST = async (request: Request) => {
  const { origin, destination, date, radius = 10 } = await request.json();
  if (!origin || !destination || !date || !radius) {
    return new NextResponse("Missing required parameters", { status: 400 });
  }

  console.log("Connecting to database...");

  try {
    await connectDB();

    const rides = await Ride.find({
      "rideTime.timeStemp": {
        $gte: new Date(new Date(date).setHours(0, 0, 0, 0)),
        $lt: new Date(new Date(date).getTime() + 3 * 24 * 60 * 60 * 1000),
      },
    });

    // Filter rides based on origin and destination within radius
    const relevantRides = rides.filter((ride) => {
      const isOriginNearby = isLocationWithinDistance(
        origin,
        ride.origin as Place,
        radius
      );
      const isDestinationNearby = isLocationWithinDistance(
        destination,
        ride.destination as Place,
        radius
      );

      return isOriginNearby && isDestinationNearby;
    });

    return new NextResponse(JSON.stringify(relevantRides), { status: 200 });
  } catch (err) {
    return new NextResponse(`Database Error: ${err}`, { status: 500 });
  }
};
