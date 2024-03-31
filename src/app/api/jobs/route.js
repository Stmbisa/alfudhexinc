import { Job, JobTracking } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    connectToDb();

    // Add filtering/pagination options here if needed

    const jobs = await Job.find()
      .populate('category') // Include associated category data
      .populate('bookedBy', 'username'); // Include username of the booker

    return NextResponse.json(jobs);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch jobs!");
  }
};

export const POST = async (request) => {
  try {
    connectToDb();

    // Get data from request body (ensure correct shape)
    const { category, title, description, location, pricePerHour, estimatedHours, userId } = JSON.parse(request.body);

    const newJob = await Job.create({
      category,
      title,
      description,
      location,
      pricePerHour,
      estimatedHours,
      userId
    });

    // Create initial entry into job tracking
    await JobTracking.create({
      jobId: newJob._id,
      bookedBy: userId // Initially booked by the creator
    });

    return NextResponse.json(newJob);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create job!");
  }
};