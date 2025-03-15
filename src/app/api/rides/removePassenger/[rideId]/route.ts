import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Ride from "@/models/rides";
import mongoose from "mongoose";

export async function PUT(request: NextRequest) {
  try {
    const rideId = request.nextUrl.pathname.split("/").pop() as string;
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(rideId)) {
      return NextResponse.json(
        { error: "Invalid ride ID format" },
        { status: 400 }
      );
    }

    await connectDB();

    const ride = await Ride.findById(rideId);

    if (!ride) {
      return NextResponse.json({ error: "Ride not found" }, { status: 404 });
    }

    // Check if user is in accepted passengers
    const isAcceptedPassenger = ride.passengers.accepted.some(
      passenger => passenger.userId === userId
    );

    if (!isAcceptedPassenger) {
      return NextResponse.json(
        { error: "User is not a passenger in this ride" },
        { status: 400 }
      );
    }

    // Remove user from accepted array and increment seats
    ride.passengers.accepted = ride.passengers.accepted.filter(
      passenger => passenger.userId !== userId
    );
    ride.seats += 1;

    await ride.save();

    return NextResponse.json({
      message: "Passenger removed successfully",
      ride,
    });
  } catch (error) {
    console.error("Error removing passenger:", error);
    return NextResponse.json(
      { error: "Failed to remove passenger" },
      { status: 500 }
    );
  }
}
