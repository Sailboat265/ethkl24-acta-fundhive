import { NextRequest, NextResponse } from "next/server";
import dbConnect from "~~/lib/mongodb-connect";
import User from "~~/models/User";

// Handle GET request for /api/users/list
export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await User.countDocuments();

    return NextResponse.json({
      data: users,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
