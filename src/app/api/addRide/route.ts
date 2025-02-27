import Ride from "@/models/rides";

import { NextResponse } from "next/server";
import { connectDB } from "@/utils/db";

export const POST = async (request: Request) => {
  const body = await request.json();
  const newRide = new Ride(body);

  try {
    await connectDB();

    await newRide.save();

    return new NextResponse("Post has been created", { status: 201 });
  } catch (err) {
    return new NextResponse(`Database Error: ${err}`, { status: 500 });
  }
};
