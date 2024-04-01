import { NextResponse } from "next/server";
import { Job, JobTracking } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

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

    return NextResponse.json(job);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch job!");
  }
};