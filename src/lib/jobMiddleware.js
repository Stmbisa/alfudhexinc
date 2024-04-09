import { Job, JobTracking } from "./models";
import { connectToDb } from "./utils";
import { getUserIdFromRequest } from "./auth";
import { NextResponse } from "next/server";



export default async function middleware(request) {
    const { pathname, nextUrl: url, method } = request;
    const slug = pathname.split('/')[2]; // in case like routes like /jobs/[slug]

    // Connect to the database
    connectToDb();

    // Get user from request headers
    const userId = getUserIdFromRequest(request);

    // Find the relevant job
    const job = await Job.findOne({ slug });
    if (!job) {
      return NextResponse.redirect(url.origin); // Redirect on job not found
    }

    // Access Control
    if (
      method === 'POST' ||
      method === 'PUT' ||
      method === 'DELETE' ||
      pathname.startsWith('/api/my-jobs/[slug]/track')
    ) {
      if (job.userId !== userId && !bookedOrOwner(job, userId)) {
        return NextResponse.redirect(url.origin); // Redirect on unauthorized access
      }
    }

    return NextResponse.next(); // Proceed if authorized
  }

  // Helper function to check if a user booked or created the job
  export async function bookedOrOwner(job, userId) {
    const jobTracking = await JobTracking.findOne({ jobId: job._id });
    return jobTracking && jobTracking.bookedBy === userId;
  }
