import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";
import { getUserIdFromRequest } from "@/lib/auth";
import { User, Job, JobTracking } from "./models";

export async function middleware(request) {
  const { pathname, method } = request;

  // Exclude paths or routes that don't require authentication or authorization
  const isPublicRoute = isPublicPath(pathname);
  if (isPublicRoute) {
    return NextResponse.next();
  }

  connectToDb();

  // Check if the user is authenticated
  const userId = getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Fetch user details for role-based authorization
  const user = await User.findById(userId);

  // Check for admin role or other authorization rules
  if (!user.isAdmin && requiresAdmin(pathname)) {
    return NextResponse.json({ message: 'Unauthorized access' }, { status: 401 });
  }

  // Check if the request is related to a job
  const jobSlug = getJobSlugFromPath(pathname);
  if (jobSlug) {
    const job = await Job.findOne({ slug: jobSlug });
    if (job) {
      // Check if the user booked or created the job
      const isAuthorized = await bookedOrOwner(job, userId);
      if (!isAuthorized) {
        return NextResponse.json({ message: 'Unauthorized access' }, { status: 401 });
      }
    }
  }

  return NextResponse.next();
}

// Helper function to check if a user booked or created the job
async function bookedOrOwner(job, userId) {
  const jobTracking = await JobTracking.findOne({ jobId: job._id });
  return jobTracking && (jobTracking.bookedBy === userId || job.userId === userId);
}

// Helper function to check if a path is public (no authentication or authorization required)
function isPublicPath(path) {
  const publicPaths = ['/login', '/register', '/public-page'];
  // Add more paths as needed
  return publicPaths.includes(path);
}

// Helper function to check if a path requires admin access
function requiresAdmin(path) {
  const adminPaths = ['/admin', '/admin/dashboard'];
  // Add more admin paths as needed
  return adminPaths.includes(path);
}

// Helper function to extract the job slug from the path
function getJobSlugFromPath(path) {
  const slugRegex = /\/jobs\/([\w-]+)/;
  const match = path.match(slugRegex);
  return match ? match[1] : null;
}