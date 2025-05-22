import React, { memo, useMemo } from "react";
import styles from "./styles.module.scss";
import { LineCoordinate, Point } from "@/lib/types/paths";
import pathGenerators from "@/lib/utils/pathGenerator";

interface DrawLineProps {
  lines: LineCoordinate[];
  instanceId: string;
}

const ConnectionNode = memo(
  ({ position, filterId }: { position: Point; filterId: string }) => (
    <g filter={`url(#${filterId})`}>
      <circle cx={position.x} cy={position.y} r="6" fill="#7528FC" />
      <circle
        cx={position.x}
        cy={position.y}
        r="7"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
    </g>
  ),
);

ConnectionNode.displayName = "ConnectionNode";

const DrawLine = memo(({ lines, instanceId }: DrawLineProps) => {
  const uniqueFilterId = useMemo(
    () => `connection_filter_${instanceId}`,
    [instanceId],
  );
  const processedLines = useMemo(
    () =>
      lines.map((line) => ({
        ...line,
        style: line.style || "straight",
        path: pathGenerators[line.style || "straight"](line.start, line.end),
        strokeProps: {
          stroke: line.strokeColor || "#FFFFFF",
          strokeWidth: line.strokeWidth || 2,
        },
      })),
    [lines],
  );

  if (!lines || lines.length === 0) {
    return null;
  }

  return (
    <svg
      className={styles.svgContainer}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter
          id={uniqueFilterId}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="2"
            operator="dilate"
            in="SourceAlpha"
            result="effect1_dropShadow_381_216"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.458824 0 0 0 0 0.156863 0 0 0 0 0.988235 0 0 0 0.8 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_381_216"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="12"
            operator="dilate"
            in="SourceAlpha"
            result="effect2_dropShadow_381_216"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.458824 0 0 0 0 0.156863 0 0 0 0 0.988235 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_381_216"
            result="effect2_dropShadow_381_216"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_381_216"
            result="shape"
          />
        </filter>
      </defs>
      {processedLines.map((line) => (
        <g key={line.id}>
          <path
            d={line.path}
            {...line.strokeProps}
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <ConnectionNode position={line.start} filterId={uniqueFilterId} />
          <ConnectionNode position={line.end} filterId={uniqueFilterId} />
        </g>
      ))}
    </svg>
  );
});

DrawLine.displayName = "DrawLine";

export default DrawLine;
