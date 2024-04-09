import { Job, JobTracking } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";
import jobMiddleware from '@/lib/jobMiddleware'
import { getUserIdFromRequest } from "@/lib/auth";

export const POST = jobMiddleware(async (request, { params }) => {
  const { slug } = params;

  try {
    connectToDb();

    // Get status update and userId from request body
    const { status, bookedBy } = JSON.parse(request.body);

    const job = await Job.findOne({ slug });
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    const userId = getUserIdFromRequest(request);
    // Update the job tracking entry
    const updatedTracking = await JobTracking.findOneAndUpdate(
      { jobId: job._id },
      { status, bookedBy: userId },
      { new: true }
    );

    return NextResponse.json(updatedTracking);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update job tracking!");
  }
});
