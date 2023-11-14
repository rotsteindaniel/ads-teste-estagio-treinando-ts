import { NextResponse } from "next/server";

import users from "@/db.js";

export async function GET() {
  return NextResponse.json(users, { status: 200 });
}

export async function POST() {
  return NextResponse.json({ message: "Hello User POST" }, { status: 200 });
}

export async function PUT() {
  return NextResponse.json({ message: "Hello User PUT" }, { status: 200 });
}

export async function DELETE() {
  return NextResponse.json({ message: "Hello User DELETE" }, { status: 200 });
}
