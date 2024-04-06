import { Translation } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
      connectToDb();

      // Optional: Filter by language code or other fields (if needed)
      const query = request.searchParams;
      let filter = {};
      if (query.get('spokenLanguage')) {
        filter.spokenLanguage = query.get('spokenLanguage');
      }
      //  more filters will be aded here

      const translations = await Translation.find(filter);
      return NextResponse.json(translations);
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch translations!");
    }
  };


  export const POST = middleware(async (request) => { // Authenticated route
    try {
      connectToDb();

      // Get data from request body
      const { originLanguage, currentLocation, contact, spokenLanguage, targetLanguage, story } = JSON.parse(request.body);
        // i may ad
      const userId = getUserIdFromRequest(request);
      const newTranslation = await Translation.create({
        originLanguage,
        currentLocation,
        contact,
        spokenLanguage,
        targetLanguage,
        story,
        userId
      });

      return NextResponse.json(newTranslation);
    } catch (err) {
        console.log(err);
        throw new Error("Failed to create Trnslation service!");
    }
  });


