import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Ride from "@/models/rides";

import mongoose from "mongoose";

export async function GET(
  request: Request,
  context: { params: { rideId: string } }
) {
  try {
    const { params } = context;
    await connectDB();
    const { rideId } = params;
    console.log("Attempting to fetch ride with ID:", rideId);

    if (!mongoose.Types.ObjectId.isValid(rideId)) {
      return NextResponse.json(
        { error: "Invalid ride ID format" },
        { status: 400 }
      );
    }

    const ride = await Ride.findById(rideId);

    if (!ride) {
      return NextResponse.json({ error: "Ride not found" }, { status: 404 });
    }

    return NextResponse.json(ride);
  } catch (error) {
    console.error("Error fetching ride:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: { rideId: string } }
) {
  try {
    const { params } = context;
    const { rideId } = params;
    const updatedRide = await request.json();

    await connectDB();

    const ride = await Ride.findByIdAndUpdate(rideId, updatedRide, {
      new: true,
    });

    if (!ride) {
      return NextResponse.json({ error: "Ride not found" }, { status: 404 });
    }

    return NextResponse.json(ride);
  } catch (error) {
    console.error("Error updating ride:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
