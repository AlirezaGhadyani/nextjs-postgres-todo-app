import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { db } from "@/drizzle";
import { usersTable } from "@/drizzle/schema";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password)
      return NextResponse.json({
        isSucceed: false,
        error: "credentials not provided",
      });

    const hashedPassword = await hash(password, 10);

    const newUser = await db
      .insert(usersTable)
      .values({
        email,
        password: hashedPassword,
      })
      .returning({
        userId: usersTable.id,
        email: usersTable.email,
      });

    return NextResponse.json({ isSucceed: true, data: newUser[0] });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    if (error instanceof Error) {
      return NextResponse.json({ isSucceed: false, error: error.message });
    }
  }
}
