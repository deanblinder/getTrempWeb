import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../utils/db";
import Ride from "../../../../../models/rides";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.pathname.split("/").pop() as string;

    if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: "Invalid user ID format" },
        { status: 400 }
      );
    }

    await connectDB();

    // Find all future rides where the user is the driver and get all requests
    const currentDate = new Date();
    const rides = await Ride.find({
      $and: [
        { "driver.id": userId },
        { "rideTime.timeStemp": { $gt: currentDate } },
      ],
    });
    const allRequests = rides.reduce(
      (requests: { userId: string; timestamp: number }[], ride) => {
        if (ride.passengers && ride.passengers.requests) {
          requests.push(...ride.passengers.requests);
        }
        return requests;
      },
      []
    );

    // sort requests by timestamp
    allRequests.sort((a, b) => a.timestamp - b.timestamp);

    // Create a unique identifier for the request set

    return NextResponse.json({
      requests: allRequests,
    });
  } catch (error) {
    console.error("Error fetching ride requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch ride requests" },
      { status: 500 }
    );
  }
}
