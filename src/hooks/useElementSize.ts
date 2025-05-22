// Dependencies
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Get the element size based on bounding client rect or client size
 *
 * @param {Element | HTMLElement HTMLDivElement} el
 * @returns {width: number; height: number}
 */
const getElementSize = (el: Element | HTMLElement | HTMLDivElement) => {
  const height = el?.getBoundingClientRect().height || el?.clientHeight || 0;
  const width = el?.getBoundingClientRect().width || el?.clientWidth || 0;

  return { height, width };
};

const useElementSize = (ref: HTMLElement | HTMLDivElement | null) => {
  // Local State
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  // Supports Resize Observer Hook
  const noop = typeof ResizeObserver === "undefined";

  // Refs
  const observer = useRef<ResizeObserver | null>(null);

  // Handlers
  const handleResize = useCallback(() => {
    if (!window || !document) {
      return;
    }

    if (!ref) {
      return;
    }

    const { height, width } = getElementSize(ref);
    setHeight(height);
    setWidth(width);
  }, [ref]);

  useEffect(() => {
    if (noop) {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    // If resize observer is supported
    if (!!ref && !noop) {
      const callback: ResizeObserverCallback = (entries) => {
        for (const entry of entries) {
          const { height, width } = getElementSize(entry.target);
          setHeight(height);
          setWidth(width);
        }
      };

      setTimeout(() => {
        observer.current = new ResizeObserver(callback);
        observer.current?.observe(ref);
      }, 2000);
    }

    return () => {
      if (noop) {
        window.removeEventListener("resize", handleResize);
      }

      // If Resize observer is valid
      if (observer.current) {
        observer.current.disconnect();
        observer.current = null;
      }
    };
  }, [ref, handleResize, noop]);

  return { height, width };
};

export default useElementSize;
