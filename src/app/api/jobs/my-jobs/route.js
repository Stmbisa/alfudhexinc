import { NextResponse, NextRequest } from "next/server";
import { getUserIdFromRequest } from '@/lib/auth';
import { connectToDb } from "@/lib/utils";
import { Job } from "@/lib/models";

export const GET = async (request) => {
  try {
    connectToDb();
    const userId = await getUserIdFromRequest(request); // Await the Promise

    const myJobs = await Job.find({ userId });
    return NextResponse.json(myJobs);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user jobs!");
  }
};