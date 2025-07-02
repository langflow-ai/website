// Dependencies
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

// Types
import type { EventCard } from "@/lib/types/sanity";

const useEvents = (type: "upcoming" | "past") => {
  // Local State
  const [events, setEvents] = useState<EventCard[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // Hooks
  const searchParams = useSearchParams();

  // Actions
  const fetchEvents = useCallback(
    async (page: string | null, signal: AbortSignal) => {
      setLoading(true);
      const response = await fetch(
        `/api/events?type=${type}&page=${page || 1}`,
        {
          signal: signal,
        }
      );
      const data = await response.json();
      return data.data;
    },
    [type]
  );

  useEffect(() => {
    let mounted = true;
    const abortController = new AbortController();

    const page = searchParams.get("page");
    fetchEvents(page, abortController.signal)
      .then((data) => {
        if (mounted) {
          setCount(data.count);
          setEvents(data.results);
        }
      })
      .catch(console.error)
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
      abortController.abort();
    };
  }, [type, searchParams]);

  return { count, events, loading };
};

export default useEvents;
