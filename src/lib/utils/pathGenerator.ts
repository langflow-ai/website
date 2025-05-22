import { LineStyle, Point } from "../types/paths";

const sPath = (start: Point, end: Point) => {
  const width = Math.abs(end.x - start.x);
  const height = Math.abs(end.y - start.y);
  const firstDropY = start.y + height * 0.3;

  const curve1End = {
    x: start.x - width * 0.13,
    y: firstDropY + height * 0.3,
  };

  const curve2Start = {
    x: end.x + width * 0.232,
    y: end.y - height * 0.4,
  };

  return `M ${start.x} ${start.y}
          V ${firstDropY}
          C ${start.x} ${firstDropY + height * 0.168}, 
            ${curve1End.x} ${curve1End.y}, 
            ${curve1End.x - width * 0.127} ${curve1End.y}
          H ${curve2Start.x}
          C ${curve2Start.x - width * 0.127} ${curve2Start.y}, 
            ${end.x} ${end.y - height * 0.39}, 
            ${end.x} ${end.y}
          V ${end.y}`;
};

const curvePath = (start: Point, end: Point): string => {
  const sx = start.x;
  const sy = start.y;
  const ex = end.x;
  const ey = end.y;

  const preferredRadius = 30;
  const minSpaceForCurve = 5;

  const dx = ex - sx;
  const dy = ey - sy;

  const R = Math.min(preferredRadius, Math.abs(dx), Math.abs(dy));

  if (R < minSpaceForCurve || dx === 0 || dy === 0) {
    if (dx === 0 && dy === 0) return `M ${sx},${sy}`;
    if (dx === 0 || dy === 0) return `M ${sx},${sy} L ${ex},${ey}`;
    return `M ${sx},${sy} L ${ex},${ey}`;
  }

  let path = "";

  if (dx > 0 && dy > 0) {
    path = `M ${sx},${sy} L ${ex - R},${sy} Q ${ex},${sy} ${ex},${sy + R} L ${ex},${ey}`;
  } else if (dx < 0 && dy > 0) {
    path = `M ${sx},${sy} L ${ex + R},${sy} Q ${ex},${sy} ${ex},${sy + R} L ${ex},${ey}`;
  } else if (dx > 0 && dy < 0) {
    path = `M ${sx},${sy} L ${ex - R},${sy} Q ${ex},${sy} ${ex},${sy - R} L ${ex},${ey}`;
  } else if (dx < 0 && dy < 0) {
    path = `M ${sx},${sy} L ${ex + R},${sy} Q ${ex},${sy} ${ex},${sy - R} L ${ex},${ey}`;
  } else {
    path = `M ${sx},${sy} L ${ex},${ey}`;
  }
  return path;
};

const curveHeaderPath = (start: Point, end: Point): string => {
  const sx = start.x;
  const sy = start.y;
  const ex = end.x;
  const ey = end.y;

  const cp1x = ex + (sx - ex) * (116.051 / 260);
  const cp1y = sy;

  const cp2x = ex + (sx - ex) * (137.253 / 260);
  const cp2y = ey;

  return `M ${sx} ${sy} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${ex} ${ey}`;
};

const pathGenerators: Record<LineStyle, (start: Point, end: Point) => string> =
  {
    straight: (start, end) => `M ${start.x},${start.y} L ${end.x},${end.y}`,
    curvePath,
    sPath,
    curveHeader: curveHeaderPath,
  };

export default pathGenerators;