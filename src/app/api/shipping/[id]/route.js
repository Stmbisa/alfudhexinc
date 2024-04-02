import { Shipping } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";
import middleware from '@/lib/middleware';


export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    connectToDb();

    const shippingRequest = await Shipping.findById(id)
      .populate('packageType');

    if (!shippingRequest) {
      return NextResponse.json({ error: 'Shipping request not found' }, { status: 404 });
    }

    return NextResponse.json(shippingRequest);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch shipping request!");
  }
};



export const PUT = middleware(async (request, { params }) => {
    const { id } = params;

    try {
        connectToDb();

        // Get update data from request body (ensure correct shape of data)
        const updateData = JSON.parse(request.body);

            // Ownership check
        const shippingRequest = await Shipping.findById(id);
        if (!shippingRequest || shippingRequest.userId !== getUserIdFromRequest(request)) {
        return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
        }

        // Find the shipping request by its ID and update it
        const updatedRequest = await Shipping.findByIdAndUpdate(
          id,
          updateData,
          { new: true } // Return the updated document
        );

        if (!updatedRequest) {
          return NextResponse.json({ error: 'Shipping request not found' }, { status: 404 });
        }

        return NextResponse.json(updatedRequest);
      } catch (err) {
        console.log(err);
        throw new Error("Failed to update shipping request!");
      }
});


export const DELETE = middleware(async (request, { params }) => {
    const { id } = params;

    try {
      connectToDb();

      // Ownership check
      const shippingRequest = await Shipping.findById(id);
        if (!shippingRequest || shippingRequest.userId !== getUserIdFromRequest(request)) {
        return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
        }

      // Find the shipping request and delete it
      const deletedRequest = await Shipping.findByIdAndDelete(id);

      if (!deletedRequest) {
        return NextResponse.json({ error: 'Shipping request not found' }, { status: 404 });
      }

      return NextResponse.json({ message: "Shipping request deleted" });
    } catch (err) {
      console.log(err);
      throw new Error("Failed to delete shipping request!");
    }
  });


