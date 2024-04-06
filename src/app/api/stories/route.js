import { getUserIdFromRequest } from "@/lib/auth";
import { Story } from "@/lib/models";
import { connectToDb } from "@/lib/utils";

export const GET = async (request) => {
    try {
      connectToDb();

      const query = request.searchParams;
      let filter = {};
      if (query.get('isPublic') === 'true') {
        filter.isPublic = true;
      }
      if (query.get('userId')) {
        filter.userId = query.get('userId');
      }

      const stories = await Story.find(filter);
      return NextResponse.json(stories);
    } catch (err) {
      return err
    }
  };



export const POST = middleware(async (request) => { // Authenticated routes
  try {
    connectToDb();

    // Get data from request body
    const { title, content } = JSON.parse(request.body);

    // Get userId from the session
    const userId = getUserIdFromRequest(request);

    const newStory = await Story.create({
      title,
      content,
      userId
    });

    return NextResponse.json(newStory);
  } catch (err) {
    return err
  }
});
