import { getUserIdFromRequest } from "@/lib/auth";
import { middleware } from "@/lib/middleware";
import { Job, JobTracking } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    connectToDb();

    // will add filtering/pagination options here later

    const jobs = await Job.find()
      .populate('category') // Include associated category data
      .populate('bookedBy', 'username'); // Include username of the booker

    return NextResponse.json(jobs);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch jobs!");
  }
};

export const POST = middleware(async (request) => {
  try {
    console.log("API route reached");
    await connectToDb();
    console.log("Connected to database");
    const userId = await getUserIdFromRequest(request);
    console.log("User ID:", userId);
    const {
      category,
      title,
      description,
      location,
      pricePerHour,
      estimatedHours
    } = await request.json();

    const newJob = await Job.create({
      category,
      title,
      description,
      location,
      pricePerHour,
      estimatedHours,
      userId
    });

    await JobTracking.create({
      jobId: newJob._id,
      bookedBy: userId
    });

    return NextResponse.json(newJob);
  } catch (err) {
    console.error("API Route Error:", err);
    return NextResponse.json({ error: "Failed to create job!" }, { status: 500 });
  }
});