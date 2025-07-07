"use client";

import React, { useEffect, useRef, useReducer } from "react";
import { BlogPost } from "@/lib/types/sanity.types";
import { Post } from "./Post";
import { postsFeedReducer, initialPostsFeedState } from "./postsFeedReducer";

interface PostsFeedProps {
  initialPosts: BlogPost[];
  initialOffset: number;
  limit?: number;
}

const PostsFeed: React.FC<PostsFeedProps> = ({
  initialPosts,
  initialOffset,
  limit = 7,
}) => {
  const [state, dispatch] = useReducer(
    postsFeedReducer,
    initialPostsFeedState(initialPosts, initialOffset)
  );
  const { posts, offset, loading, hasMore } = state;
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          fetchMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [sentinelRef.current, loading, hasMore]);

  const fetchMore = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const res = await fetch(`/api/posts?offset=${offset}&limit=${limit}`);
      if (!res.ok) throw new Error("Failed to load posts");

      const newPosts: BlogPost[] = await res.json();

      dispatch({ type: "ADD_POSTS", payload: newPosts });

      if (newPosts.length < limit) {
        dispatch({ type: "SET_HAS_MORE", payload: false });
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <>
      <div className="row">
        {posts.map((post) => (
          <div key={post._id} className="p-4 col-md-6">
            <Post post={post} />
          </div>
        ))}
      </div>
      {/* Sentinel for IntersectionObserver */}
      {hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}
      {loading && (
        <p className="text-center text-secondary py-4">Loading more posts…</p>
      )}
    </>
  );
};

export default PostsFeed;
