import Ride from "@/models/rides";

import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    await connectDB();
    const newRide = new Ride(body);
    await newRide.save();

    return NextResponse.json(
      { message: "Ride has been created", ride: newRide },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating ride:", err);
    return new NextResponse(`Database Error: ${err}`, { status: 500 });
  }
};
