import { NextResponse, NextRequest } from "next/server";
import { getUserIdFromRequest } from '@/lib/auth';
import { connectToDb } from "@/lib/utils";

export const GET = async (request) => {
  // ... authentication middleware will be considered in the future as in jobs[slug]
  const userId = getUserIdFromRequest(request);

  try {
    connectToDb();

    const myJobs = await Job.find({ userId });

    return NextResponse.json(myJobs);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user jobs!");
  }
};