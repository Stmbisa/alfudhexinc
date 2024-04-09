import { NextResponse } from "next/server";
import { connectToDb } from "@/lib/utils";
import { getUserIdFromRequest } from "@/lib/auth";
import { User } from "./models";

export default async function middleware(request) {
  const { pathname, method } = request;

  // protecting POST, PUT, DELETE routes
  if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
    connectToDb();

    // 2. Check if the user is authenticated
    const userId = getUserIdFromRequest(request);
    if (!userId) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 3. (Optional but recommended) Fetch user details for role-based authorization
    const user = await User.findById(userId);

    // 3.1 (Optional) Check for admin role
    if (!user.isAdmin && requiresAdmin(pathname)) {
      return NextResponse.json({ message: 'Unauthorized access' }, { status: 401 });
    }

  }
  return NextResponse.next();
}


// Helper function to determine admin-only routes
function requiresAdmin(pathname) {
  return pathname.startsWith('/api/admin') //|| ... ;
}
