import { getUserIdFromRequest } from '@/lib/auth';
import { Job, JobTracking } from '@/lib/models';
import { connectToDb } from '@/lib/utils';
import { middleware } from '@/lib/middleware';
import { NextResponse } from 'next/server';

export const POST = middleware(async (request, { params }) => {
    const { slug } = params;

    try {
      connectToDb();

      // 1. Find the job
      const job = await Job.findOne({ slug });
      if (!job) {
        return NextResponse.json({ error: 'Job not found' }, { status: 404 });
      }

      // 2. Handle booking logic
      if (job.isBooked) {
        return NextResponse.json({ error: 'Job already booked' }, { status: 400 }); // Bad request
      }

      // 3. Get userId from request
      const userId = getUserIdFromRequest(request);

      // 4. Update Job document (isBooked: true)
      job.isBooked = true;
      await job.save();

      // 5. Update JobTracking
      await JobTracking.findOneAndUpdate(
        { jobId: job._id },
        { status: 'In Progress', bookedBy: userId }, // Job starts 'In Progress'
        { upsert: true } // Create the tracking entry if it doesn't exist
      );

      return NextResponse.json({ message: 'Job booked successfully'});
    } catch (err) {
      console.log(err);
      throw new Error("Failed to book job!");
    }
  });