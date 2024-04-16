import { NextResponse } from "next/server";
import { Job, JobTracking } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import jobMiddleware from '@/lib/jobMiddleware';

export const GET = async (request, { params }) => {
  const { slug } = params;

  try {
    connectToDb();

    const job = await Job.findOne({ slug })
      .populate('category')
      .populate('bookedBy', 'username');

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    const category = job.category ? job.category : null;
    const bookedBy = job.bookedBy ? job.bookedBy.username : null;

    return NextResponse.json({ job, category, bookedBy });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch job!");
  }
};


export const PUT = jobMiddleware(async (request, { params }) => {
  const { slug } = params;

  try {
    connectToDb();

    // Get update data from request body
    const updateData = JSON.parse(request.body);

    // Restrict updates if the job is completed
    const existingJob = await Job.findOne({ slug });
    if (existingJob.status === 'Completed') {
      return NextResponse.json({ error: 'Cannot update a completed job' }, { status: 400 }); // Bad request
    }

    const updatedJob = await Job.findOneAndUpdate(
      { slug },
      updateData,
      { new: true } // Return the updated document
    );

    if (!updatedJob) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json(updatedJob);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update job!");
  }
});



export const DELETE = jobMiddleware(async (request, { params }) => {
  const { slug } = params;

  try {
    connectToDb();

    const deletedJob = await Job.findOneAndDelete({ slug });

    if (!deletedJob) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Also delete the associated JobTracking entry
    await JobTracking.deleteOne({ jobId: deletedJob._id });

    return NextResponse.json({ message: "Job deleted" });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete job!");
  }
});

