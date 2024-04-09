import { Translation } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";
import { middleware } from '@/lib/middleware';

export const PUT = middleware(async (request, { params }) => {
  const { id } = params;

  try {
    connectToDb();

    // Get update data from request body
    const updateData = JSON.parse(request.body);

    const updatedTranslation = await Translation.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedTranslation) {
      return NextResponse.json({ error: 'Translation not found' }, { status: 404 });
    }

    return NextResponse.json(updatedTranslation);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update translation!");
  }
});