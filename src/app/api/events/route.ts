// Dependencies
import { NextResponse } from "next/server";
import { getAllEvents } from "@/lib/mdx";

// Constants
const ITEMS_PER_PAGE = 10;

/**
 * Handle events API - filter by upcoming or past events
 *
 * @param {Request} request
 * @return {Response}
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const perPage = parseInt(searchParams.get("perPage") ?? `${ITEMS_PER_PAGE}`);
  const type = searchParams.get("type") || "upcoming";

  const today = new Date();
  const currentPage = page - 1;
  const start = currentPage * perPage;
  const end = currentPage * perPage + perPage;

  if (!["upcoming", "past"].includes(type)) {
    return NextResponse.json({
      data: {
        count: 0,
        results: [],
      },
    });
  }

  // Get all events from MDX files
  const allEvents = await getAllEvents();

  // Filter events based on type (upcoming or past)
  const filteredEvents = allEvents.filter((event) => {
    const eventDate = event.dates?.[0]?.date || "";
    const eventDateTime = new Date(eventDate);
    const isUpcoming = eventDateTime >= today;
    return type === "upcoming" ? isUpcoming : !isUpcoming;
  });

  // Apply pagination
  const paginatedEvents = filteredEvents.slice(start, end);

  // Transform to match the expected API response format
  const results = paginatedEvents.map((event) => ({
    title: event.title,
    slug: event.slug?.current || event._id,
    description: event.excerpt || "",
    type: event.type,
    dates: event.dates,
    location: event.location,
    thumbnail: event.thumbnail,
    _updatedAt: event._updatedAt,
  }));

  return NextResponse.json({
    data: {
      count: filteredEvents.length,
      results,
    },
  });
}

export const OPTIONS = async () => {
  return NextResponse.json({});
};
