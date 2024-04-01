import { Shipping } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";
import middleware from '@/lib/middleware' // Your middleware

export const POST = middleware(async (request) => { // Authenticated routes
  try {
    connectToDb();

    // Get data from request body
    const { packageType, pickupLocation, destinationCountry, userId } = JSON.parse(request.body);

    const newShippingRequest = await Shipping.create({
      packageType,
      pickupLocation,
      destinationCountry,
      userId
    });

    return NextResponse.json(newShippingRequest);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create shipping request!");
  }
});


export const GET = async (request) => {
    try {
      connectToDb();

      const query = request.searchParams; // Access query parameters

      // Filtering 
      const filters = {};
      if (query.get('status')) {
        filters.status = query.get('status');
      }
      if (query.get('userId')) {
        filters.userId = query.get('userId');
      }

      const shippingRequests = await Shipping.find(filters)
        .populate('packageType');

      return NextResponse.json(shippingRequests);
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch shipping requests!");
    }
  };