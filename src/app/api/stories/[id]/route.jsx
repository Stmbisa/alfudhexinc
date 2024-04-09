import { getUserIdFromRequest } from "@/lib/auth";
import middleware from "@/lib/middleware";
import { Story } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";


export const GET = async (request, { params }) => {
    const { id } = params;

    try {
      connectToDb();

      const story = await Story.findById(id);
      if (!story) {
        return NextResponse.json({ error: 'Story not found' }, { status: 404 });
      }

      return NextResponse.json(story);
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch story!");
    }
  };




export const PUT = middleware(async (request, { params }) => {
    const { id } = params;

    try {
      connectToDb();

      // Get update data from request body
      const updateData = JSON.parse(request.body);

      // Enforce ownership
      const existingStory = await Story.findById(id);
      if (!existingStory || existingStory.userId !== getUserIdFromRequest(request)) {
        return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
      }


      const updatedStory = await Story.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      if (!updatedStory) {
        return NextResponse.json({ error: 'Story not found' }, { status: 404 });
      }

      return NextResponse.json(updatedStory);
    } catch (err) {
        console.log(err);
        throw new Error("Failed to upate story!");
    }
  });



export const DELETE = middleware(async (request, { params }) => {
    const { id } = params;

    try {
      connectToDb();

      const existingStory = await Story.findById(id);
      if (!existingStory || existingStory.userId !== getUserIdFromRequest(request)) {
        return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
      }

      const deletedStory = await Story.findByIdAndDelete(id);

      if (!deletedStory) {
        return NextResponse.json({ error: 'Story not found' }, { status: 404 });
      }

      return NextResponse.json({ message: "Story deleted" });
    } catch (err) {
        console.log(err);
        throw new Error("Failed to delete story!");
    }
  });

