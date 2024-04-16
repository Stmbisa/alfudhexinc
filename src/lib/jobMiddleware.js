import { NextResponse } from "next/server";
import { Job, JobTracking } from "./models";
import { connectToDb } from "./utils";
import { getUserIdFromRequest } from "./auth";

export default async function middleware(request) {
  const { nextUrl: url, method } = request;
  const slugSegments = url.pathname.split('/').filter(segment => segment !== '');

  let slugIndex = -1;
  for (let i = 0; i < slugSegments.length; i++) {
    if (slugSegments[i] === 'track') {
      slugIndex = i - 1;
      break;
    }
  }

  const slug = slugIndex !== -1 ? slugSegments[slugIndex] : null;

  if (!slug) {
    return NextResponse.next(); // No slug found, proceed to the next middleware or route handler
  }

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
      ['POST', 'PUT', 'DELETE'].includes(method) ||
      url.pathname.startsWith('/api/my-jobs/[slug]/track')
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
