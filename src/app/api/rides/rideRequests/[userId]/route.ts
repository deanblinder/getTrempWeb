/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Ride from "@/models/rides";

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.pathname.split("/").pop() as string;

    await connectDB();

    // Find rides where the user is in the requests array
    const rides = await Ride.find({
      "passengers.requests": { $elemMatch: { id: userId } },
    }).sort({ "rideTime.timeStemp": 1 });

    if (!rides) {
      return NextResponse.json([]);
    }

    return NextResponse.json(rides);
  } catch (error) {
    console.error("Error fetching user ride requests:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.nextUrl.pathname.split("/").pop() as string;
    const { rideId } = await request.json();

    if (!rideId) {
      return NextResponse.json(
        { error: "Ride ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const ride = await Ride.findById(rideId);

    if (!ride) {
      return NextResponse.json({ error: "Ride not found" }, { status: 404 });
    }

    // Check if user is already in requests
    const isAlreadyRequested = ride.passengers.requests.some(
      (request: any) => request.id === userId
    );

    if (isAlreadyRequested) {
      return NextResponse.json(
        { error: "User has already requested to join this ride" },
        { status: 400 }
      );
    }

    // Add user to requests array
    ride.passengers.requests.push(userId);
    await ride.save();

    return NextResponse.json({
      message: "Request added successfully",
      ride,
    });
  } catch (error) {
    console.error("Error adding ride request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
