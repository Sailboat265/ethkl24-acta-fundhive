import { NextRequest, NextResponse } from "next/server";
import dbConnect from "~~/lib/mongodb-connect";
import User from "~~/models/User";

// Handle POST request for /api/users/create
export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { address } = await req.json();

    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 });
    }

    const newUser = new User({ address });
    await newUser.save();

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
