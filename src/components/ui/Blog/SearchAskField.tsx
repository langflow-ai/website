"use client";

import { useRef, useEffect, useReducer } from "react";
import Link from "@/components/ui/Link";
import Text from "@/components/ui/text";
import LoadingDots from "./LoadingDots";
import { reducer, initialState } from "./searchAskFieldReducer";
import styles from "./SearchAskField.module.scss";

interface SearchAskFieldProps {
  className?: string;
}

/**
 * SearchAskField renders an input that differentiates between a search
 * and a question (presence of a '?' in the input).
 *
 * - A question triggers a RAG-powered answer via `/api/ask`.
 * - Otherwise we perform a keyword search against Sanity via `/api/search`.
 *
 * Results (answer or posts) are rendered in an absolutely-positioned panel
 * directly underneath the input.
 */
export default function SearchAskField({ className }: SearchAskFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { query, loading, answer, searchResults, referencedPosts } = state;

  // Detect platform for shortcut display & handling
  const isMac =
    typeof window !== "undefined" &&
    /Mac|iPod|iPhone|iPad/.test(navigator.platform);

  // Register global key handler for ⌘K / Ctrl+K
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      const pressedK = e.key.toLowerCase() === "k";
      const isShortcut =
        (isMac && e.metaKey && pressedK) || (!isMac && e.ctrlKey && pressedK);
      if (isShortcut) {
        e.preventDefault();
        // Focus the input field
        inputRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [isMac]);

  const hasPanel =
    loading ||
    answer !== null ||
    searchResults !== null ||
    referencedPosts !== null;

  // Track ongoing fetch for cancellation
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!hasPanel) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        dispatch({ type: "RESET" });
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hasPanel]);

  // Abort any pending request on unmount
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !query.trim()) return; // prevent double submissions when loading

    // Cancel previous pending request if any
    abortRef.current?.abort();

    dispatch({ type: "RESET" });
    dispatch({ type: "START_LOADING" });

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      if (query.includes("?")) {
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: query }),
          signal: controller.signal,
        });

        if (!res.body) {
          throw new Error("No response body");
        }

        dispatch({ type: "STOP_LOADING" });
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let buffer = "";
        const sentinel = "###REFS###";

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          if (value) {
            const chunk = decoder.decode(value, { stream: true });
            buffer += chunk;

            // Check for sentinel indicating references start
            const idx = buffer.indexOf(sentinel);
            if (idx !== -1) {
              const remaining = buffer.slice(0, idx);
              if (remaining) {
                if (loading) dispatch({ type: "STOP_LOADING" });
                dispatch({ type: "APPEND_ANSWER", payload: remaining });
              }

              const refsJSON = buffer.slice(idx + sentinel.length);
              try {
                const parsed = JSON.parse(refsJSON);
                dispatch({ type: "SET_REFERENCED_POSTS", payload: parsed });
              } catch (err) {
                console.error("Failed to parse references", err);
              }
              done = true;
              break;
            } else {
              if (buffer) {
                if (loading) dispatch({ type: "STOP_LOADING" });
                dispatch({ type: "APPEND_ANSWER", payload: buffer });
                buffer = "";
              }
            }
          }
          done = doneReading;
        }
      } else {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        dispatch({
          type: "SET_SEARCH_RESULTS",
          payload: Array.isArray(data.posts) ? data.posts : [],
        });
      }
    } catch (error: any) {
      if (error?.name === "AbortError") {
        // Request was cancelled; no action needed
        return;
      }
      console.error(error);
      dispatch({
        type: "APPEND_ANSWER",
        payload: "Something went wrong. Please try again later.",
      });
    } finally {
      dispatch({ type: "STOP_LOADING" });
      abortRef.current = null;
    }
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", width: "100%" }}
    >
      <form onSubmit={handleSubmit} className="d-flex align-items-end gap-2">
        <div
          className="d-flex flex-column gap-2 position-relative"
          style={{ flex: 1, fontSize: "0.9rem" }}
        >
          <label
            className="w-100 d-grid gap-1"
            style={{ position: "relative" }}
          >
            Search or ask...
            <input
              type="text"
              placeholder="How do I host Langflow?"
              value={query}
              onChange={(e) =>
                dispatch({ type: "SET_QUERY", payload: e.target.value })
              }
              style={{ height: "48px" }}
              className={`form-control bg-black text-white border-dark p-2 px-3 ${styles.inputField}`}
              disabled={loading}
              ref={inputRef}
            />
            {/* Shortcut indicator */}
            <span className={`${styles.shortcutIndicator}`}>
              {isMac ? "⌘K" : "Ctrl+K"}
            </span>
          </label>
          {/* Results Panel */}
          {(loading ||
            answer ||
            (searchResults && searchResults.length >= 0)) && (
            <div
              className="bg-black position-absolute bg-opacity-75 border border-dark shadow border-top-0 rounded-bottom-4 p-4 mx-2"
              style={{
                backdropFilter: "blur(10px)",
                left: 0,
                right: 0,
                top: "calc(100% - 1px)",
                zIndex: 10,
              }}
            >
              {loading && <LoadingDots />}

              {answer && (
                <Text size={300} tagName="p" className="m-0">
                  {answer}
                </Text>
              )}

              {/* Links to referenced posts when answering a question */}
              {referencedPosts && referencedPosts.length > 0 && !loading && (
                <div className="d-grid gap-1 mt-2">
                  {referencedPosts.map((rp) =>
                    rp.slug ? (
                      <Link
                        key={rp._id}
                        href={`/blog/${rp.slug}`}
                        style={{ color: "#85efac" }}
                        className="text-decoration-none"
                      >
                        <Text size={300} tagName="span">
                          ↳ {rp.title}
                        </Text>
                      </Link>
                    ) : null
                  )}
                </div>
              )}

              {searchResults && !loading && (
                <div className="d-grid gap-2">
                  {searchResults.length === 0 ? (
                    <Text size={200}>No posts found.</Text>
                  ) : (
                    searchResults.map((post, index) => (
                      <>
                        <Link
                          key={`${post._id}-${index}`}
                          href={`/blog/${post.slug?.current}`}
                          className="text-decoration-none"
                        >
                          <div className="d-flex flex-column">
                            <strong style={{ color: "#85efac" }}>
                              &rarr; {post.title}
                            </strong>
                            {post.excerpt && (
                              <span
                                className="text-white"
                                style={{ fontSize: "0.9rem" }}
                              >
                                {post.excerpt}
                              </span>
                            )}
                          </div>
                        </Link>
                        {index < searchResults.length - 1 && <hr />}
                      </>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        <button
          className="btn btn-primary bg-white text-black px-4 fw-bold"
          style={{ height: "48px" }}
          disabled={loading || !query.trim()}
        >
          Go
        </button>
      </form>
    </div>
  );
}
