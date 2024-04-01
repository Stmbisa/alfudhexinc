import { NextRequest, NextResponse } from "next/server";
import { Job, JobTracking, User } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { getUserIdFromRequest } from "./auth";

export async function middleware(request) {
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
    method === 'PUT' ||
    method === 'DELETE' ||
    pathname.startsWith('/api/jobs/[slug]/track')
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



export async function middleware(request) {
    const { pathname, method } = request;

    //  protecting POST routes
    if (method === 'POST') {
      connectToDb();

      // 2. Perform authorization checks.

      // 2.1 Check if the user is authenticated
      const userId = getUserIdFromRequest(request);
      if (!userId) {
          return NextResponse.redirect(new URL('/login', request.url)); // Redirect to login on failure
      }

      // 2.2 (Optional) Check for specific roles
      const user = await User.findById(userId);
      if (!user.isAdmin) {
        return NextResponse.json({ message: 'Unauthorized access' }, { status: 401 });
      }

    }

    return NextResponse.next();
  }
