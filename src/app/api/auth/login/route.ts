import { db } from "@/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const user = await db.user.findFirst({ where: { username, password } });
    if (!user) throw new Error("Invalid credential");
    return NextResponse.json(user);
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    } else {
      return NextResponse.json({ message: "Something bad happen" }, { status: 500 });
    }
  }
}
