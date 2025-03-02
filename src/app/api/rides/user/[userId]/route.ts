import { NextResponse } from "next/server";
import Ride from "../../../../../models/rides";
import { connectDB } from "../../../../../utils/db";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    console.log("Connected to MongoDB");
    await connectDB();
    // Find rides where the user is either a driver or a passenger
    const rides = await Ride.find({
      $or: [
        { "driver.id": userId },
        { "passengers.accepted": { $elemMatch: { id: userId } } },
        { "passengers.requests": { $elemMatch: { id: userId } } },
      ],
    });

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
