import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import User from "@/models/user";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const userData = await request.json();

    const user = await User.create(userData);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}