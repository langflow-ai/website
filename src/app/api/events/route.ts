// Dependencies
import { NextResponse } from "next/server";

// Types
import { EventCard } from "@/lib/types/sanity";

// Backend
import { sanityFetch } from "@/lib/backend/sanity/client";

// Queries
import {
  API_GET_UPCOMING_EVENTS_QUERY,
  API_GET_ON_DEMAND_EVENTS_QUERY,
} from "@/lib/backend/sanity/queries";

// Constants
const ITEMS_PER_PAGE = 10;
const QUERIES_BY_TYPE: Record<string, string> = {
  upcoming: API_GET_UPCOMING_EVENTS_QUERY,
  past: API_GET_ON_DEMAND_EVENTS_QUERY,
};

/**
 * Handle Preview mode feature to enable the usage of preview features
 *
 * @param {Request} request
 * @return {Response}
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const perPage = parseInt(searchParams.get("perPage") ?? `${ITEMS_PER_PAGE}`);
  const type = searchParams.get("type") || "upcoming";

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

  const { count, results } = await sanityFetch<{
    count: number;
    results: EventCard[];
  }>(
    QUERIES_BY_TYPE[type],
    {
      start: start,
      end: end,
    },
  );

  return NextResponse.json({
    data: {
      count,
      results,
    },
  });
}

export const OPTIONS = async () => {
  return NextResponse.json({});
};
