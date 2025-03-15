import { NextRequest, NextResponse } from "next/server";
import Ride from "../../../../../models/rides";
import { connectDB } from "../../../../../utils/db";

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.pathname.split("/").pop() as string;
    console.log("Connected to MongoDB");
    await connectDB();
    // Find rides where the user is either a driver or a passenger
    const currentDate = new Date();
    const rides = await Ride.find({
      $and: [
        {
          $or: [
            { "driver.id": userId },
            { "passengers.accepted.userId": userId },
            { "passengers.requests.userId": userId },
          ],
        },
        { "rideTime.timeStemp": { $gt: currentDate } },
      ],
    }).sort({ "rideTime.timeStemp": 1 });

    if (!rides) {
      return NextResponse.json({ error: "No rides found" }, { status: 404 });
    }

    return NextResponse.json(rides);
  } catch (error) {
    console.error("Error fetching user rides:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
