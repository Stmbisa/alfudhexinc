import { NextResponse } from "next/server";
import { Job, JobTracking } from "./models";
import { connectToDb } from "./utils";
import { getUserIdFromRequest } from "./auth";

export default async function middleware(request, context) {
  const { nextUrl: url, method } = request;
  const { slug } = context.params || {};

  // Connect to the database
  connectToDb();

  // Get user from request headers
  const userId = getUserIdFromRequest(request);

  // Find the relevant job
  const job = slug ? await Job.findOne({ slug }) : null;

  if (!job) {
    // Handle the case when no job is found
    return NextResponse.redirect(url.origin);
  }

  // Access Control
  if (
    ['POST', 'PUT', 'DELETE'].includes(method) ||
    url.pathname.includes('/api/my-jobs/[slug]/track')
  ) {
    if (job.userId !== userId && !(await bookedOrOwner(job, userId))) {
      return NextResponse.redirect(url.origin); // Redirect on unauthorized access
    }
  }

  return NextResponse.next(); // Proceed if authorized
}

// Helper function to check if a user booked or created the job
async function bookedOrOwner(job, userId) {
  const jobTracking = await JobTracking.findOne({ jobId: job._id });
  return jobTracking && jobTracking.bookedBy === userId;
}