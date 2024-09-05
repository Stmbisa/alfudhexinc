import { Category } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectToDb();
    const categories = await Category.find();
    return NextResponse.json(categories);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Failed to fetch categories!" }, { status: 500 });
  }
}