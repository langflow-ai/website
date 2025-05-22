export type Point = { x: number; y: number };

export type LineStyle =
  | "straight"
  | "curvePath"
  | "sPath"
  | "curveHeader";

export type LineCoordinate = {
  id: string;
  start: Point;
  end: Point;
  style?: LineStyle;
  strokeColor?: string;
  strokeWidth?: number;
};
