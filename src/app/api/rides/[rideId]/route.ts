import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import Ride from "@/models/rides";

export async function GET(
  request: Request,
  context: { params: { rideId: string } }
) {
  try {
    const { params } = context;
    await connectDB();

    const { rideId } = params;
    console.log("Connected to MongoDB");
    console.log("rideId:", rideId);

    // if (!ObjectId.isValid(rideId)) {
    //   return NextResponse.json(
    //     { error: "Invalid ride ID format" },
    //     { status: 400 }
    //   );
    // }

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
