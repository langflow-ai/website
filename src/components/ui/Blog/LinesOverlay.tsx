"use client";

import React, { useLayoutEffect, useState } from "react";

/**
 * LinesOverlay draws glowing curved SVG paths connecting blog post cards.
 * Endpoints sit on the nearest border of each card, with small "connect dots"
 * rendered at intersection points. Re-measures on window resize.
 */
const LinesOverlay: React.FC = () => {
  type Point = { x: number; y: number };
  type Edge = { start: Point; end: Point };

  const [edges, setEdges] = useState<Edge[]>([]);
  const [dots, setDots] = useState<Point[]>([]);

  /**
   * Given a rectangle (relative to section) and a normalized direction vector,
   * return the point where a ray from the center exits the rectangle.
   */
  const getBorderPoint = (
    rect: { left: number; top: number; right: number; bottom: number },
    center: Point,
    dir: Point
  ): Point => {
    const { left, top, right, bottom } = rect;
    let tX = Number.POSITIVE_INFINITY;
    if (dir.x !== 0) {
      tX = dir.x > 0 ? (right - center.x) / dir.x : (left - center.x) / dir.x;
    }
    let tY = Number.POSITIVE_INFINITY;
    if (dir.y !== 0) {
      tY = dir.y > 0 ? (bottom - center.y) / dir.y : (top - center.y) / dir.y;
    }
    const t = Math.min(tX, tY);
    return { x: center.x + dir.x * t, y: center.y + dir.y * t };
  };

  const measure = () => {
    if (typeof window === "undefined") return;

    const section = document.getElementById("blog-section");
    if (!section) return;

    const sectionRect = section.getBoundingClientRect();

    const cards = Array.from(
      section.querySelectorAll<HTMLElement>(".post-card")
    );

    if (cards.length < 2) {
      setEdges([]);
      setDots([]);
      return;
    }

    const centers: Point[] = cards.map((card) => {
      const rect = card.getBoundingClientRect();
      return {
        x: rect.left - sectionRect.left + rect.width / 2,
        y: rect.top - sectionRect.top + rect.height / 2,
      };
    });

    const localRects = cards.map((card) => {
      const rect = card.getBoundingClientRect();
      return {
        left: rect.left - sectionRect.left,
        top: rect.top - sectionRect.top,
        right: rect.left - sectionRect.left + rect.width,
        bottom: rect.top - sectionRect.top + rect.height,
      };
    });

    const newEdges: Edge[] = [];
    const newDots: Point[] = [];

    for (let i = 0; i < centers.length - 1; i++) {
      const startCenter = centers[i];
      const endCenter = centers[i + 1];
      const dirVec = {
        x: endCenter.x - startCenter.x,
        y: endCenter.y - startCenter.y,
      };

      const length = Math.hypot(dirVec.x, dirVec.y) || 1;
      const normDir = { x: dirVec.x / length, y: dirVec.y / length };

      const startBorder = getBorderPoint(localRects[i], startCenter, normDir);
      const endBorder = getBorderPoint(localRects[i + 1], endCenter, {
        x: -normDir.x,
        y: -normDir.y,
      });

      newEdges.push({ start: startBorder, end: endBorder });
      newDots.push(startBorder, endBorder);
    }

    // Deduplicate dots by stringified coordinates to avoid overlap circles
    const uniqueDots = Array.from(
      new Map(
        newDots.map((p) => [`${p.x.toFixed(1)}-${p.y.toFixed(1)}`, p])
      ).values()
    );

    setEdges(newEdges);
    setDots(uniqueDots);
  };

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);

    // Observe DOM mutations to re-measure when new posts mount/unmount
    const section = document.getElementById("blog-section");
    let mutationObserver: MutationObserver | undefined;
    if (section && "MutationObserver" in window) {
      mutationObserver = new MutationObserver((mutations) => {
        // Check if any nodes were added or removed that could change layout
        const hasLayoutChange = mutations.some(
          (m) => m.addedNodes.length > 0 || m.removedNodes.length > 0
        );
        if (hasLayoutChange) {
          // Use requestAnimationFrame to wait until layout settles
          requestAnimationFrame(measure);
        }
      });

      mutationObserver.observe(section, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      window.removeEventListener("resize", measure);
      mutationObserver?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (edges.length === 0) return null;

  /**
   * Compute a small curved quadratic path for each edge.
   */
  const curvature = 32; // Adjust for more / less bend

  const buildPath = (edge: Edge) => {
    const { start, end } = edge;
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.hypot(dx, dy) || 1;
    // Unit perpendicular vector
    const perp = { x: -dy / length, y: dx / length };
    const ctrl = {
      x: (start.x + end.x) / 2 + perp.x * curvature,
      y: (start.y + end.y) / 2 + perp.y * curvature,
    };
    return `M ${start.x},${start.y} Q ${ctrl.x},${ctrl.y} ${end.x},${end.y}`;
  };

  const drawDuration = 0.6; // seconds
  const stagger = 0.15; // delay between successive edges

  return (
    <svg
      className="position-absolute top-0 start-0 w-100 h-100"
      style={{ pointerEvents: "none" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Animation keyframes */}
      <style>{`
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }
        @keyframes popDot {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <defs>
        {/* Glow filter */}
        <filter id="glow" x="-100%" y="-100%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="10" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Draw edges */}
      {edges.map((edge, idx) => (
        <path
          key={idx}
          d={buildPath(edge)}
          fill="none"
          stroke="#fff"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: 1,
            animation: `drawLine ${drawDuration}s ease forwards`,
            animationDelay: `${idx * stagger}s`,
          }}
        />
      ))}

      {/* Draw dots */}
      {dots.map((p, idx) => (
        <React.Fragment key={`dot-fragment-${idx}`}>
          <circle
            cx={p.x}
            cy={p.y}
            r={7}
            fill="#7528fc"
            filter="url(#glow)"
            style={{
              transformOrigin: `${p.x}px ${p.y}px`,
              animation: `popDot 0.3s ease-out forwards`,
              animationDelay: `${edges.length * stagger + idx * 0.05}s`,
              opacity: 0,
            }}
          />
          <circle
            cx={p.x}
            cy={p.y}
            r={7}
            stroke="#fff"
            strokeWidth={2}
            fill="#7528fc"
            style={{
              transformOrigin: `${p.x}px ${p.y}px`,
              animation: `popDot 0.3s ease-out forwards`,
              animationDelay: `${edges.length * stagger + idx * 0.005}s`,
              opacity: 0,
            }}
          />
        </React.Fragment>
      ))}
    </svg>
  );
};

export default LinesOverlay;
