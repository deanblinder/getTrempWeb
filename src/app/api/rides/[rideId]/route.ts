// import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Ride from "@/models/rides";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const rideId = request.nextUrl.pathname.split("/").pop() as string;
    console.log("Attempting to fetch ride with ID:", rideId);

    if (!mongoose.Types.ObjectId.isValid(rideId)) {
      return Response.json(
        { error: "Invalid ride ID format" },
        { status: 400 }
      );
    }

    const ride = await Ride.findById(rideId);

    if (!ride) {
      return Response.json({ error: "Ride not found" }, { status: 404 });
    }

    return Response.json(ride);
  } catch (error) {
    console.error("Error fetching ride:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const rideId = request.nextUrl.pathname.split("/").pop() as string;
    const updatedRide = JSON.parse(await request.text());

    await connectDB();

    const ride = await Ride.findByIdAndUpdate(rideId, updatedRide, {
      new: true,
    });

    if (!ride) {
      return Response.json({ error: "Ride not found" }, { status: 404 });
    }

    return Response.json(ride);
  } catch (error) {
    console.error("Error updating ride:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
