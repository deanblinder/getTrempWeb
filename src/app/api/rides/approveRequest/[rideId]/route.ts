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

    // Check if user is in requests array
    const requestIndex = ride.passengers.requests.findIndex(
      request => request.userId === userId
    );

    if (requestIndex === -1) {
      return NextResponse.json(
        { error: "User has not requested to join this ride" },
        { status: 400 }
      );
    }

    // Check if there are available seats
    if (ride.seats <= 0) {
      return NextResponse.json(
        { error: "No available seats in this ride" },
        { status: 400 }
      );
    }

    // Check if user is already accepted
    const isAlreadyAccepted = ride.passengers.accepted.some(
      passenger => passenger.userId === userId
    );

    if (isAlreadyAccepted) {
      return NextResponse.json(
        { error: "User is already accepted in this ride" },
        { status: 400 }
      );
    }

    // Remove user from requests array
    ride.passengers.requests.splice(requestIndex, 1);

    // Add user to accepted array with timestamp
    ride.passengers.accepted.push({ userId, timestamp: Date.now() });

    // Decrement available seats
    ride.seats -= 1;

    await ride.save();

    return NextResponse.json({
      message: "Request approved successfully",
      ride,
    });
  } catch (error) {
    console.error("Error approving ride request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
