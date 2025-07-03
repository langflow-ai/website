"use client";

import React, { useEffect, useRef, useState } from "react";
import { BlogPost } from "@/lib/types/sanity.types";
import { Post } from "./Post";

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
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [offset, setOffset] = useState<number>(initialOffset);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
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
    setLoading(true);
    try {
      const res = await fetch(`/api/posts?offset=${offset}&limit=${limit}`);
      if (!res.ok) throw new Error("Failed to load posts");

      const newPosts: BlogPost[] = await res.json();

      setPosts((prev) => [...prev, ...newPosts]);
      setOffset((prev) => prev + newPosts.length);

      if (newPosts.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
