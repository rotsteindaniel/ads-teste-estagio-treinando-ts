import { NextResponse } from "next/server";


export async function GET() {
  return NextResponse.json({ message: "Hello User GET" }, { status: 200 });
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
